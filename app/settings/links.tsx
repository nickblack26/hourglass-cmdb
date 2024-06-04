'use client';
import LabeledInput from '@/components/labled-input';
import SubmitButton from '@/components/submit-button';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { createDocument } from '@/lib/mongodb/create';
import { cn } from '@/lib/utils';
import { LinkItem, LinkSection } from '@/types/data';
import {
	Bell,
	CircleUser,
	LayoutGrid,
	Layers,
	Puzzle,
	SquareUser,
	Clock,
	Building2,
	Rss,
	ReceiptText,
	Building,
	ChevronLeft,
	Plus,
} from 'lucide-react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { createTeam } from './actions';

type Props = {
	teams: Team[];
};

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
		{
			name: 'Teams',
			icon: SquareUser,
			href: '/settings/teams',
			links: teams?.map((team) => ({
				name: team.name,
				href: `/${team._id.toString()}`,
				icon: LayoutGrid,
				links: [
					{
						name: 'Companies',
						icon: SquareUser,
						href: '/companies',
					},
					{
						name: 'Contacts',
						icon: SquareUser,
						href: '/contacts',
					},
					{
						name: 'Assets',
						icon: SquareUser,
						href: '/assets',
					},
				],
			})),
		},
	];

	return (
		<nav className='flex flex-col gap-3 bg-secondary py-[18px] px-3 h-full'>
			<Link
				href='/'
				className='flex items-center gap-1.5'
			>
				<ChevronLeft className=' h-3.5' /> Settings
			</Link>

			{sections.map((section) => (
				<ul
					key={section.name}
					className='space-y-0.5'
				>
					<div className='flex items-center gap-2 text-muted-foreground mb-2'>
						{section.icon && <section.icon className=' h-3.5 inline' />}
						<span className='text-sm font-medium'>{section.name}</span>
					</div>

					{section.links.map((link) => {
						const href = `${section.href}${link.href}`;
						return (
							<li
								key={link.href}
								className='pl-3'
							>
								<Link
									href={href}
									className={cn(
										buttonVariants({ variant: pathname === href ? 'default' : 'ghost', size: 'sm' }),
										'h-7 py-0 w-full text-left justify-start',
										pathname === href ? 'font-semibold' : 'text-muted-foreground'
									)}
								>
									{link.name}
								</Link>
							</li>
						);
					})}
				</ul>
			))}

			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='ghost'
						className='justify-start h-auto'
					>
						<Plus className='mr-1.5' />
						<span>Add team</span>
					</Button>
				</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new team</DialogTitle>
						<DialogDescription>
							Create a new team to manage separate cycles, workflows and notifications.
						</DialogDescription>
					</DialogHeader>

					<form
						action={createTeam}
						className='space-y-3'
					>
						<LabeledInput
							name='name'
							label='Team icon & name'
							placeholder='e.g. Engineering'
						/>

						<LabeledInput
							name='identifier'
							label='Team identifier'
							placeholder='e.g. ENG'
							description='This is used as the identifier (e.g. ENG-123) for all issues of the team. Keep it short and simple.'
						/>

						<LabeledInput
							label='Copy settings from existing team'
							description="You can choose to copy the settings of an existing team for your newly created team. All settings including workflow and cycle settings are copied, but Slack notification settings and team members won't be copied."
						>
							<Switch />
						</LabeledInput>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant='secondary'>Cancel</Button>
							</DialogClose>

							<SubmitButton>Create Team</SubmitButton>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</nav>
	);
};

export default Links;
