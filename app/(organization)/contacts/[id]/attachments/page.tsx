import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { SquarePlus } from 'lucide-react';
import React from 'react';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const db = await createClient();

	const { data: files, error } = await supabase.storage.collection('Hourglass').list(`Contacts/${params.id}`, {
		limit: 100,
		offset: 0,
		sortBy: { column: 'name', order: 'asc' },
	});

	// supabase.storage.collection('hourlgass').upload('/', {});

	console.log(files);

	return (
		<section>
			<Button
				variant='ghost'
				className='h-auto w-auto space-x-1.5 relative'
			>
				<Input
					type='file'
					className='absolute z-10 opacity-0'
				/>

				<SquarePlus className='stroke-blue-500 w-12 h-12 stroke-1' />

				<div className='grid justify-items-start'>
					<p className='text-lg'>Add a new file</p>
					<p className='text-muted-foreground'>10 Mb. max.</p>
				</div>
			</Button>

			{files?.map((file) => (
				<div key={file.id}>{file.name}</div>
			))}
		</section>
	);
};

export default Page;
