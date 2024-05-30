'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createClient } from '@/lib/supabase/client';

type Props = {
	onValueChange?: (...event: any[]) => void;
	defaultValue?: string;
};

const CompanySelector = ({ onValueChange, defaultValue }: Props) => {
	const [companies, setCompanies] = useState<
		| {
				id: string;
				name: string | null;
		  }[]
		| null
	>([]);
	const supabase = createClient();

	useEffect(() => {
		supabase
			.from('companies')
			.select('id, name')
			.order('name')
			.then(({ data }) => setCompanies(data));
	}, [supabase]);

	if (companies === null) {
		return <div></div>;
	}

	return (
		<Select
			name='company'
			onValueChange={onValueChange}
			defaultValue={defaultValue}
		>
			<SelectTrigger aria-label='Select company'>
				<SelectValue placeholder='Select company...' />
			</SelectTrigger>
			<SelectContent>
				{companies.map((company) => (
					<SelectItem
						key={company.id}
						value={company.id}
					>
						{company.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default CompanySelector;
