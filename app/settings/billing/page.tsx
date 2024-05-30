'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { getCurrencyString } from '@/lib/money';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {};

const planOptions = [
	{
		id: uuid(),
		name: 'Paid Monthy',
		price: 8,
		stripeId: 'PK_123',
	},
	{
		id: uuid(),
		name: 'Paid Yearly',
		price: 96,
		stripeId: 'PK_456',
	},
];

const Page = (props: Props) => {
	const [seats, setSeats] = useState(1);
	const [modifySeats, setModifySeats] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(planOptions[0]);

	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button>Change Plan</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Change Plan</AlertDialogTitle>
						<AlertDialogDescription className='flex items-center gap-2'>
							<span className='font-semibold'>{getCurrencyString(34)}</span>

							<Separator orientation='vertical' className='' />

							<span>Unlimited Access</span>

							<Separator orientation='vertical' className='' />

							<span>Month</span>
						</AlertDialogDescription>
					</AlertDialogHeader>

					<form className='bg-secondary p-3 rounded-lg space-y-3 text-sm'>
						<Select defaultValue={selectedPlan.id} onValueChange={(e) => setSelectedPlan(planOptions.find((plan) => plan.id === e)!)}>
							<SelectTrigger className='bg-white'>
								<SelectValue placeholder='Select plan...' />
							</SelectTrigger>
							<SelectContent>
								{planOptions.map(({ id, name }) => (
									<SelectItem key={id} value={id}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Separator />

						<div>
							<div className='flex items-center justify-between gap-3'>
								<p className='font-semibold'>
									Unlimited Access <span className='font-normal text-muted-foreground'>x {getCurrencyString(selectedPlan.price)}</span>
								</p>

								<p className='font-semibold'>{getCurrencyString(selectedPlan.price * seats)}</p>
							</div>

							<div className='space-x-1.5'>
								1 User
								<Button variant='link' type='button' className='pl-1.5 pr-0 text-sm text-orange-500' onClick={() => setModifySeats(!modifySeats)}>
									Modify Seats
								</Button>
								<Separator orientation='vertical' className=' inline-block' />
								Month
							</div>
						</div>

						<Separator />

						<div>
							<div className='flex items-center justify-between gap-3 font-semibold'>
								<p>Updates</p>

								<p>Free</p>
							</div>

							<div className='space-x-1.5'>Frequent udpates for all current and new products.</div>
						</div>
					</form>

					<div className='flex justify-between gap-3'>
						<p className='font-semibold'>Due today</p>

						<div className='text-right'>
							<h3>{getCurrencyString(selectedPlan.price * seats)}</h3>
							<p className='text-xs text-muted-foreground'>+ applicable tax</p>
						</div>
					</div>

					<Separator />

					<AlertDialogFooter className='sm:justify-between'>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Subscribe</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default Page;
