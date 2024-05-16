const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function GET() {
	const queues = await client.taskrouter.v1.workspaces(process.env.TWILIO_WORKSPACE_SID)
      	.taskQueues
		.list({ limit: 20 })
	
	console.log(queues)
    
	return Response.json(queues)
}
