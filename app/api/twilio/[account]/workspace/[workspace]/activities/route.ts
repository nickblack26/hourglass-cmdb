import { cookies as nextCookies } from "next/headers";
import { Twilio } from "twilio";
import { ActivityInstance } from "twilio/lib/rest/taskrouter/v1/workspace/activity";

export async function GET(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const cookies = nextCookies()
	const account = cookies.get('twilio:accountSid')?.value
	const workspace = cookies.get('twilio:workspaceSid')?.value
	const client = new Twilio('', '');
	
	const response: ActivityInstance[] = await client.taskrouter.v1.workspaces('')
      .activities
      .list({limit: 20})

	return Response.json(response)
}
