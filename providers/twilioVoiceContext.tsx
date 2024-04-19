'use client';

import type { Device, Call } from '@twilio/voice-sdk';
import React, { useContext, useState } from 'react';

interface TwilioProviderProps {
	identity: string;
	setIdentity: React.Dispatch<React.SetStateAction<string>>;
	currentCall?: Call;
	setCurrentCall: React.Dispatch<React.SetStateAction<Call | undefined>>;
	device?: Device;
	setDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
}

const initialValues: TwilioProviderProps = {
	identity: '',
	setIdentity: () => undefined,
	currentCall: undefined,
	setCurrentCall: () => undefined,
	device: undefined,
	setDevice: () => undefined,
};

type WithChildProps = {
	children: React.ReactNode;
};

const context = React.createContext(initialValues);
const { Provider } = context;

export const TwilioProvider = ({ children }: WithChildProps) => {
	const [identity, setIdentity] = useState<string>('');
	const [currentCall, setCurrentCall] = useState<Call | undefined>();
	const [device, setDevice] = useState<Device | undefined>();

	const values = {
		identity,
		setIdentity,
		currentCall,
		setCurrentCall,
		device,
		setDevice,
	};

	return <Provider value={values}>{children}</Provider>;
};

export const useTwilio = () => {
	const state = useContext(context);

	return state;
};
