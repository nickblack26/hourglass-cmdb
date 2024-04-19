'use server';

import { redirect } from 'next/navigation';
import { createClient } from './server';
import { revalidateTag } from 'next/cache';

export const deleteBlock = async (id: string) => {
	'use server';
	const supabase = createClient();
	const { error } = await supabase.from('blocks').delete().eq('id', id);

	revalidateTag('pages');
};

export const deleteConfiguration = async (id: string) => {
	'use server';
	const supabase = createClient();
	const { error } = await supabase.from('configurations').delete().eq('id', id);

	revalidateTag('configurations');
};

