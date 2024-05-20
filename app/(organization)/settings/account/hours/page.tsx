import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Clock } from 'lucide-react';
import React from 'react';

type Day = {
	id: number;
	name: string;
	from: Date;
	to: Date;
	enabled: boolean;
};

type Props = {};

const Page = (props: Props) => {
	const days: Day[] = [
		{ id: 1, name: 'Sunday', from: new Date(), to: new Date(), enabled: false },
		{ id: 2, name: 'Monday', from: new Date(), to: new Date(), enabled: true },
		{ id: 3, name: 'Tuesday', from: new Date(), to: new Date(), enabled: true },
		{ id: 4, name: 'Wednesday', from: new Date(), to: new Date(), enabled: true },
		{ id: 5, name: 'Thursday', from: new Date(), to: new Date(), enabled: true },
		{ id: 6, name: 'Friday', from: new Date(), to: new Date(), enabled: true },
		{ id: 6, name: 'Saturday', from: new Date(), to: new Date(), enabled: false },
	];

	return (
		<main>
			<header>
				<h1>Hours</h1>
			</header>

			<section className='grid grid-cols-3 gap-3'>
				{days.map((day) => (
					<Card key={day.id}>
						<CardHeader className='flex flex-row items-center justify-start space-y-0 gap-1.5 p-4'>
							<Clock className='w-4 h-4' />
							<p className='text-muted-foreground text-sm'>Date and Time</p>

							<Label className='flex ml-auto items-center gap-1.5'>
								<span>Available</span>

								<Switch defaultChecked={day.enabled} />
							</Label>
						</CardHeader>

						<Separator />

						<CardContent className='p-4 space-y-1.5'>
							<div className='grid grid-cols-4 items-center gap-1.5'>
								<Label className='text-muted-foreground'>Day</Label>
								<Input disabled={!day.enabled} className='col-span-3' defaultValue={day.name} />
							</div>

							<div className='grid grid-cols-4 items-center gap-1.5'>
								<Label className='text-muted-foreground'>From</Label>
								<Input disabled={!day.enabled} className='col-span-3' type='datetime-local' defaultValue={day.from.toISOString()} />
							</div>

							<div className='grid grid-cols-4 items-center gap-1.5'>
								<Label className='text-muted-foreground'>To</Label>
								<Input disabled={!day.enabled} className='col-span-3' type='datetime-local' defaultValue={day.to.toISOString()} />
							</div>
						</CardContent>
					</Card>
				))}
			</section>

			<section className='space-y-3'>
				<h2>Lunch Time</h2>

				<p>
					I like to have a{' '}
					<span className='inline-block'>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder='Select a time...' />
							</SelectTrigger>
						</Select>
					</span>{' '}
					lunch at{' '}
					<span className='inline-block'>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder='Select a time...' />
							</SelectTrigger>
						</Select>
					</span>
				</p>

				<Separator />

				<Label className='flex items-center gap-1.5'>
					<Checkbox defaultChecked />
					Creates an event called &quot;Lunch&quot; in your calendar
				</Label>

				<Label className='flex items-center gap-1.5'>
					<Checkbox defaultChecked />
					Moves between 11:30 AM - 12:30 PM if there is a conflict
				</Label>
			</section>
		</main>
	);
};

export default Page;
