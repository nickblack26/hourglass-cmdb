import { createClient } from "@/lib/supabase/server";
import type { Worker } from "@/types/twilio/taskrouter";
import { revalidateTag } from "next/cache";

export async function GET(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const { workspace, account } = params;
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(account, authToken);
	
	const response: Worker[] = await client.taskrouter.v1.workspaces(workspace)
		.workers
		.list({limit: 20})

	return Response.json(response)
}

export async function POST(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const { workspace, account } = params;
	const formData = await request.formData()
	const supabase = createClient()
	const { data, error } = await supabase.from('contacts').select('email').eq('id', formData.get('contact') as string).single()
	if (!data || error) {
		console.log(error)
		return
	};
	const authToken = request.headers.get('authToken')
	const client = require('twilio')(account, authToken);
	
	const response: Worker[] = await client.taskrouter.v1.workspaces(workspace)
		.workers
		.create({friendlyName: data.email, attributes: { contact_uri: encodeURIComponent(data.email) }})

		revalidateTag('workers')

	return Response.json(response)
}
