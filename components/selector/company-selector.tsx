'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getDocuments } from '@/lib/mongodb/read';

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

	useEffect(() => {
		const getData = async () => {
			const companies = await getDocuments<Company>('companies');
			setCompanies(companies);
		};
		getData();
	}, []);

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
