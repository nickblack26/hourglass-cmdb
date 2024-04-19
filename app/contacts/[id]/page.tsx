import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/server';
import {
	ActivityIcon,
	ArrowLeftIcon,
	BellIcon,
	Building2Icon,
	EllipsisIcon,
	FileTextIcon,
	GlobeIcon,
	LanguagesIcon,
	MailIcon,
	MapPinIcon,
	MessageSquareTextIcon,
	PaperclipIcon,
	PhoneIcon,
	PlusIcon,
	SquareArrowDownIcon,
	TextIcon,
	TicketIcon,
	TimerIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import ConfigurationsList from '@/app/configurations/configurations-list';
import { notFound } from 'next/navigation';
import TicketTable from '@/components/ticket-table';

const Page = async ({ params }: { params: { id: string } }) => {
	const supabase = createClient();

	const { data: contact } = await supabase
		.from('contacts')
		.select('id, firstName, lastName, title, defaultPhoneNbr, user_id, company(id, name)')
		.eq('id', params.id)
		.single();

	if (!contact) return notFound();

	const { data: tickets, error: ticketError } = await supabase
		.from('tickets')
		.select('*, contact(id, firstName, lastName)')
		.eq('contact', contact.user_id)
		.limit(25);

	const { data: configurations, error: configurationError } = await supabase
		.from('configurations')
		.select('id, name, status(id, name), type(icon), company(id, name), user(id, firstName, lastName)')
		.eq('user', contact?.user_id);
	console.log(configurations);

	const customerDetails = [
		{ label: 'Source', value: 'Contact us form', icon: SquareArrowDownIcon },
		{ label: 'Phone Numbers', value: <StatusBadge color='blue' text='(209) 555-01014' />, icon: PhoneIcon },
		{
			label: 'Email',
			value: [
				<StatusBadge key='nick-personal-email' color='blue' text='nicholas.black98@icloud.com' />,
				<StatusBadge key='nick-work-email' color='blue' text='nblack@velomethod.com' />,
			],
			icon: MailIcon,
		},
		{ label: 'Location', value: 'Dallas, Texas', icon: MapPinIcon },
		{ label: 'Languages Spoken', value: 'English', icon: LanguagesIcon },
		{ label: 'Timezone', value: 'UTC+07:00', icon: GlobeIcon },
		{ label: 'Response Time', value: <StatusBadge color='red' text='Slow response' />, icon: TimerIcon },
		{
			label: 'Organization',
			value: (
				<p className='flex items-center'>
					<Image src='/microsoftLogo.png' alt='Microsoft logo' height={12} width={12} className='inline-block mr-1.5 rounded-sm' />
					{contact?.company.name}
				</p>
			),
			icon: Building2Icon,
		},
		{ label: 'Description', value: '', icon: TextIcon },
		{ label: 'First Contact', value: 'March 17, 2023', icon: PhoneIcon },
	];

	const actions = [
		{ icon: PhoneIcon, name: 'Call' },
		{ icon: MailIcon, name: 'Activity' },
		{ icon: BellIcon, name: 'Notify' },
		{ icon: MessageSquareTextIcon, name: 'Chat' },
	];
	const links = [
		{ icon: TicketIcon, name: 'Tickets', href: `/contacts/${params.id}/` },
		{ icon: ActivityIcon, name: 'Activity', href: `/contacts/${params.id}/activity` },
		{ icon: PaperclipIcon, name: 'Attachments', href: `/contacts/${params.id}/attachments` },
		{ icon: FileTextIcon, name: 'Notes', href: `/contacts/${params.id}/notes` },
	];

	return (
		<TooltipProvider>
			<main>
				<header className='flex w-full justify-between items-center pt-3 container'>
					<Button variant='ghost' asChild>
						<Link href='/contacts'>
							<ArrowLeftIcon className='w-4 h-4' />
						</Link>
					</Button>

					<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
						<Button variant='ghost'>
							<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
						</Button>

						<Button>Add New Ticket</Button>
					</div>
				</header>

				<section className='flex items-center space-x-3 container'>
					<Avatar className='h-16 w-16'>
						<AvatarFallback>NB</AvatarFallback>
						<AvatarImage src='https://uploads-ssl.webflow.com/61d87d426829a9bac65eeb9e/654d2b113b66e71152acc84c_Nick_Headshot_Fall2023.jpg' />
					</Avatar>

					<div className='space-y-1.5'>
						<div className='flex items-center space-x-3'>
							<h2 className='text-2xl font-semibold'>
								{contact?.firstName} {contact?.lastName}
							</h2>
							<StatusBadge color='green' text='Fikri Studio' />
							<StatusBadge color='gray' text='Fikri Studio - 5 days ago' />
						</div>

						<p className='flex items-center'>
							<Image src='/microsoftLogo.png' alt='Microsoft logo' height={12} width={12} className='inline-block mr-1.5' /> {contact?.company.name}
						</p>
					</div>
				</section>

				<section>
					<div className='grid grid-cols-[256px_1fr] gap-12 container'>
						<div className='flex gap-3'>
							{actions.map((action) => (
								<Tooltip key={action.name} delayDuration={0}>
									<TooltipTrigger asChild>
										<Button variant='outline' className='p-1.5 h-[26px] w-[26px] relative top-1/2'>
											<action.icon className='w-3 h-3' />
										</Button>
									</TooltipTrigger>
									<TooltipContent align='center'>{action.name}</TooltipContent>
								</Tooltip>
							))}
						</div>

						<div className='flex gap-3 '>
							{links.map((link) => (
								<Button key={link.name} variant='link' asChild>
									<Link href={link.href}>
										<link.icon className='w-3 h-3 mr-1.5' /> {link.name}
									</Link>
								</Button>
							))}
						</div>
					</div>
					<Separator />
				</section>

				<section className='grid grid-cols-[256px_1fr] gap-12 container'>
					<aside className='space-y-3 pt-6'>
						{customerDetails.map((detail) => (
							<div key={detail.label} className='space-y-1.5'>
								<div className='flex items-center text-muted-foreground'>
									<detail.icon className='w-3 h-3 mr-1.5' /> {detail.label}
									<Button variant='ghost' className='ml-auto'>
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

							<Separator orientation='vertical' className='h-6' />

							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>OVERDUE TICKETS</p>
								<h3 className='font-semibold text-lg'>4</h3>
							</div>

							<Separator orientation='vertical' className='h-6' />

							<div className='space-y-1.5 w-full'>
								<p className='text-xs text-muted-foreground tracking-tight'>AVG. RESPONSE TIME</p>
								<h3 className='font-semibold text-lg'>25:00 </h3>
							</div>

							<Separator orientation='vertical' className='h-6' />

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
			</main>
		</TooltipProvider>
	);
};

export default Page;
