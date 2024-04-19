import { NextResponse } from 'next/server';

const VoiceResponse = require('twilio').twiml.VoiceResponse;

export async function POST(request: Request, response: NextResponse) {
	try {
		const formData = await request.formData();
	
	} catch (error) {
		console.error(error);
		return new Response(`Error: ${JSON.stringify(error)}`, {
			status: 400,
		});
	}
}
