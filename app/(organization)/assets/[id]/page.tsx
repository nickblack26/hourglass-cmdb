import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';
import ConfigurationsList from '../configurations-list';
import AssetLayout from '../asset-layout';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const db = await createClient();
	const { data } = await supabase
		.collection('assets')
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
