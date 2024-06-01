import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { v4 as uuid } from 'uuid';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircleIcon } from 'lucide-react';
import CustomerTicketPreview from './customer-ticket-preview';
import { getDocument } from '@/lib/mongodb/read';
import { ObjectId } from 'mongodb';

export default async function CustomerPreviewSheet({ id }: { id: string }) {
	const contact = await getDocument<Contact>('users', { _id: new ObjectId(id) });

	const customerDetails = [
		{ label: 'Source', value: 'Contact us form' },
		{
			label: 'Response Time',
			value: (
				<StatusBadge
					color='red'
					text='Slow response'
				/>
			),
		},
		{
			label: 'Phone Numbers',
			value: (
				<StatusBadge
					color='blue'
					text='(209) 555-01014'
				/>
			),
		},
		{
			label: 'Organization',
			value: (
				<p className='flex items-center'>
					<Image
						src='/microsoftLogo.png'
						alt='Microsoft logo'
						height={12}
						width={12}
						className='inline-block mr-1.5 rounded-sm'
					/>{' '}
					{/* {contact?.company} */}
				</p>
			),
		},
		{
			label: 'Email',
			value: [
				// <StatusBadge key='nick-personal-email' color='blue' text='nicholas.black98@icloud.com' />,
				<StatusBadge
					key='nick-work-email'
					color='blue'
					text='nblack@velomethod.com'
				/>,
			],
		},
		{ label: 'Description', value: '' },
		{ label: 'Location', value: 'Dallas, Texas' },
		{
			label: 'Assignee',
			value: (
				<div className='grid grid-cols-[24px_1fr] gap-1.5 items-center hover:underline'>
					<Avatar className='h-6 w-6'>
						<AvatarFallback className='uppercase h-6 w-6 text-xs'>NB</AvatarFallback>
					</Avatar>
					<span className='font-medium'>Nick Black</span>
				</div>
			),
		},
		{ label: 'Languages Spoken', value: 'English' },
		{ label: 'First Contact', value: 'March 17, 2023' },
		{ label: 'Timezone', value: 'UTC+07:00' },
	];

	const actities = [
		{
			id: uuid(),
			text: (
				<p className='text-sm text-muted-foreground'>
					<span className='font-semibold'>Nick Black</span> was added to <span className='font-semibold'>contacts</span>
				</p>
			),
			date: '11:12 AM - May 17, 2023',
		},
		{
			id: uuid(),
			text: (
				<p className='text-sm text-muted-foreground'>
					<span className='font-semibold'>Nick Black</span> was created by{' '}
					<span className='font-semibold'>Fikri Studio</span>
				</p>
			),
			date: '11:12 AM - May 17, 2023',
		},
	];

	return (
		<SheetContent className='sm:max-w-screen-lg w-full'>
			<SheetHeader>
				<SheetTitle>Hello</SheetTitle>
			</SheetHeader>
			<section className='flex items-center space-x-3'>
				<Avatar className='h-16 w-16'>
					<AvatarFallback>NB</AvatarFallback>
					<AvatarImage src='https://uploads-ssl.webflow.com/61d87d426829a9bac65eeb9e/654d2b113b66e71152acc84c_Nick_Headshot_Fall2023.jpg' />
				</Avatar>

				<div className='space-y-1.5'>
					<div className='flex items-center space-x-3'>
						<h2 className='text-2xl font-semibold'>
							{contact?.firstName} {contact?.lastName}
						</h2>
						<StatusBadge
							color='green'
							text='Fikri Studio'
						/>
						<StatusBadge
							color='gray'
							text='Fikri Studio - 5 days ago'
						/>
					</div>

					<p className='flex items-center'>
						<Image
							src='/microsoftLogo.png'
							alt='Microsoft logo'
							height={12}
							width={12}
							className='inline-block mr-1.5'
						/>
						{/* {contact?.company.name} */}
					</p>
				</div>
			</section>

			<section className='flex items-center space-x-3 rounded-lg border p-1.5'>
				<div className='space-y-1.5 w-full'>
					<p className='text-xs text-muted-foreground tracking-tight'>TICKETS</p>
					<h3 className='font-semibold text-lg'>{tickets?.length}</h3>
				</div>

				<Separator
					orientation='vertical'
					className='h-6'
				/>

				<div className='space-y-1.5 w-full'>
					<p className='text-xs text-muted-foreground tracking-tight'>OVERDUE TICKETS</p>
					<h3 className='font-semibold text-lg'>4</h3>
				</div>

				<Separator
					orientation='vertical'
					className='h-6'
				/>

				<div className='space-y-1.5 w-full'>
					<p className='text-xs text-muted-foreground tracking-tight'>AVG. RESPONSE TIME</p>
					<h3 className='font-semibold text-lg'>25:00 </h3>
				</div>

				<Separator
					orientation='vertical'
					className='h-6'
				/>

				<div className='space-y-1.5 w-full'>
					<p className='text-xs text-muted-foreground tracking-tight'>TOTAL RESPONSE TIME</p>
					<h3 className='font-semibold text-lg'>1:32:08</h3>
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

			<section className='space-y-3'>
				<div className='flex items-center justify-between'>
					<h3 className='font-medium text-muted-foreground'>Active Tickets</h3>

					<Button variant='link'>
						<Link href={`/contacts/${id}/`}>View more tickets</Link>
					</Button>
				</div>

				<Suspense fallback={<p>loading</p>}>
					<CustomerTicketPreview id={id} />
				</Suspense>
			</section>

			<Separator />

			<section className='space-y-3'>
				<div className='flex items-center justify-between'>
					<h3 className='font-medium text-muted-foreground'>Activity</h3>
					<Button
						variant='link'
						asChild
					>
						<Link href={`/contacts/${id}/activity`}>View more activity</Link>
					</Button>
				</div>
				{actities.map(({ id, text, date }) => (
					<div
						key={id}
						className='flex items-center w-full gap-3'
					>
						<div className='flex flex-col items-center h-full'>
							<div className='p-2 bg-muted rounded-full'>
								<PlusCircleIcon className='w-3 h-3' />
							</div>
							<Separator
								orientation='vertical'
								className='flex-1'
							/>
						</div>
						<div>
							<div>{text}</div>
							<div className='text-xs text-muted-foreground'>{date}</div>
						</div>
					</div>
				))}
			</section>
		</SheetContent>
	);
}
