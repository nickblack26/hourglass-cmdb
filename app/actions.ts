'use server'

import { cookies } from "next/headers";

export const setProviderCookies = (accountSid: string | undefined, authToken: string | undefined, workspaceSid: string | undefined) => {
	const cookieStore = cookies()

	console.log(accountSid, authToken, workspaceSid)
	
	if (!!!accountSid) {
		cookieStore.set('TWILIO_ACCOUNT_SID', accountSid!);
	}

	if (!!!accountSid) {
		cookieStore.set('TWILIO_AUTH_TOKEN', authToken!);
	}

	if (!!!accountSid) {
		cookieStore.set('TWILIO_WORKSPACE_SID', workspaceSid!);
	}
};