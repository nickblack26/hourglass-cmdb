'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { icons } from '@/lib/data';
import { deleteDocument } from '@/lib/mongodb/delete';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Asset>[] = [
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
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const type: { icon?: string } = row.original.type as { icon?: string };
			const icon = icons.find((icon) => icon.value === type?.icon);

			return (
				<Link
					href={`/asset/${row.original._id.toString()}`}
					className={cn(buttonVariants({ variant: 'link', size: 'default' }), 'text-blue-600')}
				>
					{icon && <icon.icon className='mr-1.5' />}
					{row.getValue('name')}
				</Link>
			);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as Status;

			return (
				<div>
					<Badge variant='green'>{status?.name}</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'company',
		header: 'Company',
		cell: ({ row }) => {
			const company = row.getValue('company') as Company;
			const contact = row.getValue('contact') as Contact;
			// @ts-ignore
			return <span>{company && company.name ? company.name : contact?.company?.name ?? ''}</span>;
		},
	},
	{
		accessorKey: 'contact',
		header: 'User',
		cell: ({ row }) => {
			const contact: Contact | undefined = row.getValue('contact') as Contact;

			return (
				<div className='grid grid-cols-[24px_1fr] gap-1.5 items-center'>
					<Avatar className='h-6 w-6'>
						<AvatarFallback className='uppercase h-6 w-6 text-xs'>{`${contact?.firstName ? contact?.firstName[0] : ''}${
							contact?.lastName ? contact?.lastName[0] : ''
						}`}</AvatarFallback>
					</Avatar>
					<span className='font-medium'>
						{contact?.firstName} {contact?.lastName}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: ({ row }) => (
			<Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost'>
							<EllipsisIcon className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DialogTrigger asChild>
							<DropdownMenuItem className='text-red-500 focus:bg-red-50 focus:text-red-500'>
								<Trash2 className=' w-3.5 mr-1.5' />
								Delete
							</DropdownMenuItem>
						</DialogTrigger>
					</DropdownMenuContent>
				</DropdownMenu>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
					</DialogHeader>

					<form action={async () => await deleteDocument('companies', { _id: row.original._id })}></form>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Close</Button>
						</DialogClose>
						<Button>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		),
	},
];
