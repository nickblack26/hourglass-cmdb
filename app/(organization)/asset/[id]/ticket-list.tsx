import { ObjectId } from 'mongodb';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';
import { getDocuments } from '@/lib/mongodb/read';

export default async function TicketList({ id }: { id: string }) {
	const data = await getDocuments<Ticket>('tickets', { configuration: new ObjectId(id) });

	return <TicketTable data={data ?? []} />;
}
