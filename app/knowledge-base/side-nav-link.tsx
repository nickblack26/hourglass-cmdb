'use client';
import { AccordionTrigger } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpenTextIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
	page: Page & { pages: Page[] };
};

const SideNavLink = ({ page }: Props) => {
	const pathname = usePathname();

	const href = `/knowledge-base/${page.id}`;

	return (
		<Link
			href={href}
			className={cn(
				buttonVariants({ variant: href === pathname ? 'default' : 'ghost', size: 'sm' }),
				href === pathname && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
				'justify-start w-full'
			)}
		>
			{page.pages?.length > 0 && <AccordionTrigger className='mr-1.5' />}

			<BookOpenTextIcon className='mr-1.5 h-4 w-4' />

			<span className='line-clamp-1'>{page.title}</span>
		</Link>
	);
};

export default SideNavLink;
