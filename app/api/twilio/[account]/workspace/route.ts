import type { Workspace } from "@/types/twilio/taskrouter";

export async function POST(request: Request, { params }: { params: { account: string } }) {
  const formData = await request.formData()
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(params.account, authToken);
	
	const response: Workspace[] = await client.taskrouter.v1.workspaces
      .create({
         template: 'FIFO',
         friendlyName: formData.get('name')
       })

	return Response.json(response)
}
