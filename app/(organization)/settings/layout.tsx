import Link from 'next/link';
import React, { ReactNode } from 'react';
import Links from './links';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
			<div className='mx-auto grid w-full gap-2'>
				<h1 className='text-3xl font-semibold'>Settings</h1>
			</div>
			<div className='mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
				<Links />

				{children}
			</div>
		</main>
	);
};

export default Layout;
