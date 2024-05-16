'use client';

import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Contact>[] = [
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
		accessorKey: 'firstName',
		header: 'Name',
		cell: ({ row }) => (
			<Link href={`/contacts/${row.original.id}`} className='grid grid-cols-[24px_1fr] gap-1.5 items-center hover:underline'>
				<Avatar className='h-6 w-6'>
					<AvatarFallback className='uppercase h-6 w-6 text-xs'>{`${row.original?.firstName[0]}${row.original?.lastName[0]}`}</AvatarFallback>
				</Avatar>
				<span className='font-medium'>
					{row.original.firstName} {row.original.lastName}
				</span>
			</Link>
		),
	},
	{
		accessorKey: 'title',
		header: 'Email',
		cell: ({ row }) => (
			<div>
				<StatusBadge color='blue' text={row.getValue('title')} />
			</div>
		),
	},
	{
		accessorKey: 'defaultPhoneNbr',
		header: 'Phone number',
		cell: ({ row }) => (
			<div>
				<StatusBadge color='blue' text={row.getValue('defaultPhoneNbr')} />
			</div>
		),
	},
	// {
	// 	accessorKey: 'company',
	// 	header: 'Company',
	// 	cell: ({ row }) => {
	// 		const company: Company = row.getValue('company');
	// 		return <div>{company.name}</div>;
	// 	},
	// },
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
