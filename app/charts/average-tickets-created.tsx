import BarChart from '@/components/bar-chart';
import React from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function AverageCreatedTickets({ className }: { className?: string }) {
	const supabase = createClient();
	const { data, error } = await supabase.from('average_tickets_created').select().order('dateEntered').limit(12);

	if (!data || error) {
		return <div></div>;
	}

	return (
		<BarChart
			data={
				data?.map((d) => {
					return {
						name: Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date(d.dateEntered)),
						value: d.ticket_count,
					};
				}) ?? []
			}
			className={className}
		/>
	);
}
