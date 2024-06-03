'use server';
import React from 'react';
import { cn } from '@/lib/utils';
import { EllipsisVertical, GripVertical, Pencil, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import LabeledInput from './labled-input';
import { createClient } from '@/lib/supabase/server';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type MetricProps = {
	title: string;
	amount: string;
	timeline: string;
	percentage?: number;
	isDraggingEnabled?: boolean;
};

const operationOptions = [
	{ name: 'Add', value: 'add' },
	{ name: 'Subtract', value: 'subtract' },
	{ name: 'Multiply', value: 'multiply' },
	{ name: 'Divide', value: 'divide' },
	{ name: 'Average', value: 'average' },
];

const Metric = async ({ title, amount, timeline, percentage, isDraggingEnabled = false }: MetricProps) => {
	const supabase = await createClient;
	// const collections = await listCollections.db('public').listCollections().toArray();

	return (
		<div className='p-4 border-r last:border-r-0 space-y-1 group'>
			<div className='flex items-center justify-between gap-3'>
				<h2 className='text-sm text-muted-foreground font-medium'>{title}</h2>
				{isDraggingEnabled && (
					<Button
						variant={'ghost'}
						className='opacity-0 transition-opacity group-hover:opacity-100'
					>
						<GripVertical className=' h-3.5' />
					</Button>
				)}
				<Sheet>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisVertical className=' h-3.5' />
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<SheetTrigger asChild>
								<DropdownMenuItem>
									<Pencil className=' h-3.5 mr-1.5' />
									Edit
								</DropdownMenuItem>
							</SheetTrigger>
						</DropdownMenuContent>
					</DropdownMenu>

					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit Metric</SheetTitle>
						</SheetHeader>

						<form
							action=''
							className='space-y-3'
						>
							<LabeledInput
								name='name'
								label='Metric Name'
								placeholder='e.g. Expired Warranties'
								required
							/>

							<LabeledInput
								name='field'
								label='Field'
								required
							>
								<Select>
									<SelectTrigger>
										<SelectValue
											placeholder='Testing'
											className='capitalize'
										/>
									</SelectTrigger>

									<SelectContent>
										{collections?.map((collection) => (
											<SelectItem
												key={collection.name}
												value={collection.name}
												className='capitalize'
											>
												{collection.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</LabeledInput>

							<LabeledInput
								name='collection'
								label='Collection'
								required
							>
								<Select>
									<SelectTrigger>
										<SelectValue
											placeholder='Testing'
											className='capitalize'
										/>
									</SelectTrigger>

									<SelectContent>
										{collections?.map((collection) => (
											<SelectItem
												key={collection.name}
												value={collection.name}
												className='capitalize'
											>
												{collection.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</LabeledInput>

							<LabeledInput
								name='operation'
								label='Operation'
								required
							>
								<Select defaultValue={operationOptions[0].value}>
									<SelectTrigger>
										<SelectValue placeholder='Operation' />
									</SelectTrigger>

									<SelectContent>
										{operationOptions.map((option) => (
											<SelectItem
												key={option.value}
												value={option.value}
											>
												{option.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</LabeledInput>
						</form>
					</SheetContent>
				</Sheet>
			</div>
			<p className='text-xl font-semibold flex items-center gap-1'>
				{amount}
				{percentage && (
					<span
						className={cn(
							'rounded-lg text-xs px-1.5 py-0.5',
							percentage > 0 ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
						)}
					>
						{percentage}%
						{percentage > 0 ? (
							<TrendingUpIcon className='w-4 h-4 inline-block ml-0.5' />
						) : (
							<TrendingDownIcon className='w-4 h-4 inline-block ml-0.5' />
						)}
					</span>
				)}
			</p>
			<p className='text-muted-foreground font-medium text-xs'>{timeline}</p>
		</div>
	);
};

export default Metric;
