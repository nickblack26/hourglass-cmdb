'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createClient } from '@/lib/mongodb';

type Props = {
	onValueChange?: (...event: any[]) => void;
	defaultValue?: string;
	className?: string;
};

const AssetSelector = ({ onValueChange, defaultValue, className }: Props) => {
	const db = await createClient();
	const [items, setItems] = useState<Asset[] | null>([]);

	useEffect(() => {
		supabase
			.collection('assets')
			.select()
			.order('name')
			.then(({ data }) => setItems(data));
	}, [supabase]);

	if (items === null) {
		return <div></div>;
	}

	return (
		<Select
			name='asset'
			onValueChange={onValueChange}
			defaultValue={defaultValue}
		>
			<SelectTrigger
				aria-label='Select an asset'
				className={className}
			>
				<SelectValue placeholder='Select a asset...' />
			</SelectTrigger>
			<SelectContent>
				{items?.map((item) => (
					<SelectItem
						key={item.id}
						value={item?.id}
					>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default AssetSelector;
