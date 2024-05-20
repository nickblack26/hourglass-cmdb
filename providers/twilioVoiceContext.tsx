'use client';

import { setProviderCookies } from '@/app/actions';
import type { Device, Call } from '@twilio/voice-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { Reservation, Worker } from 'twilio-taskrouter';

interface TwilioProviderProps {
	reservations: Reservation[];
	worker: Worker | undefined;
	accountSid: string | undefined;
	workspaceSid: string | undefined;
	authToken: string | undefined;
	identity: string;
	setIdentity: React.Dispatch<React.SetStateAction<string>>;
	currentCall?: Call;
	setCurrentCall: React.Dispatch<React.SetStateAction<Call | undefined>>;
	device?: Device;
	setDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
}

const initialValues: TwilioProviderProps = {
	reservations: [],
	worker: undefined,
	accountSid: '',
	workspaceSid: '',
	authToken: '',
	identity: '',
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
	const [identity, setIdentity] = useState<string>('');
	const [currentCall, setCurrentCall] = useState<Call | undefined>();
	const [device, setDevice] = useState<Device | undefined>();

	useEffect(() => {
		setProviderCookies(accountSid, authToken, workspaceSid);
		console.log(contact, accountSid, workspaceSid, contact?.workerSid);
		if (!contact || !accountSid || !workspaceSid || !contact.workerSid) return;

		if (!worker) {
			fetch('http://localhost:3000/api/twilio/1/create-key', { method: 'POST' })
				.then((response) => response.json())
				.then((data) => {
					setWorker(new Worker(data.token));
				})
				.catch((data) => console.log(data));
		}

		worker?.on('ready', (worker) => {
			console.log(`Worker ${worker.sid} is now ready for work`);
		});

		worker?.on('reservationCreated', (reservation: Reservation) => {
			console.log(`Reservation ${reservation.sid} has been created for ${worker.sid}`);
			console.log(`Task attributes are: ${reservation.task.attributes}`);
			setReservations([...reservations, reservation]);

			reservation.on('accepted', (acceptedReservation) => {
				console.log(`Reservation ${acceptedReservation.sid} was accepted.`);
				setReservations([...reservations.filter((res) => res.sid === acceptedReservation.sid)]);
			});

			// reservation
			// 	.accept()
			// 	.then((acceptedReservation) => {
			// 		console.log(`Reservation status is ${acceptedReservation.status}`);
			// 	})
			// 	.catch((err) => {
			// 		console.log(`Error: ${err}`);
			// 	});
		});

		return () => {
			worker?.removeAllListeners();
		};
	}, [contact, accountSid, workspaceSid, worker, authToken, reservations]);

	const values = {
		reservations,
		worker,
		accountSid,
		workspaceSid,
		authToken,
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
