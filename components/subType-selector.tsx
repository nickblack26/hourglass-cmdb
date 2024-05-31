import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type Props = {
	defaultValue?: string;
};

const SubTypeSelector = async ({ defaultValue }: Props) => {
	const db = await createClient();
	const { data: types, error } = await db.collection('asset_types').select('*').order('name');

	if (!types) {
		console.error(error);
		return <div></div>;
	}

	return (
		<Select
			name='type'
			defaultValue={defaultValue}
		>
			<SelectTrigger aria-label='Select type'>
				<SelectValue placeholder='Select type' />
			</SelectTrigger>
			<SelectContent>
				{types?.map((type) => (
					<SelectItem
						key={type.id}
						value={type.id.toString()}
					>
						{type.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SubTypeSelector;
