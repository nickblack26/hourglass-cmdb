import React, { ReactNode } from 'react';
import Links from './links';
import { createClient } from '@/lib/supabase/server';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props) => {
	const supabase = createClient();
	const { data: teams, error } = await supabase.from('teams').select();

	return (
		<main className='min-h-screen flex flex-col'>
			<div className='grid grid-cols-[256px_1fr] gap-6 grow'>
				<Links teams={teams ?? []} />
				<div className='max-w-screen-sm w-full mx-auto py-12 px-6'>{children}</div>
			</div>
		</main>
	);
};

export default Layout;
