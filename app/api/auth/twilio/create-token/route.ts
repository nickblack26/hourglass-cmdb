import { cookies } from "next/headers";

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

const ADJECTIVES = [
  "Awesome",
  "Bold",
  "Creative",
  "Dapper",
  "Eccentric",
  "Fiesty",
  "Golden",
  "Holy",
  "Ignominious",
  "Jolly",
  "Kindly",
  "Lucky",
  "Mushy",
  "Natural",
  "Oaken",
  "Precise",
  "Quiet",
  "Rowdy",
  "Sunny",
  "Tall",
  "Unique",
  "Vivid",
  "Wonderful",
  "Xtra",
  "Yawning",
  "Zesty",
];

const FIRST_NAMES = [
  "Anna",
  "Bobby",
  "Cameron",
  "Danny",
  "Emmett",
  "Frida",
  "Gracie",
  "Hannah",
  "Isaac",
  "Jenova",
  "Kendra",
  "Lando",
  "Mufasa",
  "Nate",
  "Owen",
  "Penny",
  "Quincy",
  "Roddy",
  "Samantha",
  "Tammy",
  "Ulysses",
  "Victoria",
  "Wendy",
  "Xander",
  "Yolanda",
  "Zelda",
];

const LAST_NAMES = [
  "Anchorage",
  "Berlin",
  "Cucamonga",
  "Davenport",
  "Essex",
  "Fresno",
  "Gunsight",
  "Hanover",
  "Indianapolis",
  "Jamestown",
  "Kane",
  "Liberty",
  "Minneapolis",
  "Nevis",
  "Oakland",
  "Portland",
  "Quantico",
  "Raleigh",
  "SaintPaul",
  "Tulsa",
  "Utica",
  "Vail",
  "Warsaw",
  "XiaoJin",
  "Yale",
  "Zimmerman",
];

function rand<T>(arr: T[]) {return arr[Math.floor(Math.random() * arr.length)]};

const nameGenerator = () => rand(ADJECTIVES) + rand(FIRST_NAMES) + rand(LAST_NAMES);


export async function POST(request: Request, response: Response) {
	// Used specifically for creating Voice tokens
	const outgoingApplicationSid = process.env.TWILIO_TWIML_APP_SID;
	const identity = nameGenerator();

	// Create a "grant" which enables a client to use Voice as a given user
	const voiceGrant = new VoiceGrant({
		outgoingApplicationSid: outgoingApplicationSid,
		incomingAllow: true, // Optional: add to allow incoming calls
	});

	// Create an access token which we will sign and return to the client,
	// containing the grant we just created
	const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity });

	token.addGrant(voiceGrant);
	token.identity = identity;

	cookies().set('twilio-temp-device:token', identity);


	const returnValue = {
		identity,
		token: token.toJwt(),
	};

	return Response.json(returnValue);
}
