import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/server';
import { Separator } from '@/components/ui/separator';
import LabeledInput from '@/components/labled-input';
import SettingsSection from './settings-section';
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
} from '@/components/ui/alert-dialog';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Workspace',
};

export default async function Page() {
	const supabase = createClient();

	const { data: organization } = await supabase.from('organizations').select('id, name, urlKey').single();

	return (
		<div className='grid gap-6'>
			<SettingsSection title='Workspace' description='Manage your workspace settings. Your workspace is in the United States region' />

			<Separator />

			<SettingsSection title='Logo'>
				<div className='space-y-3'>
					<div className='w-16 rounded-sm overflow-hidden border relative group'>
						<Input type='file' className='opacity-0 absolute w-full h-full z-50' />
						<div className='w-16 h-16 grid place-items-center text-2xl bg-blue-400 text-white'>
							<div>HA</div>
						</div>
						<div className='absolute z-10  bg-black/25 opacity-0 group-hover:opacity-100 h-full w-full top-0 right-0 left-0 bottom-0 grid place-items-center transition-all group-hover:cursor-pointer'>
							Upload
						</div>
					</div>

					<p className='text-sm text-muted-foreground'>Pick a logo for your workspace. Recommended size is 256x256px.</p>
				</div>
			</SettingsSection>

			<Separator />

			<SettingsSection title='General'>
				<LabeledInput placeholder='Acme Inc' name='name' label='Workspace name' defaultValue={organization?.name ?? undefined} />

				<LabeledInput placeholder='acme-inc' name='urlKey' label='Workspace url' defaultValue={organization?.urlKey ?? undefined} />

				<Button size='sm'>Update</Button>
			</SettingsSection>

			<Separator />

			<SettingsSection
				title='Delete workspace'
				description='If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do
					so below.'
			>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button size='sm' variant='destructive'>
							Delete this workspace
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and
								comments, you can do so below?
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Confirm</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SettingsSection>
		</div>
	);
}
