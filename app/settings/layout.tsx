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
				{/* <nav className='grid gap-4 text-sm text-muted-foreground'>
					<Link href='#' className='font-semibold'>
						General
					</Link>
					<Link href='#'>Security</Link>
					<Link href='#'>Integrations</Link>
					<Link href='#'>Support</Link>
					<Link href='/settings/types'>Types</Link>
					<Link href='/settings/hours'>Working hours</Link>
					<Link href='#'>Organizations</Link>
					<Link href='#'>Advanced</Link>
				</nav> */}
				<Links />

				{children}
			</div>
		</main>
	);
};

export default Layout;
