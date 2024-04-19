'use client';

import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Product>[] = [
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
		accessorKey: 'product_id',
		header: 'Product ID',
		cell: ({ row }) => {
			const product_id = row.getValue('product_id') as Status;

			return <span>{product_id}</span>;
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<Button variant='link' size='default' asChild>
				<Link href={`/products/${row.original.id}`} className='line-clamp-1'>
					{row.getValue('name')}
				</Link>
			</Button>
		),
	},
	{
		accessorKey: 'cost',
		header: 'Cost',
		cell: ({ row }) => {
			const cost = row.getValue('cost') as number;

			return <span className='text-right'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cost)}</span>;
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => {
			const price = row.getValue('price') as number;

			return <span className='text-right'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</span>;
		},
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
