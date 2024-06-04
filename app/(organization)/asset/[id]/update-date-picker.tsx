'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { updateConfiguration } from '@/lib/supabase/update';

export default function UpdateDatePicker({ id, date, dataKey }: { id: string; date?: string | null; dataKey: keyof Configuration }) {
	const handleUpdate = async (date: Date) => {
		console.log(dataKey, date);
		await updateConfiguration(id, { [dataKey]: date.toISOString() });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='ml-auto'>
					{date ? <PencilIcon className='w-3 h-3' /> : <PlusIcon className='w-3 h-3' />}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>{date ? 'Edit Install Date' : 'Add Install Date'}</DialogHeader>
				<form id='install_date_form' name='install_date_form'>
					<DatePicker defaultDate={date ? new Date(date) : undefined} onDateChange={handleUpdate} />
				</form>
				<DialogFooter>
					<Button form='install_date_form'>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
