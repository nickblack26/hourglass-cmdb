import Twilio from "twilio";
const AccessToken = Twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioApiKey = process.env.TWILIO_API_KEY!;
const twilioApiSecret = process.env.TWILIO_API_SECRET!;

export async function POST(request: Request, response: Response) {
	// const data = await request.json()
	// Used specifically for creating Voice tokens
	const outgoingApplicationSid = process.env.TWILIO_TWIML_APP_SID;
	const identity = encodeURIComponent('nblack@velomethod.com')

	console.log(identity)

	// Create a "grant" which enables a client to use Voice as a given user
	const voiceGrant = new VoiceGrant({
		outgoingApplicationSid: outgoingApplicationSid,
		incomingAllow: true, // Optional: add to allow incoming calls
	});

	// Create an access token which we will sign and return to the client,
	// containing the grant we just created
	const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity });

	console.log(token)

	token.addGrant(voiceGrant);

	const returnValue = {
		identity: token.identity,
		token: token.toJwt(),
	};

	return Response.json(returnValue);
}
