import { ObjectId } from 'mongodb';
import ConfigurationsList from './configurations-list';
import AssetLayout from './asset-layout';
import { getDocuments } from '@/lib/mongodb/read';

const Page = async () => {
	const assets = await getDocuments<Asset>(
		'assets',
		{ organization: new ObjectId('665888e02684136c5e529eb4') },
		{ name: 1 }
	);

	console.log(assets);

	return (
		<AssetLayout>
			<section className='space-y-3'>
				<ConfigurationsList data={assets ?? []} />
			</section>
		</AssetLayout>
	);
};

export default Page;
