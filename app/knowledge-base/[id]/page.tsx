import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import React from 'react';
import BlockList from './block-list';
import { SearchParams } from '@/types/data';
import { getCachedPage } from '@/lib/supabase/read';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Page = async ({ params, searchParams }: { params: { id: string }; searchParams: SearchParams }) => {
	const errorText = typeof searchParams.error === 'string' ? String(searchParams.error) : undefined;
	const supabase = createClient();
	const page = await getCachedPage(params.id);

	if (!page) {
		notFound();
	}

	return (
		<main>
			<header className='flex-col justify-start items-start'>
				<h2>{page?.title}</h2>
				<div className='flex items-center gap-4 text-muted-foreground'>
					<Badge>Published</Badge> • Last edited 1 Day ago by
					<Avatar>
						<AvatarFallback className='text-xs'>NB</AvatarFallback>
					</Avatar>
					Nick Black
				</div>
			</header>
			<section className='max-w-3xl w-full mx-auto'>
				<article>
					<BlockList blocks={page.blocks} id={page.id} />
				</article>
			</section>
			{/* {errorText && <p>{errorText}</p>} */}
		</main>
	);
};

export default Page;
