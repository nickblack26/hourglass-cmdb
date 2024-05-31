'use server';

import { redirect } from 'next/navigation';
import { createClient } from './server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const updateBlock = async (id: string, block: BlockUpdate) => {
	'use server';
	const db = await createClient();
	const { error } = await db.collection('blocks').update(block).eq('id', id);

	if (error) {
		redirect(`/knowledge-base/${block.page}?error=${error.message}`);
	}

	revalidateTag('pages');
};

export const updateConfiguration = async (id: string, configuration: ConfigurationUpdate) => {
	'use server';
	const db = await createClient();
	const { error } = await db.collection('configurations').update(configuration).eq('id', id);
};
