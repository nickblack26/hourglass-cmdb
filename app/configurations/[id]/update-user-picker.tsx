'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { updateConfiguration } from '@/lib/supabase/update';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
	id: string;
	user?: string | null;
	dataKey: keyof Configuration;
	contacts: Contact[];
}

export default function UpdateUserPicker({ id, user, dataKey, contacts }: Props) {
	const handleUpdate = async (user: string) => {
		console.log(dataKey, user);
		await updateConfiguration(id, { [dataKey]: user });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='ml-auto'>
					{user ? <PencilIcon className='w-3 h-3' /> : <PlusIcon className='w-3 h-3' />}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>{user ? 'Edit Install Date' : 'Add Install Date'}</DialogHeader>
				<Select onValueChange={(e) => handleUpdate(e)} defaultValue={user ?? undefined}>
					<SelectTrigger>
						<SelectValue placeholder='Select a contact' />
					</SelectTrigger>

					<SelectContent>
						{contacts.map(({ firstName, lastName, id }) => (
							<SelectItem key={id} value={id.toString()}>
								{firstName} {lastName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<DialogFooter>
					<DialogClose asChild>
						<Button>Save</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
