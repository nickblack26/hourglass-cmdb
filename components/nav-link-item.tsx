import React from 'react';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { LinkItem } from '@/types/data';
import Link from 'next/link';

type Props = {
	isCollapsed: boolean;
	link: LinkItem;
	pathname: string;
	isLast?: boolean;
	className?: string;
	hideIcon?: boolean;
};

const NavLinkItem = ({ isCollapsed, link, pathname, className, hideIcon = false }: Props) => {
	return (
		<>
			{isCollapsed ? (
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<Link
							href={link.href}
							className={cn(
								buttonVariants({ variant: link.href === pathname ? 'default' : 'ghost', size: 'icon' }),
								'h-9 w-9',
								link.href === pathname &&
									'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
							)}
						>
							{link.icon && <link.icon />}
							<span className='sr-only'>{link.name}</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent
						side='right'
						className='flex items-center gap-3'
					>
						{link.name}
						{/* {link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>} */}
					</TooltipContent>
				</Tooltip>
			) : (
				<div>
					<Link
						href={link.href}
						className={cn(
							buttonVariants({ variant: link.href === pathname ? 'default' : 'ghost', size: 'sm' }),
							link.href === pathname && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
							'justify-start w-full',
							className
						)}
					>
						{!hideIcon && link.icon && <link.icon className='mr-1.5 h-3.5 w-3.5' />}

						{link.name && !isCollapsed && <span className='group-[[data-collapsed=true]]:hidden'>{link.name}</span>}

						{/* {link.label && !isCollapsed && (
							<span
								className={cn(
									'ml-auto',
									link.variant === 'default' && 'text-background dark:text-white',
									'rounded-full bg-red-600 w-6 h-6 flex items-center justify-center'
								)}
							>
								{link.label}
							</span>
						)} */}
					</Link>

					{link.links?.map((l) => {
						return (
							<NavLinkItem
								key={l.href}
								link={l}
								pathname={pathname}
								isCollapsed={isCollapsed}
								className='pl-6'
							/>
						);
					})}
				</div>
			)}
		</>
	);
};

export default NavLinkItem;
