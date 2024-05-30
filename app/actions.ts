'use server'
import { cookies } from "next/headers";

export const setProviderCookies = (accountSid: string | undefined, authToken: string | undefined, workspaceSid: string | undefined) => {
	'use server'
	const cookieStore = cookies()
	
	if (accountSid) {
		// cookieStore.set('twilio:accountSid', serialize(accountSid))
		cookieStore.set('twilio:accountSid', accountSid!, {secure: true});
	}

	if (authToken) {
		cookieStore.set('twilio:authToken', authToken!, {secure: true});
	}

	if (workspaceSid) {
		cookieStore.set('twilio:workspaceSid', workspaceSid!, {secure: true});
	}
};