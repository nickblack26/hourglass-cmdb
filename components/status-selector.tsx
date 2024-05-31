import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type Props = {
	defaultValue?: string;
};

const StatusSelector = async ({ defaultValue }: Props) => {
	const db = await createClient();
	const { data: statuses, error } = await db.collection('statuses').select('*').order('name');

	if (!statuses) {
		console.error(error);
		return <div></div>;
	}

	return (
		<Select
			name='status'
			aria-label='Select status'
			defaultValue={defaultValue}
		>
			<SelectTrigger>
				<SelectValue placeholder='Select status' />
			</SelectTrigger>
			<SelectContent>
				{statuses?.map((status) => (
					<SelectItem
						key={status.id}
						value={status.id.toString()}
					>
						{status.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default StatusSelector;
