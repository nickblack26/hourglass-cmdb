import { cn } from '@/lib/utils';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import React from 'react';

type MetricProps = {
	title: string;
	amount: string;
	timeline: string;
	percentage?: number;
};

const Metric = ({ title, amount, timeline, percentage }: MetricProps) => {
	return (
		<div className='p-4 border-r last:border-r-0 space-y-1'>
			<h2 className='text-sm text-muted-foreground font-medium'>{title}</h2>
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
