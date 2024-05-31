import PieChart from '@/components/pie-chart';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';

export interface ChartData {
	name: string;
	value: number;
}

export async function TicketByFirstReply({ className }: { className?: string }) {
	const db = await createClient();
	const data = await db.collection('tickets').countDocuments();

	return (
		<PieChart
			className={className}
			data={[]}
		/>
	);
}
