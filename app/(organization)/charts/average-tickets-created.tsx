import BarChart from '@/components/bar-chart';
import React from 'react';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function AverageCreatedTickets({ className }: { className?: string }) {
	const db = await createClient();
	const data = await db.collection('tickets').countDocuments();

	return (
		<BarChart
			data={[]}
			className={className}
		/>
	);
}
