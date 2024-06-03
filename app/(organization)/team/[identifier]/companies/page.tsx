import CompanyTable from '@/app/(organization)/companies/company-table';
import { Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ListFilter, Plus } from 'lucide-react';
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
// import SubmitButton from '@/components/submit-button';
// import CompanyForm from '@/components/forms/company-form';
import { createClient } from '@/lib/supabase/server';

type Props = {
	params: { identifier: string };
};

const Page = async ({ params }: Props) => {
	const supabase = createClient();
	const { identifier } = params;

	const {
		data: { companies },
	} = await supabase.from('teams').select('companies(*)').eq('identifier', identifier);

	return (
		<div>
			<header>
				<h1 className='text-sm'>Companies</h1>

				<Dialog>
					<DialogTrigger>
						<Badge variant='outline'>
							<Plus className='mr-1.5' />
							New Company
						</Badge>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Asset</DialogTitle>
						</DialogHeader>

						{/* <CompanyForm team={params.key}>
							<DialogFooter>
								<SubmitButton>Create</SubmitButton>
							</DialogFooter>
						</CompanyForm> */}
					</DialogContent>
				</Dialog>
			</header>

			{/* <Separator /> */}

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
