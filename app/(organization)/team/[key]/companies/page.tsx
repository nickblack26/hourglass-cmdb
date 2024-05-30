import CompanyTable from '@/app/(organization)/companies/company-table';
import { Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import { QueryData } from '@supabase/supabase-js';
import { ListFilter } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
	params: { key: string };
};

const Page = async ({ params }: Props) => {
	const supabase = createClient();
	const { key } = params;
	const teamWithCompanieQuery = supabase.from('teams').select('companies(*)').eq('identifier', key).single();
	type TeamWithCompanies = QueryData<typeof teamWithCompanieQuery>;
	const { data } = await teamWithCompanieQuery;

	if (!data) return notFound();

	const teamWithCompanies: TeamWithCompanies = data;
	const { companies } = teamWithCompanies;

	return (
		<div>
			<header>
				<h1 className='text-sm'>Companies</h1>
			</header>

			<Separator />

			<section>
				<Combobox
					items={[]}
					placeholder='Filter...'
				>
					<Button variant='ghost'>
						<ListFilter className='mr-1.5' />
						<span>Filter</span>
					</Button>
				</Combobox>
			</section>

			<Separator />

			<section className='space-y-3'>
				<CompanyTable data={companies || []} />
			</section>
		</div>
	);
};

export default Page;
