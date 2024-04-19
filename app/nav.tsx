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
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
		title: 'Configurations',
		label: '',
		icon: CableIcon,
		variant: 'ghost',
		href: '/configurations',
	},
	{
		title: 'Products',
		label: '',
		icon: ShoppingCartIcon,
		variant: 'ghost',
		href: '/products',
	},
	{
		title: 'Tickets',
		label: '23',
		icon: TicketIcon,
		variant: 'ghost',
		href: '/tickets',
	},
	{
		title: 'Knowledge Base',
		label: '',
		icon: SparklesIcon,
		variant: 'ghost',
		href: '/knowledge-base',
	},
	{
		title: 'Companies',
		icon: Building2Icon,
		variant: 'ghost',
		href: '/companies',
	},
	{
		title: 'Customers',
		label: '',
		icon: UsersIcon,
		variant: 'ghost',
		href: '/contacts',
	},
	{
		title: 'Forums',
		label: '',
		icon: MessagesSquareIcon,
		variant: 'ghost',
		href: '/forums',
	},
	{
		title: 'Reports',
		label: '',
		icon: BarChartBigIcon,
		variant: 'ghost',
		href: '/reports',
	},
];

interface NavProps {
	isCollapsed: boolean;
}

export function Nav({ isCollapsed }: NavProps) {
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
		// {
		// 	links: [
		// 		{ icon: SettingsIcon, href: '/settings', title: 'Settings', variant: 'ghost' },
		// 		{ icon: SearchIcon, title: 'Search', variant: 'ghost' },
		// 		{ icon: UserCircle, title: 'Nick Black', variant: 'ghost', action: <CommandMenu isCollapsed={isCollapsed} /> },
		// 	],
		// },
	];

	return (
		<nav data-collapsed={isCollapsed} className='group flex flex-col gap-3 p-2 data-[collapsed=true]:py-2 bg-neutral-100 h-screen'>
			<AccountSwitcher isCollapsed={isCollapsed} accounts={[{ email: 'nblack@velomethod.com', icon: <TriangleIcon />, label: 'Nick Black' }]} />

			<Separator />

			{/* <CallButton /> */}

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

					{/* <span className='group-[[data-collapsed=true]]:hidden'>Settings</span> */}
				</Link>

				<CommandMenu isCollapsed={isCollapsed} />

				<CallButton />

				<Popover>
					<PopoverTrigger asChild>
						<Button variant='ghost' size='lg' className='flex items-center h-9 w-9 p-0'>
							<User className='h-4 w-4' />
							{/* <div className='p-1.5 rounded-md bg-secondary'>
								<Avatar>
									<AvatarFallback>
									</AvatarFallback>
								</Avatar>
							</div> */}
						</Button>
					</PopoverTrigger>

					<PopoverContent side='right' className='z-50 md:min-w-48 mb-4 space-y-1.5'>
						<header className='p-0 justify-start gap-3'>
							<Avatar>
								<AvatarFallback>
									<User className='h-4 w-4' />
								</AvatarFallback>
							</Avatar>

							<div>
								<p className='font-semibold text-sm'>Nick Black</p>
								<p className='text-sm'>nblack@velomethod.com</p>
							</div>
						</header>

						<section className='px-0'>
							<div className='grid grid-cols-5 gap-1.5'>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant={'outline'} className='justify-start text-left font-normal col-span-2'>
											<Circle className='mr-1.5 h-3 w-3 fill-green-500 stroke-green-500' />
											<span>Available</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'></PopoverContent>
								</Popover>

								<Popover>
									<PopoverTrigger asChild>
										<Button variant={'outline'} className='justify-start text-left font-normal col-span-3'>
											<span>Set status message</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'></PopoverContent>
								</Popover>

								<Popover>
									<PopoverTrigger asChild>
										<Button variant={'outline'} className='justify-start text-left font-normal col-span-5'>
											<UserCircle className='w-3 h-3 mr-3' />
											<span>Manage account</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'></PopoverContent>
								</Popover>

								<Popover>
									<PopoverTrigger asChild>
										<Button variant={'outline'} className='justify-start text-left font-normal col-span-5'>
											<LogOut className='w-3 h-3 mr-3' />
											<span>Sign out</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'></PopoverContent>
								</Popover>
							</div>

							{/* <div>
								<DropdownMenu>
									<DropdownMenuTrigger className='relative w-full flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
										<CheckCircle2 className='w-4 h-4 fill-green-500 stroke-primary-foreground mr-1.5' />
										Available
										<ChevronRight className='ml-auto w-4 h-4' />
									</DropdownMenuTrigger>

									<DropdownMenuContent side='right' className='min-w-52 mb-2'>
										<DropdownMenuLabel>Status</DropdownMenuLabel>

										<DropdownMenuSeparator />

										<DropdownMenuGroup>
											<DropdownMenuCheckboxItem>
												<XCircle className='w-4 h-4 text-muted-foreground mr-1.5' />
												Offline
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem checked>
												<CheckCircle2 className='w-4 h-4 fill-green-500 text-primary-foreground mr-1.5' />
												Available
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Clock className='w-4 h-4 fill-orange-500 text-primary-foreground mr-1.5' />
												Unavailable
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Clock className='w-4 h-4 fill-orange-500 text-primary-foreground mr-1.5' />
												Break
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Building2Icon className='w-4 h-4 fill-red-500 text-primary-foreground mr-1.5' />
												On-Site
											</DropdownMenuCheckboxItem>
										</DropdownMenuGroup>

										<DropdownMenuSeparator />

										<DropdownMenuSub>
											<DropdownMenuSubTrigger className='flex items-center'>
												<Clock className='w-3.5 h-3.5 text-muted-foreground mr-1.5' />
												Duration
											</DropdownMenuSubTrigger>

											<DropdownMenuSubContent className='min-w-52 mb-1'>
												<DropdownMenuLabel>Status</DropdownMenuLabel>

												<DropdownMenuItem>
													<CheckCircle2 className='w-4 h-4 fill-green-500 stroke-primary-foreground mr-1.5' />
													Available
												</DropdownMenuItem>

												<DropdownMenuLabel>Reset status after</DropdownMenuLabel>

												<DropdownMenuRadioGroup>
													<DropdownMenuRadioItem value='thirty'>30 minutes</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='hour'>1 hour</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='twoHour'>2 hour</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='today'>Today</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='thisWeek'>This week</DropdownMenuRadioItem>
												</DropdownMenuRadioGroup>
											</DropdownMenuSubContent>
										</DropdownMenuSub>
									</DropdownMenuContent>
								</DropdownMenu>

								<DropdownMenu>
									<DropdownMenuTrigger className='relative w-full flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
										<MapPin className='w-4 h-4 mr-1.5' />
										Set work location
										<ChevronRight className='ml-auto w-4 h-4' />
									</DropdownMenuTrigger>

									<DropdownMenuContent side='right' className='min-w-52 mb-2'>
										<DropdownMenuLabel>For today</DropdownMenuLabel>
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<Building className='w-4 h-4 mr-1.5' /> Office
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Home className='w-4 h-4 mr-1.5' /> Remote
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div> */}
						</section>
					</PopoverContent>
				</Popover>

				{/* <Link
					href={'/settings'}
					className={cn(
						buttonVariants({ variant: '/settings' === pathname ? 'default' : 'ghost', size: 'icon' }),
						'h-9 w-9',
						'/settings' === pathname && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
					)}
				>
					<SearchIcon className='h-4 w-4' />

					<span className='group-[[data-collapsed=true]]:hidden'>Settings</span>
				</Link> */}
			</ul>
		</nav>
	);
}
