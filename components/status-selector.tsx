import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getDocuments } from '@/lib/mongodb/read';

type Props = {
	defaultValue?: string;
};

const StatusSelector = async ({ defaultValue }: Props) => {
	const statuses = await getDocuments<Status>('statuses');

	if (!statuses) {
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
