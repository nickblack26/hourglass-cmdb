export async function GET(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const { workspace, account } = params;
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(account, authToken);
	const queues = await client.taskrouter.v1.workspaces(workspace)
      	.taskQueues
		.list({ limit: 20 })
	    
	return Response.json(queues)
}
