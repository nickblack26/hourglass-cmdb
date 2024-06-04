'use server';
import { ReactNode } from 'react';
import LabeledInput from '@/components/labled-input';
import { Input } from '../ui/input';
import { createDocument } from '@/lib/mongodb/create';
import { ObjectId } from 'mongodb';

type Props = {
	organization?: string;
	team?: string;
	children?: ReactNode;
};

const CompanyForm = ({ organization = '665884031e7e5912f6e28ad6', team, children }: Props) => {
	return (
		<form
			action={async (data: FormData) => {
				'use server';
				const name = data.get('name') as string;
				const identifier = data.get('identifier') as string;

				try {
					const doc = await createDocument<CompanyInsert>('companies', {
						name,
						identifier,
						organization: new ObjectId(organization),
						teams: [new ObjectId(team)],
					});

					console.log(doc);
				} catch (error) {
					console.error(error);
				}
			}}
			className='grid gap-3'
		>
			<LabeledInput
				name='name'
				label='Name'
				placeholder='Company Name'
			/>

			<LabeledInput
				name='identifier'
				label='Identifier'
				placeholder='ACME'
			/>

			{children}
		</form>
	);
};

export default CompanyForm;
