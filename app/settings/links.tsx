'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, CircleUser, LayoutGrid, Layers, LucideIcon, Puzzle, SquareUser, Clock, Building2, Rss, ReceiptText, HandPlatter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

interface LinkSection {
	name: string;
	href: string;
	links: Link[];
}

interface Link {
	name: string;
	href: string;
	icon: LucideIcon;
}

const Links = (props: Props) => {
	const pathname = usePathname();

	const sections: LinkSection[] = [
		{
			name: 'Workplace',
			href: '/settings',
			links: [
				{ name: 'General', href: '', icon: LayoutGrid },
				{ name: 'Billing', href: '/security', icon: ReceiptText },
				{ name: 'Security', href: '/security', icon: SquareUser },
				{ name: 'Integrations', href: '#', icon: Layers },
				{ name: 'Notifications', href: '#', icon: Bell },
				{ name: 'Integrations', href: '/types', icon: Puzzle },
				{ name: 'Channels', href: '/channels', icon: Rss },
				{ name: 'Services', href: '/services', icon: HandPlatter },
			],
		},
		{
			name: 'My Account',
			href: '/settings/account',
			links: [
				{ name: 'Profile', href: '/hours', icon: CircleUser },
				{ name: 'Working hours', href: '/hours', icon: Clock },
				{ name: 'Organizations', href: '#', icon: Building2 },
				{ name: 'Advanced', href: '#', icon: LayoutGrid },
			],
		},
	];

	return (
		<nav className='grid gap-4'>
			{sections.map((section) => (
				<ul key={section.name}>
					<h4 className='my-3 last:mt-0'>{section.name}</h4>
					{section.links.map((link) => (
						<li key={link.href}>
							<Button variant='ghost' asChild>
								<Link
									href={`${section.href}${link.href}`}
									className={cn('text-muted-foreground', pathname === `${section.href}${link.href}` && 'text-primary font-semibold')}
								>
									<link.icon className='w-4 h-4 inline-block mr-1.5' />
									{link.name}
								</Link>
							</Button>
						</li>
					))}
				</ul>
			))}
		</nav>
	);
};

export default Links;
