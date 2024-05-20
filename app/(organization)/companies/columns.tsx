'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Company>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				className='ml-3'
				// @ts-ignore
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				// @ts-ignore
				className='ml-3'
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'identifier',
		header: 'ID',
		cell: ({ row }) => (
			<Button variant='link' size='default' className='p-0' asChild>
				<Link href={`/companies/${row.original.id}`}>{row.getValue('identifier')}</Link>
			</Button>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <span>{row.getValue('name')}</span>,
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Phone Number',
		cell: ({ row }) => <span>{row.getValue('phoneNumber')}</span>,
	},
	{
		accessorKey: 'addressLine1',
		header: 'Address Line 1',
		cell: ({ row }) => <span>{row.getValue('addressLine1')}</span>,
	},
	{
		accessorKey: 'addressLine2',
		header: 'Address Line 2',
		cell: ({ row }) => <span>{row.getValue('addressLine2')}</span>,
	},
	{
		accessorKey: 'city',
		header: 'City',
		cell: ({ row }) => <span>{row.getValue('city')}</span>,
	},
	{
		accessorKey: 'state',
		header: 'State',
		cell: ({ row }) => <span>{row.getValue('state')}</span>,
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => (
			<Button variant='ghost' size='sm'>
				<EllipsisIcon className='w-4 h-4' />
			</Button>
		),
	},
];
