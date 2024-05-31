import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';
import { notFound } from 'next/navigation';

export default async function TicketList() {
	const db = await createClient();
	const data = await db.collection<Ticket>('tickets').find().toArray();

	return <TicketTable data={data ?? []} />;
}
