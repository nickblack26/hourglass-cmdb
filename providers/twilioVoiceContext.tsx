'use client';

import { type Call } from '@twilio/voice-sdk';
import React, { useContext, useState } from 'react';

interface TwilioProviderProps {
	identity: string;
	currentCall?: Call;
}

const initialValues: TwilioProviderProps = {
	identity: '',
	currentCall: undefined,
};

type WithChildProps = {
	children: React.ReactNode;
};

const context = React.createContext(initialValues);
const { Provider } = context;

export const TwilioProvider = ({ children }: WithChildProps) => {
	const [identity, setIdentity] = useState<string>('');
	const [currentCall, setCurrentCall] = useState<Call | undefined>();

	const values = {
		identity,
		setIdentity,
		currentCall,
		setCurrentCall,
	};

	return <Provider value={values}>{children}</Provider>;
};

export const useTwilio = () => {
	const state = useContext(context);

	return state;
};
