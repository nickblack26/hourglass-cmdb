import { cookies as nextCookies } from "next/headers";
import { Twilio } from "twilio";

export async function GET(request: Request) {
	const authToken = request.headers.get('authToken')
	// if (!authToken) return new Response(null, {status: 400, statusText: 'No auth token provided.'});
	const cookies = nextCookies()
	const account = cookies.get('twilio:accountSid')?.value
	const workspace = cookies.get('twilio:workspaceSid')?.value
	const client = new Twilio('', '');
	// if (!workspace) return new Response(null, {status: 400, statusText: 'No workspace provided.'});
	
	const response = await client.taskrouter.v1.workspaces('')
		.workflows
		.list()

	return Response.json(response)
}
