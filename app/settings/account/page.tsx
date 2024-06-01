import { auth } from '@/auth';
import LabeledInput from '@/components/labled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';

type Props = {};

const Page = async ({}: Props) => {
	const session = await auth();
	console.log(session?.user?.id);

	return (
		<div>
			<section className='px-0'>
				<h3>Profile</h3>
				<span className='text-sm text-muted-foreground'>Manage your profile</span>
			</section>

			<Separator />

			<section className='space-y-6 px-0'>
				<h4>Logo</h4>

				<div className='space-y-3'>
					<div className='w-16 rounded-sm overflow-hidden border relative'>
						<Input
							type='file'
							className='opacity-0 absolute w-full h-full z-50'
						/>
						<div className='w-16 h-16 grid place-items-center text-2xl bg-blue-400 text-white'>
							<div>NB</div>
						</div>
					</div>

					<p className='text-sm text-muted-foreground'>Pick a photo for your profile. Recommended size is 256x256px.</p>
				</div>
			</section>

			<Separator />

			<section className='px-0 space-y-6'>
				<h4>General</h4>

				<LabeledInput
					placeholder='john@acme.net'
					type='email'
					name='email'
					label='Email'
				/>

				<LabeledInput
					placeholder='John Smith'
					name='name'
					label='Full name'
				/>

				<LabeledInput
					placeholder='john'
					name='username'
					label='Username'
				/>

				<Button size='sm'>Update</Button>
			</section>
		</div>
	);
};

export default Page;
