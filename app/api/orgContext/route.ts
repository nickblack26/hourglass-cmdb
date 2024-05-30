import { cookies } from "next/headers";

export async function POST(request: Request) {
	const data = await request.formData()
	const cookieStore = cookies()

	const accountSid = data.get('accountSid') as string;
	const authToken = data.get('authToken') as string;
	const workspaceSid = data.get('workspaceSid') as string;

	if(!accountSid || !authToken) return new Response(null, {status: 400})
	
	if (accountSid) {
		cookieStore.set('twilio:accountSid', accountSid, { secure: true });
	}
	
	if (authToken) {
		cookieStore.set('twilio:authToken', authToken, {secure: true});
	}

	// if (workspaceSid) {
	// 	cookieStore.set('twilio:workspaceSid', 'data.workspaceSid!', {secure: true});
	// }

	return new Response(null, {status: 200})
}
