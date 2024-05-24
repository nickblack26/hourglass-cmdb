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
		<main className='flex min-h-100vh flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
			{/* <div className='mx-auto grid w-full gap-2'>
				<h1 className='text-3xl font-semibold'>Settings</h1>
			</div> */}
			<div className='mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]'>
				<Links teams={teams ?? []} />
				<div className='max-w-screen-sm w-full mx-auto'>{children}</div>
			</div>
		</main>
	);
};

export default Layout;
