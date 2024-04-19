'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const Links = (props: Props) => {
	const pathname = usePathname();

	const links = [
		{ name: 'General', href: '/settings' },
		{ name: 'Security', href: '#' },
		{ name: 'Integrations', href: '#' },
		{ name: 'Support', href: '#' },
		{ name: 'Types', href: '/settings/types' },
		{ name: 'Working hours', href: '/settings/hours' },
		{ name: 'Organizations', href: '#' },
		{ name: 'Advanced', href: '#' },
	];

	return (
		<nav className='grid gap-4 text-sm text-muted-foreground'>
			{links.map(({ href, name }) => (
				<Link key={href} href={href} className={cn(pathname === href && 'text-primary font-semibold')}>
					{name}
				</Link>
			))}
		</nav>
	);
};

export default Links;
