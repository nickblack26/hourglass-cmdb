import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import LabeledInput from './labled-input';
import { AlertCircleIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

type Props = {};

const DeleteAccount = (props: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger>Delete Account</AlertDialogTrigger>
			<AlertDialogContent>
				<div className='grid gap-3' style={{ gridTemplateColumns: '54px 1fr' }}>
					<div className='rounded-full grid place-items-center p-1.5 bg-red-50'>
						<AlertCircleIcon className='w-5 h-5 fill-red-500 stroke-white' />
					</div>

					<AlertDialogHeader>
						<AlertDialogTitle>Delete Account</AlertDialogTitle>
						<AlertDialogDescription>Confirm the deletion of your account.</AlertDialogDescription>
					</AlertDialogHeader>
				</div>

				<form action='' className='space-y-3 text-sm'>
					<Separator />

					<div className='space-y-1.5 text-muted-foreground'>
						<p className='font-medium'>Delete user account nblack@velomethod.com?</p>

						<div className='p-1.5 bg-red-50 grid grid-cols-[24px_1fr] items-center rounded-md '>
							<AlertCircleIcon className='w-3.5 h-3.5 fill-red-500 stroke-white' />
							<p className='text-primary'>This action can not be undone, proceed with caution.</p>
						</div>

						<p>
							This action is irreversible and will permantently delete your account. All of your data, including your profile, posts and personal
							information will be <span className='font-medium'>permanantely removed.</span>
						</p>

						<p>By enetering your password, you confirm that you understand and accept the consequences of deleting your account.</p>
					</div>

					<Separator />

					<LabeledInput
						label='Enter Password'
						name='password'
						placeholder='••••••••••'
						required
						description='Provide your password to proceed with account deletion.'
					/>

					<Separator />
				</form>

				<AlertDialogFooter>
					<AlertDialogCancel className='grow'>Cancel</AlertDialogCancel>

					<AlertDialogAction asChild className='bg-destructive text-destructive-foreground hover:bg-destructive/90 grow'>
						<Button variant='destructive'>Delete Account</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAccount;
