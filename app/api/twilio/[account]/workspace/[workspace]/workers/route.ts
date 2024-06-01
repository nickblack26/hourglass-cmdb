import { cookies as nextCookies } from 'next/headers';
import { Twilio } from 'twilio';
import { revalidateTag } from 'next/cache';
import { getDocument } from '@/lib/mongodb/read';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
	const authToken = request.headers.get('authToken');
	// if (!authToken) return;
	const cookies = nextCookies();
	const account = cookies.get('twilio:accountSid')?.value;
	const workspace = cookies.get('twilio:workspaceSid')?.value;
	const client = new Twilio('', '');
	// if (!workspace) return;

	const response = await client.taskrouter.v1.workspaces('').workers.list({ limit: 20 });

	return Response.json(response);
}

export async function POST(request: Request, { params }: { params: { account: string; workspace: string } }) {
	const authToken = request.headers.get('authToken');
	if (!authToken) return;
	const formData = await request.formData();
	const data = await getDocument<Contact>('users', { _id: new ObjectId(formData.get('contact') as string) });

	if (!data) return new Response("Can't find contact", { status: 400 });

	const cookies = nextCookies();
	const account = cookies.get('twilio:accountSid')?.value;
	const workspace = cookies.get('twilio:workspaceSid')?.value;

	if (!workspace) return;
	const client = new Twilio(account, authToken!);

	const response = await client.taskrouter.v1.workspaces(workspace).workers.create({
		friendlyName: data.email,
		attributes: JSON.stringify({ contact_uri: encodeURIComponent(data.email) }),
	});

	revalidateTag('workers');

	return Response.json(response);
}
