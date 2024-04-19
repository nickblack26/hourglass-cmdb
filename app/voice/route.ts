import twilio from 'twilio'
import { config } from "@/config";
import { isAValidPhoneNumber } from "@/lib/twilio/call-helper";
import { cookies } from "next/headers";
const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(request: Request, res: Response) {
	const cookieStore = cookies()
  	const identity = cookieStore.get('twilio-temp-device:token')
	const data = await request.formData()
	const To = data.get('To') as string;
  	const callerId = config.callerId;
	const twiml = new VoiceResponse()

	console.log(identity?.value)

	// If the request to the /voice endpoint is TO your Twilio Number,
	// then it is an incoming call towards your Twilio.Device.
	if (To == callerId) {
		let dial = twiml.dial();

		// This will connect the caller with your Twilio.Device/client
		dial.client(identity?.value);
	} else if (To) {
		// This is an outgoing call

		// set the callerId
		let dial = twiml.dial({ callerId });

		// Check if the 'To' parameter is a Phone Number or Client Name
		// in order to use the appropriate TwiML noun
		const attr = isAValidPhoneNumber(To)
		? "number"
		: "client";
		dial[attr]({}, To);
	} else {
		twiml.say("Thanks for calling!");
	}

	// return res.status(200).string(twiml.toString());

	console.log(twiml)
	console.log(twiml.toString())

	const response = new Response(twiml.toString(), {
		status: 200,
		statusText: 'ok'
	})

	response.headers.append('content-type', 'text/xml')

	return response
}