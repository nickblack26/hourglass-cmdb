import LabeledInput from '@/components/labled-input';
import { createAsset } from '@/lib/supabase/create';
import ContactSelector from '../selector/contact-selector';
import { ReactNode, Suspense } from 'react';
import TypeSelector from '../selector/type-selector';
import CompanySelector from '../selector/company-selector';
import SelectorFallback from '../selector/selector-fallback';

type Props = {
	contact?: string;
	assetType?: string;
	children?: ReactNode;
};

const AssetForm = ({ contact, assetType, children }: Props) => {
	return (
		<form
			action={createAsset}
			className='grid gap-3'
		>
			<LabeledInput
				name='name'
				label='Name'
				placeholder='Configuration Name'
			/>

			<Suspense fallback={<SelectorFallback placeholder='Select a company...' />}>
				<LabeledInput
					name='company'
					label='Company'
				>
					<CompanySelector defaultValue={contact} />
				</LabeledInput>
			</Suspense>

			<Suspense fallback={<SelectorFallback placeholder='Select a contact...' />}>
				<LabeledInput
					name='contact'
					label='User'
				>
					<ContactSelector defaultValue={contact} />
				</LabeledInput>
			</Suspense>

			<Suspense fallback={<SelectorFallback placeholder='Select a type...' />}>
				<LabeledInput
					name='type'
					label='Asset Type'
				>
					<TypeSelector defaultValue={assetType} />
				</LabeledInput>
			</Suspense>

			{children}
		</form>
	);
};

export default AssetForm;
