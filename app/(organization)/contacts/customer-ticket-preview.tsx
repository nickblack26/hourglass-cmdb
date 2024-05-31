import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';

export default async function CustomerTicketPreview({ id }: { id: number }) {
	const db = await createClient();
	const tickets = await db.collection('tickets').find().toArray();

	return (
		<div>
			{tickets &&
				tickets
					?.filter((ticket) => ticket.dateResolved === null)
					.map((ticket) => (
						<div
							key={ticket.id}
							className='rounded-lg border grid grid-cols-4'
						>
							<div className='px-6 py-3 flex items-center justify-between w-full col-span-4'>
								<h4 className='line-clamp-1'>
									<span className='font-semibold'>#TC-{ticket.id}</span>
									{ticket.summary}
								</h4>
								<div className='bg-blue-400 rounded-full px-1.5 py-0.5 text-white text-xs'>Open</div>
							</div>

							<Separator className='col-span-4' />

							<div className='px-6 py-3 w-full border-r'>
								<h5 className='text-sm text-muted-foreground'>Ticket Type</h5>
								{/* <Badge>
											{<ticket.type.icon className='w-3 h-3 mr-1.5' />}
											Question
										</Badge> */}
							</div>

							<div className='px-6 py-3 w-full border-r'>
								<h5 className='text-sm text-muted-foreground'>Ticket Type</h5>
								{/* <Badge>
											{<ticket.type.icon className='w-3 h-3 mr-1.5' />}
											Question
										</Badge> */}
							</div>

							<div className='px-6 py-3 w-full border-r'>
								<h5 className='text-sm text-muted-foreground'>Assigned to</h5>
							</div>

							<div className='px-6 py-3 w-full border-r'>
								<h5 className='text-sm text-muted-foreground'>Request Date</h5>
								<p className='text-sm font-medium'>
									{/* {Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ticket.dateResplan ?? ''))} */}
								</p>
							</div>
						</div>
					))}
		</div>
	);
}
