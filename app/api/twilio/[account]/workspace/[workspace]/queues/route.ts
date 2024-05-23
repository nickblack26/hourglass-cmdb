import { revalidatePath, revalidateTag } from "next/cache";
import { cookies as nextCookies } from "next/headers";
import {Twilio} from 'twilio'

export async function GET() {
	const cookies = nextCookies()
	const account = cookies.get('twilio:accountSid')?.value
	const token = cookies.get('twilio:authToken')?.value
	const workspace = cookies.get('twilio:workspaceSid')?.value
	console.log(account, token, workspace)
	const client = new Twilio('', '');

	// if (!workspace) return;

	const response = await client.taskrouter.v1.workspaces('')
      	.taskQueues
		.list({ limit: 20 })
	    
	return Response.json(response)
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const cookies = nextCookies()
	const account = cookies.get('twilio:accountSid')?.value
	const token = cookies.get('twilio:authToken')?.value
	const workspace = cookies.get('twilio:workspaceSid')?.value
	console.log(account, token, workspace)
	const client = new Twilio('', '');

	// if (!workspace) return;

	const response = await client.taskrouter.v1.workspaces('')
      	.taskQueues('')
		.update({ targetWorkers: `languages HAS "english"` })
	
	revalidateTag('queues')
	    
	return Response.json(response)
}