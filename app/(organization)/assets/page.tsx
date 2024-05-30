import { createClient } from '@/lib/supabase/server';
import ConfigurationsList from './configurations-list';
import AssetLayout from './asset-layout';

const Page = async () => {
	const supabase = createClient();

	const { data: assets } = await supabase
		.from('assets')
		.select('*, type(name, icon), company(name), contact(firstName, lastName)')
		.order('name');

	return (
		<AssetLayout>
			<section className='space-y-3'>
				<ConfigurationsList data={assets ?? []} />
			</section>
		</AssetLayout>
	);
};

export default Page;
