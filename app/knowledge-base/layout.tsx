'use server';
import React from 'react';
import SideNav from './side-nav';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { EllipsisIcon } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { notFound, redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { createPage } from '@/lib/supabase/create';

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient();
	const { data: pages, error } = await supabase.from('pages').select('id, title, pages(id, title)').is('parent', null);

	if (!pages || error) {
		console.error(error);
		return notFound();
	}

	return (
		<main>
			<header className='grid grid-cols-3 w-full items-center h-14 border-b px-6'>
				<h1 className='text-xl font-semibold'>Knowledge Base</h1>
				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Button variant='ghost' size='sm'>
						<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button>Add Article</Button>
						</DialogTrigger>
						<DialogContent>
							<form action={createPage}>
								<DialogHeader>
									<DialogTitle>New Article</DialogTitle>
								</DialogHeader>

								<Input name='title' placeholder='Article Title' />

								<DialogFooter>
									<DialogClose>
										<Button>Create</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</header>

			<section className='grid grid-cols-[256px_1fr] p-0'>
				<div className='flex'>
					<SideNav pages={pages ?? []} />
					<Separator orientation='vertical' />
				</div>
				{children}
			</section>
		</main>
	);
};

export default Layout;
