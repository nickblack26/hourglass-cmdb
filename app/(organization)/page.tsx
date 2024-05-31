import Metric from '@/components/Metric';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { EllipsisIcon } from 'lucide-react';
import AverageCreatedTickets from './charts/average-tickets-created';
import { ChartData, TicketByFirstReply } from './charts/ticket-by-first-reply';
import { TicketByChannel } from './charts/ticket-by-channel';
import { Progress } from '@/components/ui/progress';
import { createClient } from '@/lib/mongodb';
import { addDays, getTime, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/auth';

interface TicketData {
	total_tickets: number;
	avg_response_time: number;
}

export default async function Home() {
	const session = await auth();
	const db = await createClient();
	const dateRange: DateRange = {
		from: new Date(),
		to: subDays(new Date(), 30),
	};

	// console.log(await outboundResponse.json());

	// const { data: ticketData, error } = await db
	// 	.collection('tickets')
	// 	.select('total_tickets:count(), avg_response_time:respondMinutes.avg()')
	// 	.lte('dateEntered', dateRange.from?.toISOString())
	// 	.gte('dateEntered', dateRange.to?.toISOString())
	// 	.returns<TicketData[]>()
	// 	.single();

	const ticketData: TicketData = {
		avg_response_time: 1,
		total_tickets: 1,
	};

	// if (error) {
	// 	console.error(error);
	// 	notFound();
	// }

	return (
		<main>
			<header className='grid grid-cols-3 w-full items-center border-b sticky top-0'>
				<h1 className='font-semibold'>Dashboard</h1>
				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Button
						variant='ghost'
						size='sm'
					>
						<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
					</Button>
					<Button>Export CSV</Button>
				</div>
			</header>

			<pre>{JSON.stringify(session, null, 2)}</pre>

			<section className='grid grid-cols-4 gap-3 p-0'>
				<Metric
					title='Created Tickets'
					amount={ticketData.total_tickets.toString()}
					timeline='Compared to last month'
					percentage={1}
				/>
				<Metric
					title='Unsolved Tickets'
					amount='24,208'
					timeline='Compared to last month'
				/>
				<Metric
					title='Solved Tickets'
					amount='24,208'
					timeline='Compared to last month'
				/>
				<Metric
					title='Average First Time Reply'
					amount={`${getTime(ticketData.avg_response_time)} mins`}
					timeline='Compared to last month'
				/>
			</section>

			<section className='border-t grid grid-cols-6 p-0'>
				<div className='p-6 col-span-4 border-r w-full space-y-1'>
					<div className='flex items-center justify-between'>
						<h2>Average Tickets Created</h2>
						<DatePicker />
					</div>

					<div className='grid grid-cols-4 place-items-center gap-3'>
						<div className='grid gap-3'>
							<div className='grid place-items-center'>
								<p className='text-xs text-muted-foreground'>Avg. Ticket Created</p>
								<h3 className='text-lg font-semibold'>4,564</h3>
							</div>

							<div className='grid place-items-center'>
								<p className='text-xs text-muted-foreground'>Avg. Ticket Solved</p>
								<h3 className='text-lg font-semibold'>3,320</h3>
							</div>
						</div>

						<Suspense fallback={<div>Loading...</div>}>
							<AverageCreatedTickets className='col-span-3' />
						</Suspense>
					</div>
				</div>

				<div className='p-6 col-span-2'>
					<h2>Ticket By First Reply Time</h2>
					<Suspense fallback={<div>Loading...</div>}>
						<TicketByFirstReply />
					</Suspense>
				</div>
			</section>

			<section className='grid grid-cols-2 border-t p-0'>
				<div className='p-6 border-r'>
					<h2>Ticket By Channel</h2>
					<Suspense fallback={<div>Loading...</div>}>
						<TicketByChannel />
					</Suspense>
				</div>

				<div className='p-6'>
					<h2>Customer Satisfaction</h2>
					<div className='grid grid-cols-2'>
						<div className='space-y-1 border-r border-b p-6'>
							<p className='text-xs text-muted-foreground'>Responses Received</p>
							<h3 className='text-2xl font-semibold'>156 Customers</h3>
						</div>

						<div className='space-y-1 border-b p-6'>
							<p className='text-xs text-muted-foreground'>Positive</p>
							<h3 className='text-2xl font-semibold'>80%</h3>
							<div className='grid grid-cols-[1fr_24px] gap-3 place-items-center'>
								{/* @ts-ignore */}
								<Progress
									value={80}
									fill='bg-green-500'
								/>
								<span className='text-xs text-muted-foreground'>80%</span>
							</div>
						</div>

						<div className='space-y-1 border-r p-6'>
							<p className='text-xs text-muted-foreground'>Neutral</p>
							<h3 className='text-2xl font-semibold'>15%</h3>
							<div className='grid grid-cols-[1fr_24px] gap-3 place-items-center'>
								{/* @ts-ignore */}
								<Progress
									value={15}
									fill='bg-yellow-500'
								/>
								<span className='text-xs text-muted-foreground'>15%</span>
							</div>
						</div>

						<div className='space-y-1 p-6 '>
							<p className='text-xs text-muted-foreground'>Neutral</p>
							<h3 className='text-2xl font-semibold'>5%</h3>
							<div className='grid grid-cols-[1fr_24px] gap-3 place-items-center'>
								{/* @ts-ignore */}
								<Progress
									value={5}
									className='bg-neutral-100'
									fill='bg-red-500'
								/>
								<span className='text-xs text-muted-foreground'>5%</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
