import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getDocuments } from '@/lib/mongodb/read';

type Props = {
	defaultValue?: string;
};

const TypeSelector = async ({ defaultValue }: Props) => {
	const types = await getDocuments<AssetType>('assetTypes');

	if (!types) {
		return <div></div>;
	}

	console.log(defaultValue);

	return (
		<Select
			name='type'
			defaultValue={defaultValue}
		>
			<SelectTrigger aria-label='Select type'>
				<SelectValue placeholder='Select type' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{types?.map((type) => (
						<SelectItem
							key={type.id}
							value={type.id}
						>
							{type.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default TypeSelector;
