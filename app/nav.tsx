'use client';

import Link from 'next/link';
import {
	LucideIcon,
	LineChartIcon,
	MessageSquareTextIcon,
	BarChartBigIcon,
	TicketIcon,
	SparklesIcon,
	UsersIcon,
	MessagesSquareIcon,
	TriangleIcon,
	CircleHelpIcon,
	CableIcon,
	ShoppingCartIcon,
	SettingsIcon,
	SearchIcon,
	UserCircle,
	Building2Icon,
	User,
	CheckCircle2,
	ChevronRight,
	XCircle,
	Clock,
	Building,
	Home,
	MapPin,
	Circle,
	LogOut,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AccountSwitcher } from './account-switcher';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { CommandMenu } from '@/components/command-menu';
import CallCard from '@/components/call-card';
import CallButton from './call-button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ReactNode, useEffect, useState } from 'react';
import UserInfo from '@/components/user-info';
import { createClient } from '@/lib/supabase/client';
import { User as AuthUser } from '@supabase/supabase-js';

interface NavLink {
	title: string;
	label?: string;
	icon: LucideIcon;
	variant: 'default' | 'ghost';
	href?: string;
	action?: React.ReactNode;
}

interface NavSection {
	header?: string;
	links: NavLink[];
	footer?: string | React.ReactNode;
}

const firstNavSection: NavLink[] = [
	{
		title: 'Dashboard',
		label: '128',
		icon: LineChartIcon,
		variant: 'default',
		href: '/',
	},
	{
		title: 'Inbox',
		label: '9',
		icon: MessageSquareTextIcon,
		variant: 'ghost',
		href: '/inbox',
	},
	{
		title: 'Assets',
		label: '',
		icon: CableIcon,
		variant: 'ghost',
		href: '/assets',
	},
	// {
	// 	title: 'Products',
	// 	label: '',
	// 	icon: ShoppingCartIcon,
	// 	variant: 'ghost',
	// 	href: '/products',
	// },
	{
		title: 'Tickets',
		label: '23',
		icon: TicketIcon,
		variant: 'ghost',
		href: '/tickets',
	},
	// {
	// 	title: 'Knowledge Base',
	// 	label: '',
	// 	icon: SparklesIcon,
	// 	variant: 'ghost',
	// 	href: '/knowledge-base',
	// },
	{
		title: 'Companies',
		icon: Building2Icon,
		variant: 'ghost',
		href: '/companies',
	},
	{
		title: 'Contacts',
		label: '',
		icon: UsersIcon,
		variant: 'ghost',
		href: '/contacts',
	},
	// {
	// 	title: 'Forums',
	// 	label: '',
	// 	icon: MessagesSquareIcon,
	// 	variant: 'ghost',
	// 	href: '/forums',
	// },
	// {
	// 	title: 'Reports',
	// 	label: '',
	// 	icon: BarChartBigIcon,
	// 	variant: 'ghost',
	// 	href: '/reports',
	// },
];

const appSections: {
	label: string;
	email: string;
	icon: ReactNode;
}[] = [
	{
		email: 'Service',
		icon: <TicketIcon />,
		label: 'Service',
	},
	{
		email: 'Product',
		icon: <ShoppingCartIcon />,
		label: 'Product',
	},
	{
		email: 'Knowledge Base',
		icon: <SparklesIcon />,
		label: 'Knowledge Base',
	},
];

interface NavProps {
	isCollapsed: boolean;
}

export function Nav({ isCollapsed }: NavProps) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const supabase = createClient();
	const pathname = usePathname();
	const navSections: NavSection[] = [
		{ links: firstNavSection },
		{ header: 'Conversation', links: [] },
		{ header: 'Favorites', links: [], footer: 'Hover over any table and click the star to add it here.' },
		{ header: 'Pinned Tickets', links: [] },
		{
			links: [],
			footer: (
				<Button variant='link' size='sm' className='text-muted-foreground'>
					<CircleHelpIcon className='w-4 h-4 mr-1.5 -ml-3' />
					Help & Support
				</Button>
			),
		},
	];

	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => setUser(data.user));
	}, [supabase.auth]);

	return (
		<nav data-collapsed={isCollapsed} className='group flex flex-col gap-3 p-2 data-[collapsed=true]:py-2 bg-neutral-100 h-screen'>
			<AccountSwitcher isCollapsed={isCollapsed} accounts={appSections} />

			<Separator />

			{navSections.map(({ header, links, footer }, index) => (
				<ul
					key={`${header}-index`}
					className='flex flex-col h-full gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'
				>
					{header && !isCollapsed && <h2 className='text-xs px-3 font-medium text-muted-foreground uppercase'>{header}</h2>}
					{header === 'Conversation' && <CallCard isCollapsed />}
					{links.length > 0 &&
						links.map((link, index) =>
							isCollapsed ? (
								<Tooltip key={index} delayDuration={0}>
									<TooltipTrigger asChild>
										{link.href ? (
											<Link
												href={link?.href ?? '#'}
												className={cn(
													buttonVariants({ variant: link.href === pathname ? 'default' : 'ghost', size: 'icon' }),
													'h-9 w-9',
													link.href === pathname && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
												)}
											>
												<link.icon className='h-4 w-4' />
												<span className='sr-only'>{link.title}</span>
											</Link>
										) : (
											<>{link.action}</>
										)}
									</TooltipTrigger>
									<TooltipContent side='right' className='flex items-center gap-3'>
										{link.title}
										{link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>}
									</TooltipContent>
								</Tooltip>
							) : (
								<>
									{link.href ? (
										<Link
											key={index}
											href={link?.href ?? '#'}
											className={cn(
												buttonVariants({ variant: link.href === pathname ? 'default' : 'ghost', size: 'sm' }),
												link.href === pathname && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
												'justify-start',
												index + 1 === links.length && 'mt-auto'
											)}
										>
											<link.icon className='mr-1.5 h-4 w-4' />
											{link.title && !isCollapsed && <span className='group-[[data-collapsed=true]]:hidden'>{link.title}</span>}
											{link.label && !isCollapsed && (
												<span
													className={cn(
														'ml-auto',
														link.variant === 'default' && 'text-background dark:text-white',
														'rounded-full bg-red-600 w-6 h-6 flex items-center justify-center'
													)}
												>
													{link.label}
												</span>
											)}
										</Link>
									) : (
										<></>
									)}
								</>
							)
						)}
					{footer && !isCollapsed && <span className='text-xs px-3 font-light text-muted-foreground'>{footer}</span>}
				</ul>
			))}

			<ul className='flex flex-col h-full gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'>
				<Link
					href={'/settings'}
					className={cn(
						buttonVariants({ variant: '/settings' === pathname ? 'default' : 'ghost', size: 'icon' }),
						'h-9 w-9',
						'/settings' === pathname && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
					)}
				>
					<SettingsIcon className='h-4 w-4' />
				</Link>

				<CommandMenu isCollapsed={isCollapsed} />

				<CallButton />

				{user && <UserInfo user={user} />}
			</ul>
		</nav>
	);
}
