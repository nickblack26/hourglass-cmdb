import { ObjectId } from 'mongodb';
import React from 'react';
import ConfigurationsList from '../configurations-list';
import AssetLayout from '../asset-layout';
import { getDocuments } from '@/lib/mongodb/read';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const data = await getDocuments<Asset>('assets', { type: new ObjectId(params.id) });

	return (
		<AssetLayout params={params}>
			<section className='space-y-3'>
				<ConfigurationsList data={data ?? []} />
			</section>
		</AssetLayout>
	);
};

export default Page;
