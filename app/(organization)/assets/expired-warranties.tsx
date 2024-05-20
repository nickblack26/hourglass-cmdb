import Metric from '@/components/Metric';
import { createClient } from '@/lib/supabase/server';
import { addDays } from 'date-fns';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface ConfigurationData {
	total_expired: number;
	avg_response_time: number;
}

export default async function ExpiredWarranties() {
	const supabase = createClient();
	const dateRange: DateRange = {
		from: new Date(),
		to: addDays(new Date(), 30),
	};
	const { data, error } = await supabase
		.from('configurations')
		.select('total_expired:count()')
		.gte('expiration_date', dateRange.from?.toISOString())
		.lte('expiration_date', dateRange.to?.toISOString())
		.returns<ConfigurationData[]>()
		.single();

	console.log(data, error);

	if (!data || error) {
		return <div></div>;
	}

	return <Metric isDraggingEnabled title='Expired Warranties' amount={data.total_expired.toString()} timeline='In the next month' />;
}
