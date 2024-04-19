'use server';
import { unstable_cache } from 'next/cache';
import { createClient } from './server';

export const getCachedPage = unstable_cache(async (id: string) => await getPage(id), ['pages'], { tags: ['pages'] });

const getPage = async (id: string) => {
	const supabase = createClient();
	const { data: page, error } = await supabase
		.from('pages')
		.select('*, blocks(*)')
		.eq('id', id)
		.order('created_at', { referencedTable: 'blocks', ascending: true })
		.single();

	return page;
};
