import React, { ReactNode } from 'react';
import Links from './links';
import { ObjectId } from 'mongodb';
import { getDocuments } from '@/lib/mongodb/read';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props) => {
	const teams = await getDocuments<Team>('teams', { organization: new ObjectId('665888e02684136c5e529eb4') });

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
