import { SubAccount } from "@/types/twilio/subaccounts";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function POST(request: Request) {
	const formData = await request.formData()

	const subaccount: SubAccount = await client.api.v2010.accounts
                .create({friendlyName: formData.get('name')})

	return Response.json(subaccount)
}