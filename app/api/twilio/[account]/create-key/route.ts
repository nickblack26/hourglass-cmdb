import Twilio from "twilio";
const AccessToken = Twilio.jwt.AccessToken;
const TaskRouterGrant = AccessToken.TaskRouterGrant;

export async function POST(request: Request, response: Response) {
	// const data = await request.json()
	// Used specifically for creating Voice tokens
	const identity = encodeURIComponent('nblack@velomethod.com')

	console.log(identity)

	// Create a "grant" which enables a client to use Voice as a given user
	const taskRouterGrant = new TaskRouterGrant({
		workerSid: '',
		workspaceSid: '',
		role: "worker",
	});

	// Create an access token which we will sign and return to the client,
	// containing the grant we just created
	const token = new AccessToken('', '', '', { identity: 'nblack_40velomethod_2Ecom' });

	token.addGrant(taskRouterGrant);

	const returnValue = {
		identity: token.identity,
		token: token.toJwt(),
	};

	return Response.json(returnValue);
}

