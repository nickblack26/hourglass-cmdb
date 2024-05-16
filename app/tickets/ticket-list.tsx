import { createClient } from '@/lib/supabase/server';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';
import { notFound } from 'next/navigation';

export default async function TicketList() {
	const supabase = createClient();
	const { data, error } = await supabase.from('tickets').select();

	if (error) {
		console.error(error);
		return notFound();
	}

	return <TicketTable data={data ?? []} />;
}
