import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/server';
import { Separator } from '@/components/ui/separator';
import LabeledInput from '@/components/labled-input';

export default async function Page() {
	const supabase = createClient();

	const { data: organization, error } = await supabase
		.from('organizations')
		.select('company(*)')
		.eq('id', 'e1d916e9-4eed-45e1-bb81-f53aa0e437c5')
		.returns<Array<{ id: string } & { company: Company }>>()
		.single();

	if (!organization?.company) return <div>{JSON.stringify(error)}</div>;

	return (
		<div className='grid gap-6'>
			<section className='space-y-1.5 px-0'>
				<h1>Workspace</h1>
				<p className='text-sm text-muted-foreground'>Manage your workspace settings. Your workspace is in the United States region</p>
			</section>

			<Separator />

			<section className='space-y-6 px-0'>
				<h4>Logo</h4>

				<div className='space-y-3'>
					<div className='w-16 rounded-sm overflow-hidden border relative'>
						<Input type='file' className='opacity-0 absolute w-full h-full z-50' />
						<div className='w-16 h-16 grid place-items-center text-2xl bg-blue-400 text-white'>
							<div>HA</div>
						</div>
					</div>

					<p className='text-sm text-muted-foreground'>Pick a logo for your workspace. Recommended size is 256x256px.</p>
				</div>
			</section>

			<Separator />

			<section className='px-0 space-y-6'>
				<h4>General</h4>

				<LabeledInput placeholder='Acme Inc' name='name' label='Workspace name' />

				<LabeledInput placeholder='Acme Inc' name='name' label='Workspace name' />

				<Button size='sm'>Update</Button>
			</section>

			<Separator />

			<section className='px-0 space-y-6'>
				<h4>Delete workspace</h4>

				<p className='text-sm text-muted-foreground'>
					If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do
					so below.
				</p>

				<Button size='sm' variant='destructive'>
					Delete this workspace
				</Button>
			</section>
		</div>
	);
}
