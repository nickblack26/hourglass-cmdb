import { createClient } from '@/lib/supabase/server';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';

export default async function TicketList() {
	const supabase = createClient();
	const { data } = await supabase.from('tickets').select();

	return <TicketTable data={data ?? []} />;
}
