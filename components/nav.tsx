'use client';
import { Ticket, Focus, Building2, Settings, Inbox, SquareUser, Users, Cable } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CommandMenu } from '@/components/command-menu';
import NavLinkItem from './nav-link-item';
import NavLinkSection from './nav-link-section';
import UserInfo from './user-info';
import { LinkItem, LinkSection } from '@/types/data';
import { icons } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

const userNavSection: LinkItem[] = [
	{
		name: 'Inbox',
		icon: Inbox,
		href: '/inbox',
	},
	{
		name: 'My issues',
		icon: Focus,
		href: '/my-issues/assigned',
	},
];

const firstNavSection: LinkItem[] = [
	{
		name: 'Assets',
		icon: Cable,
		href: '/assets',
	},
	{
		name: 'Tickets',
		icon: Ticket,
		href: '/tickets',
	},
	{
		name: 'Companies',
		icon: Building2,
		href: '/companies',
	},
	{
		name: 'Users',
		icon: Users,
		href: '/contacts',
	},
	{
		name: 'Teams',
		icon: SquareUser,
		href: '/contacts',
	},
];

type Props = {
	isCollapsed: boolean;
	teams: Team[];
	user: Contact;
};

export function Nav({ isCollapsed, teams, user }: Props) {
	const pathname = usePathname();

	const mappedTeams: LinkItem[] = teams.map((team) => ({
		name: team.name,
		icon: icons.find((icon) => icon.value === team.icon)?.icon,
		href: `/team/${team.id}`,
		links: [
			{
				name: 'Companies',
				icon: SquareUser,
				href: `/team/${team.identifier}/companies`,
			},
			{
				name: 'Contacts',
				icon: Users,
				href: `/team/${team.identifier}/contacts`,
			},
			{
				name: 'Assets',
				icon: Cable,
				href: `/team/${team.identifier}/assets`,
			},
			{
				name: 'Tickets',
				icon: Ticket,
				href: `/team/${team.identifier}/tickets`,
			},
		],
	}));

	const navSections: LinkSection[] = [
		{ links: userNavSection },
		{ name: 'Workspace', links: firstNavSection },
		{ name: 'Teams', links: mappedTeams },
	];

	return (
		<nav
			data-collapsed={isCollapsed}
			className='group flex flex-col gap-3 p-2 data-[collapsed=true]:py-2 bg-secondary h-screen'
		>
			<div className='inline-flex items-center'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='justify-start w-full'
						>
							<Image
								src='/hourglass.svg'
								alt='Hourglass logo'
								width={14}
								height={14}
								className='mr-1.5'
							/>

							<span className='group-[[data-collapsed=true]]:hidden font-semibold text-primary text-sm line-clamp-1'>
								Hourglass
							</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align='start'
						className='w-52'
					>
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href='/settings/account/preferences'>Preferences</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href='/settings'>Workspace settings</Link>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Link href='/settings/members'>Invite and manage members</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem>Download desktop app</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				{user && (
					<div className='ml-auto'>
						<UserInfo
							worker={null}
							user={user}
							isCollapsed={isCollapsed}
						/>
					</div>
				)}
			</div>

			{navSections.map((section, index) => (
				<ul
					key={index}
					className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'
				>
					<NavLinkSection
						section={section}
						isCollapsed={isCollapsed}
						pathname={pathname}
					/>
				</ul>
			))}

			<ul className='flex flex-col gap-1 mt-auto'>
				<NavLinkItem
					link={{
						icon: Settings,
						name: 'Settings',
						href: '/settings',
					}}
					isCollapsed={isCollapsed}
					pathname={pathname}
				/>

				<CommandMenu isCollapsed={isCollapsed} />
			</ul>
		</nav>
	);
}
