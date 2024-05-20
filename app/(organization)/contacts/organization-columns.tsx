'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon, StarIcon } from 'lucide-react';
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
		header: 'identifier',
		cell: ({ row }) => <span>{row.getValue('identifier')}</span>,
	},
	{
		header: 'Name',
		cell: ({ row }) => (
			<Link href={`/organizations/${row.original.id}`} className='grid grid-cols-[24px_1fr] gap-1.5 items-center hover:underline'>
				<Avatar className='h-6 w-6'>
					<AvatarFallback className='uppercase h-6 w-6 text-xs'>{`VI`}</AvatarFallback>
				</Avatar>
				<span className='font-medium'>Velo IT Group</span>
			</Link>
		),
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => (
			<div className='flex items-center gap-3'>
				<Button variant='ghost' size='sm'>
					<StarIcon className='w-4 h-4' />
				</Button>
				<Button variant='ghost' size='sm'>
					<EllipsisIcon className='w-4 h-4' />
				</Button>
			</div>
		),
	},
];
