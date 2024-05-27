'use server';

import { redirect } from 'next/navigation';
import { createClient } from './server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Icon } from '../data';

export const createProduct = async (formData: FormData, parent?: string) => {
	const supabase = createClient();
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;
	const cost = formData.get('cost') as unknown as number;
	const price = formData.get('price') as unknown as number;

	const { error } = await supabase.from('products').insert({ name, description,cost,price, parent });

	console.log(error)

	revalidateTag('products');
}


export const createUser = async (formData: FormData) => {
	console.log(formData)
	const supabase = createClient();
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				firstName,
				lastName,
				// email
			}
		}
	})

	console.log(data, error)
}

export const createAssetType = async (formData: FormData) => {
	const supabase = createClient()

	console.log(formData);
	await supabase
		.from('assetTypes')
		.insert({ icon: formData.get('icon') as keyof Icon, name: formData.get('name') as string, organization: 'e1d916e9-4eed-45e1-bb81-f53aa0e437c5' });
}