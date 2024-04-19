'use server';

import { redirect } from 'next/navigation';
import { createClient } from './server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const updateBlock = async (id: string, block: BlockUpdate) => {
	'use server';
	const supabase = createClient();
	const { error } = await supabase.from('blocks').update(block).eq('id', id);

	if (error) {
		redirect(`/knowledge-base/${block.page}?error=${error.message}`);
	}

	revalidateTag('pages');
};

export const updateConfiguration = async (id: string, configuration: ConfigurationUpdate) => {
	'use server';
	const supabase = createClient();
	const { error } = await supabase.from('configurations').update(configuration).eq('id', id);
};
