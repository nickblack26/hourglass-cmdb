import { tickets } from '@/app/(organization)/tickets/data/data';
import { Modal } from '@/components/modal';
import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import React, { Suspense } from 'react';

const Loading = () => {
	const customerDetails = [
		{ label: 'Source', value: 'Contact us form' },
		{ label: 'Response Time', value: <Skeleton className='h-5 w-24' /> },
		{ label: 'Phone Numbers', value: <Skeleton className='h-5 w-24' /> },
		{
			label: 'Organization',
			value: <Skeleton className='h-5 w-24' />,
		},
		{
			label: 'Email',
			value: <Skeleton className='h-5 w-24' />,
		},
		{ label: 'Description', value: <Skeleton className='h-5 w-24' /> },
		{ label: 'Location', value: <Skeleton className='h-5 w-24' /> },
		{
			label: 'Assignee',
			value: <Skeleton className='h-5 w-24' />,
		},
		{ label: 'Languages Spoken', value: <Skeleton className='h-5 w-24' /> },
		{ label: 'First Contact', value: <Skeleton className='h-5 w-24' /> },
		{ label: 'Timezone', value: <Skeleton className='h-5 w-24' /> },
	];

	return (
		<Modal>
			<div className='grid grid-cols-2 justify-items-stretch h-full overflow-hidden'>
				<Card
					className='bg-background rounded-lg h-full overflow-hidden flex flex-col'
					style={{ gridColumn: '2 / -1' }}
				>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 p-3'>
						<div className='flex items-center gap-3'>
							<CardTitle className='text-xl'>Customer Preview</CardTitle>

							<Separator
								orientation='vertical'
								className='h-4'
							/>

							<Button
								variant='outline'
								className='rounded-full w-6 h-6 p-0'
							>
								<ChevronDownIcon className='w-4 h-4' />
							</Button>

							<Button
								variant='outline'
								className='rounded-full w-6 h-6 p-0'
							>
								<ChevronUpIcon className='w-4 h-4' />
							</Button>

							<span className='text-muted-foreground text-xs font-medium'>4 of 342</span>
						</div>

						<div className='flex items-center space-x-1.5'>
							<Button
								variant='outline'
								size='sm'
							>
								View Full Details
							</Button>

							<Button
								variant='ghost'
								size='sm'
							>
								<XIcon className='w-4 h-4' />
							</Button>
						</div>
					</CardHeader>

					<CardContent className='space-y-6 h-full flex flex-col flex-1 overflow-auto'>
						<section className='flex items-center space-x-3'>
							<Avatar className='h-16 w-16'>
								<AvatarFallback>NB</AvatarFallback>
								<AvatarImage src='https://uploads-ssl.webflow.com/61d87d426829a9bac65eeb9e/654d2b113b66e71152acc84c_Nick_Headshot_Fall2023.jpg' />
							</Avatar>

							<div className='space-y-1.5'>
								<div className='flex items-center space-x-3'>
									<Skeleton className='h-4 w-32' />
								</div>

								<p className='flex items-center'>
									<Image
										src='/microsoftLogo.png'
										alt='Microsoft logo'
										height={12}
										width={12}
										className='inline-block mr-1.5'
									/>
									<Skeleton className='h-4 w-12' />
								</p>
							</div>
						</section>

						<section className='flex items-center space-x-3 rounded-lg border p-1.5'>
							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>TICKETS</p>
								<Skeleton className='h-5 w-24' />
							</div>

							<Separator
								orientation='vertical'
								className='h-6'
							/>

							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>OVERDUE TICKETS</p>
								<Skeleton className='h-5 w-24' />
							</div>

							<Separator
								orientation='vertical'
								className='h-6'
							/>

							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>AVG. RESPONSE TIME</p>
								<Skeleton className='h-5 w-24' />
							</div>

							<Separator
								orientation='vertical'
								className='h-6'
							/>

							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>TOTAL RESPONSE TIME</p>
								<Skeleton className='h-5 w-24' />
							</div>
						</section>

						<section className='space-y-3'>
							<h3 className='font-medium text-muted-foreground'>Customer Details</h3>
							<div className='grid grid-cols-2 gap-6'>
								{customerDetails.map((detail, index) => (
									<div
										key={detail.label}
										className='space-y-3'
									>
										<div className='flex justify-between items-center gap-1.5'>
											<p className='text-muted-foreground text-sm text-nowrap'>{detail.label}</p>
											<div className='col-span-2 justify-self-end truncate text-sm'>{detail.value}</div>
										</div>
										{index + 1 !== customerDetails.length && <Separator />}
									</div>
								))}
							</div>
						</section>

						<Separator />

						<Suspense>
							<section className='space-y-3'>
								<div className='flex items-center justify-between'>
									<h3 className='font-medium text-muted-foreground'>Active Tickets</h3>
									<Button variant='link'>View more tickets</Button>
								</div>
								{/* {tickets
									?.filter((ticket) => ticket.dateResolved === null)
									.map((ticket) => (
										<div key={ticket.id} className='rounded-lg border grid grid-cols-4'>
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
												<Badge>
											{<ticket.type.icon className='w-3 h-3 mr-1.5' />}
											Question
										</Badge>
											</div>

											<div className='px-6 py-3 w-full border-r'>
												<h5 className='text-sm text-muted-foreground'>Ticket Type</h5>
												<Badge>
											{<ticket.type.icon className='w-3 h-3 mr-1.5' />}
											Question
												</Badge> 
											</div>

											<div className='px-6 py-3 w-full border-r'>
												<h5 className='text-sm text-muted-foreground'>Assigned to</h5>
											</div>

											<div className='px-6 py-3 w-full border-r'>
												<h5 className='text-sm text-muted-foreground'>Request Date</h5>
												<p className='text-sm font-medium'>
													{Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ticket.dateResplan))}
												</p>
											</div>
										</div>
									))} */}
							</section>
						</Suspense>

						<Separator />

						<section className='space-y-3'>
							<div className='flex items-center justify-between'>
								<h3 className='font-medium text-muted-foreground'>Activity</h3>
								<Button variant='link'>View more activity</Button>
							</div>
							{/* {actities.map(({ id, text, date }) => (
								<div key={id} className='flex items-center w-full gap-3'>
									<div className='flex flex-col items-center h-full'>
										<div className='p-2 bg-muted rounded-full'>
											<PlusCircleIcon className='w-3 h-3' />
										</div>
										<Separator orientation='vertical' className='flex-1' />
									</div>
									<div>
										<div>{text}</div>
										<div className='text-xs text-muted-foreground'>{date}</div>
									</div>
								</div>
							))} */}
						</section>
					</CardContent>
				</Card>
			</div>
		</Modal>
	);
};

export default Loading;
