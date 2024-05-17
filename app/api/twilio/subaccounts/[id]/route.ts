import { SubAccount } from "@/types/twilio/subaccounts";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const subaccount: SubAccount = await client.api.v2010.accounts(params.id).fetch()

	return Response.json(subaccount)
}