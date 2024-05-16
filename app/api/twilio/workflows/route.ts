import type { Workflow } from "@/types/data";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function GET(request: Request) {
	const workflows: Workflow[] = await client.taskrouter.v1.workspaces(process.env.TWILIO_WORKSPACE_SID)
      .workflows
      .list({limit: 20})

	return Response.json(workflows)
}
