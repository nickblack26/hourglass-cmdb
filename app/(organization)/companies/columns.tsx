'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
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
		cell: ({ row }) => <span>{row.getValue('identifier')}</span>,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<Link
				href={`/companies/${row.original.id}`}
				className={cn(buttonVariants({ variant: 'link', size: 'default' }), 'p-0 text-blue-600')}
			>
				{row.getValue('name')}
			</Link>
		),
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
			<Button
				variant='ghost'
				size='sm'
			>
				<EllipsisIcon className='w-4 h-4' />
			</Button>
		),
	},
];
