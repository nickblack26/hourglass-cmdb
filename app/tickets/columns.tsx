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
		accessorKey: 'id',
		header: 'Ticket ID',
		cell: ({ row }) => <div>#TC-{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'summary',
		header: 'Summary',
		cell: ({ row }) => (
			<Button variant='link' size='default' asChild className='max-w-sm p-0 h-auto'>
				<Link href={`/tickets/${row.original.id}`} className='line-clamp-1'>
					{row.getValue('summary')}
				</Link>
			</Button>
		),
	},
	{
		accessorKey: 'priority',
		header: 'Priority',
		cell: ({ row }) => {
			return (
				<div>
					<StatusBadge color='yellow' text='Priority 2 - Normal Priority' />
				</div>
			);
		},
	},
	{
		accessorKey: 'recordType',
		header: 'Type',
		cell: ({ row }) => (
			<Badge variant='secondary'>
				<MessageCircleQuestionIcon className='w-3 h-3 mr-1.5' /> {row.getValue('recordType')}
			</Badge>
		),
	},
	{
		accessorKey: 'contact',
		header: 'Contact',
		cell: ({ row }) => {
			const contact = row.getValue('contact') as Contact;

			return (
				<div className='grid grid-cols-[24px_1fr] gap-1.5 items-center'>
					<Avatar className='h-6 w-6'>
						<AvatarFallback className='uppercase h-6 w-6 text-xs'>
							{contact ? `${contact?.firstName[0]}${contact?.lastName[0]}` : 'VG'}
						</AvatarFallback>
					</Avatar>
					<span className='font-medium'>
						{contact?.firstName} {contact?.lastName}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'dateResponded',
		header: 'Request Date',
		cell: ({ row }) => <div>{Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date(row.getValue('dateResponded') as string))}</div>,
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
