import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';

export default async function TicketList({ id }: { id: string }) {
	const db = await createClient();
	const data = await db
		.collection('tickets')
		.find({ configuration: new ObjectId('') })
		.toArray();
	return <TicketTable data={[]} />;
}
