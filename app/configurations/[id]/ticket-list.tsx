import { createClient } from '@/lib/supabase/server';
import * as React from 'react';
import TicketTable from '@/components/ticket-table';

export default async function TicketList({ id }: { id: string }) {
	const supabase = createClient();
	const { data, error } = await supabase.from('tickets').select().eq('configuration', id);
	return <TicketTable data={data ?? []} />;
}
