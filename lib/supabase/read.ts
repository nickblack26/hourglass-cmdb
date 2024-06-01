'use server';
import { createClient } from './server';
import { redirect } from 'next/navigation';

export const signOut = async () => {
	const db = await createClient();
	// await supabase.auth.sign Out();

	console.log('signing out');

	redirect('/login');
};
