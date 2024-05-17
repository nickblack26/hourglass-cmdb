import type { Activity } from "@/types/twilio/taskrouter";

export async function GET(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const { workspace, account } = params;
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(account, authToken);
	
	const response: Activity[] = await client.taskrouter.v1.workspaces(workspace)
      .activities
      .list({limit: 20})

	return Response.json(response)
}
