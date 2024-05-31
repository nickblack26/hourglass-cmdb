'use server';
import { unstable_cache } from 'next/cache';
import { createClient } from './server';
import { redirect } from 'next/navigation';

export const getCachedPage = unstable_cache(async (id: string) => await getPage(id), ['pages'], { tags: ['pages'] });

const getPage = async (id: string) => {
	const db = await createClient();
	const { data: page, error } = await supabase
		.collection('pages')
		.select('*, blocks(*)')
		.eq('id', id)
		.order('created_at', { referencedTable: 'blocks', ascending: true })
		.single();

	return page;
};

export const signOut = async () => {
	const db = await createClient();
	await supabase.auth.signOut();

	console.log('signing out');

	redirect('/login');
};
