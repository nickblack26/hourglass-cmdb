import { WorkDay } from '@/app/settings/account/hours/data';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { format } from 'date-fns';

type Props = {
	day: WorkDay;
};

const TimeSelector = (props: Props) => {
	return (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder='Select time...' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='00:00'>{format(new Date(), 'MMM do')}</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default TimeSelector;
