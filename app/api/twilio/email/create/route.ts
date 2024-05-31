import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request, response: Response) {
	const db = await createClient();
	const formData = await request.formData();
	const summary = (formData.get('html') as string) ?? (formData.get('text') as string);

	console.log(formData);

	try {
		// const { data, error } = await db.collection('tickets').insert({ summary, source: 4 }).select()

		// console.log(data, error)

		// if (error) throw error

		return new Response('OK');
	} catch (error) {
		return new Response(`Error: ${JSON.stringify(error)}`, {
			status: 400,
		});
	}
}
