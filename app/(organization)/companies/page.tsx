import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import React from 'react';
import CompanyTable from './company-table';

export default async function Page() {
	const supabase = createClient();
	const companiesQuery = supabase.from('companies').select().order('name');
	const viewsQuery = supabase.from('views').select().order('name');

	const [{ data: companies }, { data: views }] = await Promise.all([companiesQuery, viewsQuery]);

	return (
		<main>
			<header>
				<h1>Companies</h1>

				<Button>Add Company</Button>
			</header>

			<Separator />

			<section className='space-y-3'>
				<CompanyTable data={companies ?? []} />
			</section>
		</main>
	);
}
