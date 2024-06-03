import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import CompanyTable from './company-table';
import { getDocuments } from '@/lib/mongodb/read';

export default async function Page() {
	const [companies, views] = await Promise.all([getDocuments<Company>('companies'), getDocuments('views')]);

	return (
		<main>
			<header>
				<h1>Companies</h1>

				<Button>Add Company</Button>
			</header>

			{/* <Separator /> */}

			<section className='space-y-3'>
				<CompanyTable data={companies ?? []} />
			</section>
		</main>
	);
}
