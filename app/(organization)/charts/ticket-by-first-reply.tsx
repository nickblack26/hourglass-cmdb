import PieChart from '@/components/pie-chart';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

export interface ChartData {
	name: string;
	value: number;
}

export async function TicketByFirstReply({ className }: { className?: string }) {
	const supabase = createClient();
	const { data, error } = await supabase.from('ticket_by_first_reply_time').select().order('response_time_group');

	if (!data || error) {
		return <div></div>;
	}

	return (
		<PieChart
			className={className}
			data={
				data.map((d) => {
					return { name: d.response_time_group, value: d.ticket_count } as ChartData;
				}) ?? []
			}
		/>
	);
}
