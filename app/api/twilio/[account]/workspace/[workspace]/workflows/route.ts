import type { Workflow } from "@/types/twilio/calls";

export async function GET(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const { workspace, account } = params;
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(account, authToken);
	
	const workflows: Workflow[] = await client.taskrouter.v1.workspaces(workspace)
      .workflows
      .list({limit: 20})

	return Response.json(workflows)
}
