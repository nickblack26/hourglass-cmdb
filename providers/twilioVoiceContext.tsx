'use client';

import { setProviderCookies } from '@/app/actions';
import type { Device, Call } from '@twilio/voice-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { Reservation, Worker } from 'twilio-taskrouter';
import { Twilio } from 'twilio';
import { useJabra } from './jabraProvider';

interface TwilioProviderProps {
	reservations: Reservation[];
	worker: Worker | undefined;
	currentWorkspace: string | undefined;
	setCurrentWorkspace: React.Dispatch<React.SetStateAction<string | undefined>>;
	identity: string;
	client: Twilio | undefined;
	setIdentity: React.Dispatch<React.SetStateAction<string>>;
	currentCall?: Call;
	setCurrentCall: React.Dispatch<React.SetStateAction<Call | undefined>>;
	device?: Device;
	setDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
}

const initialValues: TwilioProviderProps = {
	reservations: [],
	worker: undefined,
	identity: '',
	client: undefined,
	currentWorkspace: '',
	setCurrentWorkspace: () => undefined,
	setIdentity: () => undefined,
	currentCall: undefined,
	setCurrentCall: () => undefined,
	device: undefined,
	setDevice: () => undefined,
};

type WithChildProps = {
	contact?: Contact | null;
	accountSid?: string;
	authToken?: string;
	workspaceSid?: string;
	children: React.ReactNode;
};

const context = React.createContext(initialValues);
const { Provider } = context;

export const TwilioProvider = ({ contact, accountSid, authToken, workspaceSid, children }: WithChildProps) => {
	const [worker, setWorker] = useState<Worker>();
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [currentWorkspace, setCurrentWorkspace] = useState<string | undefined>(workspaceSid);
	const [identity, setIdentity] = useState<string>('');
	const [currentCall, setCurrentCall] = useState<Call | undefined>();
	const [device, setDevice] = useState<Device | undefined>();
	const client = new Twilio('', '');

	const { currentCallControl } = useJabra();

	useEffect(() => {
		setProviderCookies(accountSid, authToken, workspaceSid);
		if (!worker) {
			fetch('https://localhost:3001/api/twilio/1/create-key', { method: 'POST' })
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setWorker(new Worker(data.token));
				})
				.catch((data) => console.error(data));
		}

		worker?.on('ready', (worker) => {
			console.log(`Worker ${worker.sid} is now ready for work`);
		});

		worker?.on('reservationCreated', (reservation: Reservation) => {
			console.log(`Reservation ${reservation.sid} has been created for ${worker.sid}`);
			console.log(`Task attributes are: ${reservation.task.attributes}`);

			console.log(worker.activities);

			currentCallControl?.signalIncomingCall();
			reservation.on('accepted', (acceptedReservation) => {
				console.log(`Reservation ${acceptedReservation.sid} was accepted.`);

				setReservations([...reservations.filter((res) => res.sid === acceptedReservation.sid)]);
			});
		});

		return () => {
			worker?.removeAllListeners();
		};
	}, []);

	const values = {
		reservations,
		worker,
		identity,
		client,
		currentWorkspace,
		setCurrentWorkspace,
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
