'use client';

import StatusBadge from '@/components/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon, MessageCircleQuestionIcon } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Ticket>[] = [
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
		accessorKey: 'number',
		header: () => <div className='w-16'>Ticket #</div>,
		cell: ({ row }) => <div className='w-16'>{row.getValue('number')}</div>,
	},
	{
		accessorKey: 'summary',
		header: () => <div className='w-[500px]'>Summary</div>,
		cell: ({ row }) => (
			<Button variant='link' size='default' asChild className='w-[500px] p-0 h-auto'>
				<Link href={`/tickets/${row.original.id}`} className='line-clamp-1'>
					{row.getValue('summary')}
				</Link>
			</Button>
		),
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
