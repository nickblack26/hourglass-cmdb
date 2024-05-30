'use client';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { icons } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
	Bell,
	CircleUser,
	LayoutGrid,
	Layers,
	LucideIcon,
	Puzzle,
	SquareUser,
	Clock,
	Building2,
	Rss,
	ReceiptText,
	HandPlatter,
	Building,
	ArrowDown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
	teams: Team[];
};

interface LinkSection {
	name: string;
	icon: LucideIcon;
	href: string;
	links: Link[];
}

interface Link {
	name: string;
	href: string;
	icon: LucideIcon;
}

const teamLinks: Link[] = [
	{ name: 'General', href: '#', icon: HandPlatter },
	{ name: 'Members', href: '/members', icon: HandPlatter },
	{ name: 'Workflow', href: '/workflow', icon: HandPlatter },
	{ name: 'Triage', href: '/triage', icon: HandPlatter },
	{ name: 'Labels', href: '/lables', icon: HandPlatter },
	{ name: 'Templates', href: '/templates', icon: HandPlatter },
	{ name: 'Cycles', href: '/cycles', icon: HandPlatter },
	{ name: 'Notifications', href: '/notifications', icon: HandPlatter },
];

const Links = ({ teams }: Props) => {
	const pathname = usePathname();

	const sections: LinkSection[] = [
		{
			name: 'Workspace',
			icon: Building,
			href: '/settings',
			links: [
				{ name: 'General', href: '', icon: LayoutGrid },
				{ name: 'Security', href: '/security', icon: SquareUser },
				{ name: 'Members', href: '/members', icon: ReceiptText },
				{ name: 'Labels', href: '/labels', icon: ReceiptText },
				{ name: 'Projects', href: '/projects', icon: ReceiptText },
				{ name: 'Templates', href: '/templates', icon: ReceiptText },
				{ name: 'Roadmaps', href: '/roadmaps', icon: ReceiptText },
				{ name: 'SLAs', href: '/slas', icon: ReceiptText },
				{ name: 'Queues', href: '/queues', icon: ReceiptText },
				{ name: 'Workflows', href: '/workflows', icon: ReceiptText },
				{ name: 'Types', href: '/types', icon: ReceiptText },
				{ name: 'Integrations', href: '#', icon: Layers },
				{ name: 'Plans', href: '/plans', icon: ReceiptText },
				{ name: 'Billing', href: '/billing', icon: ReceiptText },
				{ name: 'Import / Export', href: '/channels', icon: Rss },
				{ name: 'Integrations', href: '/integrations', icon: Puzzle },
			],
		},
		{
			name: 'My Account',
			icon: CircleUser,
			href: '/settings/account',
			links: [
				{ name: 'Profile', href: '#', icon: CircleUser },
				{ name: 'Working hours', href: '/hours', icon: Clock },
				{ name: 'Notifications', href: '#', icon: Bell },
				{ name: 'Organizations', href: '#', icon: Building2 },
				{ name: 'Advanced', href: '#', icon: LayoutGrid },
			],
		},
	];

	return (
		<nav className='grid gap-4'>
			{sections.map((section) => (
				<ul key={section.name} className='space-y-0.5'>
					<div className='flex items-center gap-2 text-muted-foreground mb-2'>
						<section.icon className='w-3.5 h-3.5 inline' />
						<span className='text-sm font-medium'>{section.name}</span>
					</div>
					{section.links.map((link) => {
						const href = `${section.href}${link.href}`;
						return (
							<li key={link.href} className='pl-3'>
								<Button variant={pathname === href ? 'secondary' : 'ghost'} size='sm' className='h-7 py-0 w-full text-left justify-start' asChild>
									<Link href={href} className={cn('text-muted-foreground', pathname === href && 'text-primary font-semibold')}>
										{link.name}
									</Link>
								</Button>
							</li>
						);
					})}
				</ul>
			))}

			{teams?.map((team) => {
				const teamIcon = icons.find((i) => i.value === team.icon);
				return (
					<Collapsible key={team.id} defaultOpen>
						<ul>
							<CollapsibleTrigger className='flex items-center gap-2 text-muted-foreground mb-2'>
								{teamIcon && <teamIcon.icon className='w-3.5 h-3.5 inline' />}
								<span className='text-sm font-medium'>{team.name}</span>
								<ArrowDown className='w-3.5 h-3.5 inline' />
							</CollapsibleTrigger>
							<CollapsibleContent>
								{teamLinks.map((link) => {
									const href = `/settings/teams/${team.identifier}${link.href}`;

									return (
										<li key={link.href} className='pl-3'>
											<Button
												variant={pathname === href ? 'secondary' : 'ghost'}
												size='sm'
												className='h-7 py-0 w-full text-left justify-start'
												asChild
											>
												<Link href={href} className={cn('text-muted-foreground', pathname === href && 'text-primary font-semibold')}>
													{link.name}
												</Link>
											</Button>
										</li>
									);
								})}
							</CollapsibleContent>
						</ul>
					</Collapsible>
				);
			})}
		</nav>
	);
};

export default Links;
