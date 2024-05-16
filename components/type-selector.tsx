import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createClient } from '@/lib/supabase/server';

type Props = {
	defaultValue?: string;
};

const TypeSelector = async ({ defaultValue }: Props) => {
	const supabase = createClient();
	const { data: types, error } = await supabase.from('types').select('*').order('name').is('parent', null);

	if (!types) {
		console.error(error);
		return <div></div>;
	}

	return (
		<Select name='type' defaultValue={defaultValue}>
			<SelectTrigger aria-label='Select type'>
				<SelectValue placeholder='Select type' />
			</SelectTrigger>
			<SelectContent>
				{types?.map((type) => (
					<SelectItem key={type.id} value={type.id.toString()}>
						{type.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default TypeSelector;
