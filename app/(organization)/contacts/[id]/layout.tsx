import { ReactNode } from 'react';
import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
	ActivityIcon,
	ArrowLeftIcon,
	BellIcon,
	EllipsisIcon,
	FileTextIcon,
	MailIcon,
	MessageSquareTextIcon,
	PaperclipIcon,
	PhoneIcon,
	TicketIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';

type Props = {
	children: ReactNode;
	params: { id: string };
};

const Layout = async ({ children, params }: Props) => {
	const db = await createClient();

	const { data: contact } = await supabase
		.collection('users')
		.select('id, firstName, lastName, title, company(id, name)')
		.eq('id', params.id)
		.single();

	if (!contact) return notFound();

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
			<main className='relative'>
				<header className='flex w-full justify-between items-center pt-3 container sticky top-0 bg-background/80 z-10 backdrop-blur-lg'>
					<Button
						variant='ghost'
						asChild
					>
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
							/>{' '}
							{contact?.company.name}
						</p>
					</div>
				</section>

				<section>
					<div className='grid grid-cols-[256px_1fr] gap-12 container'>
						<div className='flex gap-3'>
							{actions.map((action) => (
								<Tooltip
									key={action.name}
									delayDuration={0}
								>
									<TooltipTrigger asChild>
										<Button
											variant='outline'
											className='p-1.5 h-[26px] w-[26px] relative top-1/2'
										>
											<action.icon className='w-3 h-3' />
										</Button>
									</TooltipTrigger>
									<TooltipContent align='center'>{action.name}</TooltipContent>
								</Tooltip>
							))}
						</div>

						<div className='flex gap-3 '>
							{links.map((link) => (
								<Button
									key={link.name}
									variant='link'
									asChild
								>
									<Link href={link.href}>
										<link.icon className='w-3 h-3 mr-1.5' /> {link.name}
									</Link>
								</Button>
							))}
						</div>
					</div>
					<Separator />
				</section>
				{children}
			</main>
		</TooltipProvider>
	);
};

export default Layout;
