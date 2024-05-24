'use client';

import Link from 'next/link';
import {
	LucideIcon,
	LineChartIcon,
	TicketIcon,
	SparklesIcon,
	UsersIcon,
	CircleHelpIcon,
	CableIcon,
	ShoppingCartIcon,
	Building2Icon,
	Settings,
	Inbox,
	Scan,
	Calendar,
	ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AccountSwitcher } from './account-switcher';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { CommandMenu } from '@/components/command-menu';
import { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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

const userNavSection: NavLink[] = [
	{
		title: 'Inbox',
		label: '9',
		icon: Inbox,
		variant: 'default',
		href: '/inbox',
	},
	{
		title: 'My issues',
		label: '128',
		icon: Scan,
		variant: 'default',
		href: '/my-issues/assigned',
	},
];

const firstNavSection: NavLink[] = [
	{
		title: 'Dashboard',
		label: '128',
		icon: LineChartIcon,
		variant: 'default',
		href: '/',
	},
	{
		title: 'Assets',
		label: '',
		icon: CableIcon,
		variant: 'ghost',
		href: '/assets',
	},

	{
		title: 'Tickets',
		label: '23',
		icon: TicketIcon,
		variant: 'ghost',
		href: '/tickets',
	},

	{
		title: 'Companies',
		icon: Building2Icon,
		variant: 'ghost',
		href: '/companies',
	},
	{
		title: 'users',
		label: '',
		icon: UsersIcon,
		variant: 'ghost',
		href: '/contacts',
	},
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
	teams: Team[];
}

export function Nav({ isCollapsed, teams }: NavProps) {
	const mappedTeams: NavLink[] = teams.map((team) => ({ title: team.name, icon: Calendar, variant: 'default', href: `/teams/${team.identifier}` }));
	const pathname = usePathname();
	const navSections: NavSection[] = [
		{ links: userNavSection },
		{ header: 'Workspace', links: firstNavSection },
		{ header: 'Teams', links: mappedTeams },
	];

	return (
		<nav data-collapsed={isCollapsed} className='group flex flex-col gap-3 p-2 data-[collapsed=true]:py-2 bg-neutral-100 h-screen'>
			<AccountSwitcher isCollapsed={isCollapsed} accounts={appSections} />

			<Separator />

			<div className='flex flex-col h-full gap-6 pb-3'>
				{navSections.map(({ header, links, footer }, index) => (
					<ul key={index} className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'>
						{header && !isCollapsed ? (
							<Collapsible
								defaultOpen
								className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'
							>
								<div className='flex items-center gap-1.5'>
									<h2 className='text-xs px-3 font-medium text-muted-foreground'>{header}</h2>
									<CollapsibleTrigger>
										<ArrowDown className='w-3 h-3 transition-transform duration-200' />
									</CollapsibleTrigger>
								</div>
								<CollapsibleContent className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'>
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
								</CollapsibleContent>
							</Collapsible>
						) : (
							<>
								{header && !isCollapsed && <h2 className='text-xs px-3 font-medium text-muted-foreground'>{header}</h2>}
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
							</>
						)}
					</ul>
				))}

				<ul className='flex flex-col gap-1 mt-auto'>
					{isCollapsed ? (
						<Tooltip delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									href='/settings'
									className={cn(
										buttonVariants({ variant: pathname.includes('/settings') ? 'default' : 'ghost', size: 'icon' }),
										'h-9 w-9',
										pathname.includes('/settings') && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
									)}
								>
									<Settings className='h-4 w-4' />
									<span className='sr-only'>Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right' className='flex items-center gap-3'>
								Settings
							</TooltipContent>
						</Tooltip>
					) : (
						<Link
							href='/settings'
							className={cn(
								buttonVariants({ variant: pathname.includes('/settings') ? 'default' : 'ghost', size: 'sm' }),
								pathname.includes('/settings') && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
								'justify-start'
							)}
						>
							<Settings className='h-4 w-4 mr-1.5' />
							<span className='group-[[data-collapsed=true]]:hidden'>Settings</span>
						</Link>
					)}

					<CommandMenu isCollapsed={isCollapsed} />

					{/* {user && <UserInfo user={user} isCollapsed={isCollapsed} />} */}
				</ul>
			</div>
		</nav>
	);
}
