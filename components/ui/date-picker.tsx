'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DatePickerProps = {};

export function DatePicker({
	defaultDate,
	onDateChange,
	className,
}: {
	defaultDate?: Date;
	onDateChange?: (date: Date) => void;
	className?: string;
}) {
	const [date, setDate] = React.useState<Date | undefined>(defaultDate);

	React.useEffect(() => {
		if (onDateChange && date) {
			onDateChange(date);
		}
	}, [date, onDateChange]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'outline'} className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground', className)}>
					<CalendarIcon className='mr-1.5 h-4 w-4' />
					{date ? format(date, 'MMM do') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
			</PopoverContent>
		</Popover>
	);
}
