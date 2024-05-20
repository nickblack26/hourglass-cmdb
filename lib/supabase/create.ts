'use server';

import { redirect } from 'next/navigation';
import { createClient } from './server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createBlock = async (block: BlockInsert) => {
	'use server';
	console.log(block.text)

	const supabase = createClient();
	const { error } = await supabase.from('blocks').insert(block);

	if (error) {
		redirect(`/knowledge-base/${block.page}?error=${error.message}`);
	}

	revalidateTag('pages');
};

export const createPage = async (formData: FormData) => {
	const supabase = createClient();
	const title = formData.get('title') as string;
	const { data, error } = await supabase.from('pages').insert({ title }).select('id').single();
	revalidateTag('pages');
	redirect(`/knowledge-base/${data?.id}`);
}

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

export const createConfiguration = async (formData: FormData) => {
	console.log(formData)
	const supabase = createClient();
	const name = formData.get('name') as string;
	const status = formData.get('status') as string;
	const company = formData.get('company') as string;
	const user = formData.get('contact') as string;
	const product = formData.get('product') as string;
	const type = formData.get('type') as string;
	// console.log('NAME ->', name, '\tSTATUS ->', status: parseInt(status),'\tCOMPANY ->',  company: parseInt(company), '\tUSER ->', user, '\tProduct ->', product, '\tType ->', type)

	const { error } = await supabase.from('configurations').insert({ name, status: parseInt(status), company: parseInt(company), user: parseInt(user), product, type });

	console.log(error)

	revalidateTag('configurations');
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