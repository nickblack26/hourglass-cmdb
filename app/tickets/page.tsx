import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertOctagonIcon, CalendarDaysIcon, EllipsisIcon, FilterIcon, FocusIcon, MergeIcon, SearchIcon, TicketIcon } from 'lucide-react';
import TicketList from './ticket-list';

const Page = async () => {
	return (
		<main>
			<header className='grid grid-cols-3 items-center'>
				<h1 className='text-xl font-semibold'>Tickets</h1>

				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Button variant='ghost'>
						<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
					</Button>

					<Button variant='outline'>
						<FocusIcon className='h-4 w-4 mr-1.5' />
						Focus Mode
					</Button>

					<Button>Add Ticket</Button>
				</div>
			</header>

			<Separator />

			<section className='flex items-center gap-3'>
				<div
					className={cn(
						'flex items-center max-w-60 border px-3 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-full'
					)}
				>
					<SearchIcon className='w-4 h-4 mr-1.5' />
					<span className='inline-flex'>Search...</span>
					<kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
						<span className='text-xs'>⌘</span>K
					</kbd>
				</div>

				<Button variant='ghost'>
					<TicketIcon className='w-4 h-4 mr-1.5' /> Type
				</Button>

				<Button variant='ghost'>
					<MergeIcon className='w-4 h-4 mr-1.5 rotate-180' /> Source
				</Button>

				<Button variant='ghost'>
					<AlertOctagonIcon className='w-4 h-4 mr-1.5 ' /> Priority
				</Button>

				<Button variant='ghost'>
					<CalendarDaysIcon className='w-4 h-4 mr-1.5' /> Date Added
				</Button>

				<Button variant='ghost'>
					<FilterIcon className='w-4 h-4 mr-1.5' /> Tickets Filter
				</Button>
			</section>

			<Separator />

			<section className='space-y-3'>
				<Suspense fallback={<div>Loading...</div>}>
					<TicketList />
				</Suspense>
			</section>
		</main>
	);
};

export default Page;
