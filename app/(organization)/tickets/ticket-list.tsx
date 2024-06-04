import * as React from 'react';
import TicketTable from '@/components/ticket-table';
import { getDocuments } from '@/lib/mongodb/read';

export default async function TicketList() {
	const data = await getDocuments<Ticket>('tickets');

	return <TicketTable data={data ?? []} />;
}
