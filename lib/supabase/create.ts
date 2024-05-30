'use server';

import { createClient } from './server';
import { revalidateTag } from 'next/cache';

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
			}
		}
	})

	console.log(data, error)
}

export const createAssetType = async (formData: FormData) => {
	const supabase = createClient()

	const data: AssetTypeInsert = {
		name: formData.get('name') as string,
		icon: formData.get('icon') as IconEnum,
		parent: formData.get('type') as string,
		organization: '08bd0bdc-0fdf-4933-98c5-62dc074cab5b'
	}

	await supabase
		.from('assetTypes')
		.insert(data);
}

export const createAsset = async (formData: FormData) => {
	const supabase = createClient()

	const data: AssetInsert = {
		name: formData.get('name') as string,
		company: formData.get('company') as string,
		contact: formData.get('contact') ? formData.get('contact') as string : null,
		type: formData.get('type') as string,
	}

	console.log(data)

	const { error } = await supabase
		.from('assets')
		.insert(data);

	console.error(error)
}