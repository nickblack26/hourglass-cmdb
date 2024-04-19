'use client';

import * as React from 'react';
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { columns } from './customer-columns';

import { DataTableToolbar } from '@/components/data-table-toolbar';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { DataTable, FilterOption } from '@/components/data-table';

interface Props {
	data: Contact[];
	companies: Company[];
}

export default function ContactList({ data, companies }: Props) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className='space-y-3'>
			<DataTableToolbar table={table} searchKey='firstName'>
				{table.getColumn('dateEntered') && <DataTableFacetedFilter title='Date Created' column={table.getColumn('dateEntered')} options={[]} />}
				{table.getColumn('company') && (
					<DataTableFacetedFilter
						title='Organization'
						column={table.getColumn('company')}
						options={companies.map((company) => {
							return {
								label: company.name,
								value: company.id.toString(),
							} as FilterOption;
						})}
					/>
				)}
			</DataTableToolbar>
			<DataTable table={table} />
		</div>
	);
}
