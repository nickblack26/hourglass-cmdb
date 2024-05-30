import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';
import SettingsSection from '../settings-section';
import { ArrowRight, LinkIcon, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LabeledInput from '@/components/labled-input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/server';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Props = {};

const Page = async (props: Props) => {
	const supabase = createClient();
	const { data: users } = await supabase.from('users').select('id, firstName, lastName, email');

	const action = async (formData: FormData) => {
		'use server';
		const userEntry = formData.get('users') as string;
		const emails = userEntry.split(',');
		await Promise.all(emails.map((email) => supabase.auth.signUp({ email: email.trim(), password: '' })));
	};

	return (
		<div className='space-y-6'>
			<SettingsSection title='Members' header description='Manage who has access to this workspace' />

			<Separator />

			<SettingsSection
				title='Manage members'
				description={
					<span>
						On the Free plan all members in a workspace are administrators. Upgrade to the Standard plan to add the ability to assign or remove
						administrator roles.{' '}
						<Link href='/settings/plans' className='text-accent-foreground hover:underline'>
							Go to Plans <ArrowRight className=' h-3.5 inline-block' />
						</Link>
					</span>
				}
			>
				<div className='flex items-center justify-between gap-1.5'>
					<div className='flex items-center gap-1.5'>
						<Input placeholder='Filter by name...' className='max-w-72 h-8 w-full' />
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
								<form action={action} name='inviteUsers' id='inviteUsers'>
									<LabeledInput name='users' label='Email'>
										<Textarea placeholder='email@example.com, email2@example.com...' name='users' minRows={3} />
									</LabeledInput>
								</form>

								<DialogFooter className='sm:justify-between'>
									<Button variant='link'>
										<LinkIcon className=' h-3.5 mr-1.5' />
										Invite with link
									</Button>
									<div className='flex items-center gap-1.5'>
										<DialogClose asChild>
											<Button type='button' variant='secondary'>
												Cancel
											</Button>
										</DialogClose>

										<Button type='submit' form='inviteUsers'>
											Save
										</Button>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<p>{users?.length} active member</p>

				<div className='space-y-3'>
					{users?.map((member) => (
						<div key={member.id} className='grid grid-cols-[40px_224px_1fr_1fr] items-center gap-3 text-sm'>
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

			<Separator />

			<SettingsSection title='Export members list' description='Export a CSV with information of all the members in your workspace.'>
				<Button>Export CSV</Button>
			</SettingsSection>
		</div>
	);
};

export default Page;
