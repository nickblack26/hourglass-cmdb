'use server'
import jwt from 'jsonwebtoken'

import { cookies } from "next/headers";

export const setProviderCookies = (accountSid: string | undefined, authToken: string | undefined, workspaceSid: string | undefined) => {
	const cookieStore = cookies()

	console.log(accountSid, authToken, workspaceSid)
	
	
	if (!!!accountSid) {
		cookieStore.set('twilio:accountSid', accountSid!);
	}

	if (!!!accountSid) {
		cookieStore.set('twilio:authToken', authToken!);
	}

	if (!!!accountSid) {
		cookieStore.set('twilio:workspaceSid', workspaceSid!);
	}
};