import { ComboBoxItem, Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { BarChartBig, Grid2X2, Inbox, ListFilter, PencilRuler, SlidersHorizontal } from 'lucide-react';
import { ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import InboxIcon from '@/components/inbox-icon';

type InboxItem = {
	id: string;
	title: string;
	type: string;
	description: string | ReactNode;
	date?: Date;
};

const Page = () => {
	const filters: ComboBoxItem[] = [
		{
			label: (
				<div className='text-sm'>
					<PencilRuler className='w-3.5 h-3.5 mr-1.5 inline-block' />
					Notification type
				</div>
			),
			value: 'notification',
		},
		{
			label: (
				<div className='text-sm'>
					<Grid2X2 className='w-3.5 h-3.5 mr-1.5 inline-block' />
					Project
				</div>
			),
			value: 'project',
		},
		{
			label: (
				<div className='text-sm'>
					<BarChartBig className='w-3.5 h-3.5 mr-1.5 inline-block' />
					Priority
				</div>
			),
			value: 'priority',
		},
	];

	const items: InboxItem[] = [{ id: uuid(), title: 'Onboarding', type: '', description: '' }];

	return (
		<div className='grid grid-cols-[400px_1fr] min-h-screen'>
			<div className='border-r'>
				<header className='border-b flex items-center justify-between'>
					<h1 className='text-sm'>Inbox</h1>

					<div>
						<Combobox items={filters} placeholder='Filter...'>
							<Button variant='ghost' size='sm'>
								<ListFilter className='w-3.5 h-3.5' />
							</Button>
						</Combobox>

						<Button variant='ghost' size='sm'>
							<SlidersHorizontal className='w-3.5 h-3.5' />
						</Button>
					</div>
				</header>

				{items.map((item) => (
					<section key={item.id}>
						<div className='flex items-center justify-between gap-3'>
							<p>{item.title}</p>
							<p>{item.type}</p>
						</div>
						<div className='flex items-center justify-between gap-3'>
							<p>{item.description}</p>
							<p>{item?.date?.toDateString()}</p>
						</div>
					</section>
				))}
			</div>

			<div className='grid place-items-center'>
				<div className='grid place-items-center text-center space-y-1.5 text-muted-foreground'>
					<InboxIcon className='w-28 h-28 stroke-1 text-muted-foreground' />
					<p className='text-sm'>Inbox</p>
					<p className='text-sm'>No unread notifications</p>
				</div>
			</div>
		</div>
	);
};

export default Page;
