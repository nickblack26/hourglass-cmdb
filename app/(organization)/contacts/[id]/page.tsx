import StatusBadge from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import {
	Building2Icon,
	GlobeIcon,
	LanguagesIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	PlusIcon,
	SquareArrowDownIcon,
	TextIcon,
	TimerIcon,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import ConfigurationsList from '@/app/(organization)/assets/configurations-list';
import { notFound } from 'next/navigation';
import TicketTable from '@/components/ticket-table';

const Page = async ({ params }: { params: { id: string } }) => {
	const db = await createClient();

	const { data: contact } = await supabase
		.collection('users')
		.select('id, firstName, lastName, title, company(id, name)')
		.eq('id', params.id)
		.single();

	if (!contact) return notFound();

	const { data: tickets, error: ticketError } = await supabase
		.collection('tickets')
		.select('*, contact(id, firstName, lastName)')
		.eq('contact', contact.id)
		.limit(25);

	const { data: configurations, error: configurationError } = await supabase
		.collection('configurations')
		.select('id, name, status(id, name), type(icon), company(id, name), user(id, firstName, lastName)')
		.eq('user', contact?.id);
	console.log(configurations);

	const customerDetails = [
		{ label: 'Source', value: 'Contact us form', icon: SquareArrowDownIcon },
		{
			label: 'Phone Numbers',
			value: (
				<StatusBadge
					color='blue'
					text='(209) 555-01014'
				/>
			),
			icon: PhoneIcon,
		},
		{
			label: 'Email',
			value: [
				<StatusBadge
					key='nick-personal-email'
					color='blue'
					text='nicholas.black98@icloud.com'
				/>,
				<StatusBadge
					key='nick-work-email'
					color='blue'
					text='nblack@velomethod.com'
				/>,
			],
			icon: MailIcon,
		},
		{ label: 'Location', value: 'Dallas, Texas', icon: MapPinIcon },
		{ label: 'Languages Spoken', value: 'English', icon: LanguagesIcon },
		{ label: 'Timezone', value: 'UTC+07:00', icon: GlobeIcon },
		{
			label: 'Response Time',
			value: (
				<StatusBadge
					color='red'
					text='Slow response'
				/>
			),
			icon: TimerIcon,
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
					/>
					{contact?.company.name}
				</p>
			),
			icon: Building2Icon,
		},
		{ label: 'Description', value: '', icon: TextIcon },
		{ label: 'First Contact', value: 'March 17, 2023', icon: PhoneIcon },
	];

	return (
		<section className='grid grid-cols-[256px_1fr] gap-12 container'>
			<aside className='space-y-3 pt-6'>
				{customerDetails.map((detail) => (
					<div
						key={detail.label}
						className='space-y-1.5'
					>
						<div className='flex items-center text-muted-foreground'>
							<detail.icon className='w-3 h-3 mr-1.5' /> {detail.label}
							<Button
								variant='ghost'
								className='ml-auto'
							>
								<PlusIcon className='w-3 h-3' />
							</Button>
						</div>
						{detail.value}
					</div>
				))}
			</aside>

			<div className='space-y-6'>
				<div className='flex items-center border rounded-lg p-3 gap-3'>
					<div className='space-y-1.5 w-full'>
						<p className='text-xs text-muted-foreground tracking-tight'>TICKETS</p>
						<h3 className='font-semibold text-lg'>15</h3>
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
				</div>

				<div className='space-y-3'>
					<h2>Tickets</h2>
					<TicketTable data={tickets || []} />
				</div>

				<div className='space-y-3'>
					<h2>Configurations</h2>
					<ConfigurationsList data={configurations || []} />
				</div>
			</div>
		</section>
	);
};

export default Page;
