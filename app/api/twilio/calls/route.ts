import type { Call } from "@twilio/voice-sdk";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function GET(request: Request) {
	const calls: Call[] = await client.calls.list({from: 'client:nblack_40velomethod_2Ecom', limit: 20})
    
	return Response.json(calls)
}
