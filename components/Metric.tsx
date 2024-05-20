'use client';
import { cn } from '@/lib/utils';
import { EllipsisVertical, GripVertical, Pencil, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
// import invariant from ''

type MetricProps = {
	title: string;
	amount: string;
	timeline: string;
	percentage?: number;
	isDraggingEnabled?: boolean;
};

const Metric = ({ title, amount, timeline, percentage, isDraggingEnabled = false }: MetricProps) => {
	const [isEditable, setIsEditable] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dragRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (!isDraggingEnabled || !ref.current || !dragRef.current) return;

		return draggable({
			element: ref.current,
			dragHandle: dragRef.current,
		});
	}, [isDraggingEnabled]);

	return (
		<div className='p-4 border-r last:border-r-0 space-y-1 group' ref={ref}>
			<div className='flex items-center justify-between gap-3'>
				{isEditable ? (
					<Input defaultValue={title} className='text-sm h-auto py-1.5' />
				) : (
					<h2 className='text-sm text-muted-foreground font-medium'>{title}</h2>
				)}
				{isDraggingEnabled && (
					<Button variant={'ghost'} className='opacity-0 transition-opacity group-hover:opacity-100' ref={dragRef}>
						<GripVertical className='w-3.5 h-3.5' />
					</Button>
				)}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<EllipsisVertical className='w-3.5 h-3.5' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setIsEditable(!isEditable)}>
							<Pencil className='w-3.5 h-3.5 mr-1.5' />
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<p className='text-xl font-semibold flex items-center gap-1'>
				{amount}
				{percentage && (
					<span className={cn('rounded-lg text-xs px-1.5 py-0.5', percentage > 0 ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500')}>
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
