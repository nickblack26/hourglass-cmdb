import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import React from 'react';
import CompanyTable from './company-table';

export default async function Page() {
	const supabase = createClient();
	const { data } = await supabase.from('companies').select();

	return (
		<main>
			<header>
				<h1>Companies</h1>

				<Button>Add Company</Button>
			</header>

			<Separator />

			<section className='space-y-3'>
				<CompanyTable data={data ?? []} />
			</section>
		</main>
	);
}
