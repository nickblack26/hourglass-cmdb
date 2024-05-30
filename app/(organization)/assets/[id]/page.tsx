import { createClient } from '@/lib/supabase/server';
import React from 'react';
import ConfigurationsList from '../configurations-list';
import AssetLayout from '../asset-layout';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const supabase = createClient();
	const { data } = await supabase
		.from('assets')
		.select('*, company(name), contact(firstName, lastName)')
		.order('name')
		.eq('type', params.id);

	return (
		<AssetLayout params={params}>
			<section className='space-y-3'>
				<ConfigurationsList data={data ?? []} />
			</section>
		</AssetLayout>
	);
};

export default Page;
