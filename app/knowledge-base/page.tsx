import { createClient } from '@/lib/supabase/server';
import React from 'react';

const Page = async () => {
	const supabase = createClient();
	const { data: pages, error } = await supabase.from('pages').select().is('parent', null);

	return <></>;
};

export default Page;
