import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import React from 'react';
import ProductsList from './products-list';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import LabeledInput from '@/components/labled-input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createProduct } from '@/lib/supabase/create';

const Page = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.from('products').select().is('parent', null);

	if (!data) return notFound();

	return (
		<main>
			<header className='grid grid-cols-3 w-full items-center'>
				<h1 className='text-xl font-semibold'>Configurations</h1>

				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Dialog>
						<DialogTrigger asChild>
							<Button size='sm' className='gap-1'>
								<PlusCircle className='h-3.5 w-3.5' />
								Create Product
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create Product</DialogTitle>
							</DialogHeader>
							<form action={createProduct} className='grid gap-3'>
								<LabeledInput name='name' label='Name' description='Give your variant a short and clear description.' placeholder='Variant Name' />

								<LabeledInput name='description' label='Description' placeholder='Variant Name' />

								<LabeledInput name='cost' label='Cost' placeholder='$123.45' />

								<LabeledInput name='price' label='Price' placeholder='$123.45' />

								<LabeledInput name='quantity' label='Quantity' placeholder='1' />

								<DialogFooter>
									<Button>Save</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</header>
			<ProductsList data={data} />
		</main>
	);
};

export default Page;
