'use client';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { init, TransportContext, EasyCallControlFactory, MuteState } from '../node_modules/@gnaudio/jabra-js/browser-esm/index.js';
import type { ISingleCallControl, IConfig } from '@gnaudio/jabra-js';
import { useTwilio } from './twilioVoiceContext';

interface JabraProviderProps {
	callControlDevices: ISingleCallControl[];
	currentCallControl: ISingleCallControl | undefined;
	setCurrentCallControl: React.Dispatch<React.SetStateAction<ISingleCallControl | undefined>>;
}

const initialValues: JabraProviderProps = {
	callControlDevices: [],
	currentCallControl: undefined,
	setCurrentCallControl: () => undefined,
};

type WithChildProps = {
	children: ReactNode;
};

const context = React.createContext(initialValues);
const { Provider } = context;

export const JabraProvider = ({ children }: WithChildProps) => {
	const { currentCall } = useTwilio();
	const [callControlDevices, setCallControlDevices] = useState<ISingleCallControl[]>([]);
	const [currentCallControl, setCurrentCallControl] = useState<ISingleCallControl>();
	const [deviceState, setDeviceState] = useState<{
		callActive: boolean;
		muteState: MuteState;
	}>({
		callActive: false,
		muteState: MuteState.NO_ONGOING_CALLS,
	});

	useEffect(() => {
		async function demo() {
			try {
				const config = {
					partnerKey: '',
					appId: 'demo-app',
					appName: 'Demo App',
					transport: 'web-hid',
				} as IConfig;

				// Initialize the Jabra SDK
				const jabra = await init(config);

				if (!jabra) {
					new Error('The Jabra SDK failed to initialize. See error above for more details.');
					return;
				}

				const eccFactory = new EasyCallControlFactory(jabra);

				/**
				 * Subscribe to device attach events
				 */
				jabra.deviceAdded.subscribe(async (d) => {
					// Skip devices that do not support call control
					if (!eccFactory.supportsEasyCallControl(d)) {
						return;
					}

					// Convert the ISdkDevice to a ICallControlDevice
					const ccDevice = await eccFactory.createSingleCallControl(d);
					console.log(ccDevice);
					setCallControlDevices((defaultValue) => [...defaultValue, ccDevice]);
				});

				/**
				 * Subscribe to device detach events
				 */
				jabra.deviceRemoved.subscribe((removed) => {
					setCallControlDevices((prev) => [...prev].filter((x) => x.device.id !== removed.id));
				});

				/**
				 * Check if in WebHID context and whether to reveal consent button
				 */
				if (jabra.transportContext === TransportContext.WEB_HID) {
					// await webHidPairing();
				}
			} catch (err) {
				console.error(err);
			}
		}

		demo();
	}, []);

	useEffect(() => {
		if (!currentCallControl) return;
		const muteSubscription = currentCallControl.muteState.subscribe((muteState) => {
			setDeviceState((prevDeviceState) => {
				return { ...prevDeviceState, muteState };
			});
		});

		const callSubscription = currentCallControl.callActive.subscribe((callActive) => {
			setDeviceState((prevDeviceState) => {
				return { ...prevDeviceState, callActive };
			});
		});

		return () => {
			muteSubscription?.unsubscribe();
			callSubscription?.unsubscribe();
		};
	}, [currentCallControl]);

	return <Provider value={{ callControlDevices, currentCallControl, setCurrentCallControl }}>{children}</Provider>;
};

export const useJabra = () => {
	const state = useContext(context);

	return state;
};
