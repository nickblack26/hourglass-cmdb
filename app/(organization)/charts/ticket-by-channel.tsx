import PieChart from '@/components/pie-chart';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';

const data = [
	{ name: '0-1 Hours', value: 81 },
	{ name: '1-8 Hours', value: 9 },
	{ name: '8-24 Hours', value: 4 },
	{ name: '>24 Hours', value: 4 },
	{ name: 'No replies', value: 2 },
];

const COLORS = ['#4AA0FF', '#7B4DDB', '#649E5B', '#F6C360', '#B4B7BB'];

export async function TicketByChannel({ className }: { className?: string }) {
	const db = await createClient();
	const data = await db.collection('tickets').countDocuments();

	return <PieChart data={[]} />;
}
