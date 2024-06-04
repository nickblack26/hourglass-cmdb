import { Separator } from '@/components/ui/separator';
import React from 'react';
import { LinkIcon, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LabeledInput from '@/components/labled-input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ObjectId } from 'mongodb';
import { getDocument, getDocuments } from '@/lib/mongodb/read';
import { notFound } from 'next/navigation';
import SettingsSection from '@/app/settings/settings-section';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const team = await getDocument<Team>('teams', { _id: new ObjectId(params.id) });
	const users = await getDocuments<Contact>(
		'users',
		{ teams: [new ObjectId(params.id)] },
		{ firstName: 1, lastName: 1 }
	);

	if (!users) return notFound();

	return (
		<div className='space-y-6'>
			<SettingsSection
				title='Members'
				description={`Manage who is a member of the ${team?.name} team`}
			/>

			<Separator />

			<SettingsSection title='Manage members'>
				<div className='flex items-center justify-between gap-1.5'>
					<div className='flex items-center gap-1.5'>
						<Input
							placeholder='Filter by name...'
							className='max-w-72 h-8 w-full'
						/>
					</div>

					<div className='flex items-center gap-1.5'>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Invite people</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>Invite to your workspace</DialogTitle>
								</DialogHeader>
								<form
									action=''
									name='inviteUsers'
									id='inviteUsers'
								>
									<LabeledInput
										name='users'
										label='Email'
									>
										<Textarea
											placeholder='email@example.com, email2@example.com...'
											name='users'
											minRows={3}
										/>
									</LabeledInput>
								</form>

								<DialogFooter className='sm:justify-between'>
									<Button variant='link'>
										<LinkIcon className=' h-3.5 mr-1.5' />
										Invite with link
									</Button>
									<div className='flex items-center gap-1.5'>
										<DialogClose asChild>
											<Button
												type='button'
												variant='secondary'
											>
												Cancel
											</Button>
										</DialogClose>

										<Button
											type='submit'
											form='inviteUsers'
										>
											Save
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<p>{users?.length} active member(s)</p>

				<div className='space-y-3'>
					{users?.map((member) => (
						<div
							key={member._id.toString()}
							className='grid grid-cols-[40px_224px_1fr_1fr] items-center gap-3 text-sm'
						>
							<Avatar className='w-10 h-10'>
								<AvatarFallback>NB</AvatarFallback>
							</Avatar>

							<div>
								<p className='line-clamp-1'>
									{member.firstName} {member.lastName}
								</p>
								<p className='text-muted-foreground line-clamp-1'>{member.email}</p>
							</div>

							<div className='justify-self-center'>Admin</div>

							<DropdownMenu>
								<DropdownMenuTrigger className='justify-self-end'>
									<MoreHorizontal className=' h-3.5' />
								</DropdownMenuTrigger>
							</DropdownMenu>
						</div>
					))}
				</div>
			</SettingsSection>
		</div>
	);
};

export default Page;
