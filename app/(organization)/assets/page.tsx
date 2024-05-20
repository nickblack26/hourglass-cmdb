import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EllipsisIcon, FocusIcon, PlusCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ConfigurationsList from './configurations-list';
import Metric from '@/components/Metric';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpiredWarranties from './expired-warranties';
import { createConfiguration } from '@/lib/supabase/create';
import LabeledInput from '@/components/labled-input';

const Page = async () => {
	const supabase = createClient();
	const getAssets = supabase.from('assets').select('*, type(name, icon), company(name), contact(firstName, lastName)');

	const getProducts = await supabase.from('products').select();

	const [{ data: assets, error }, { data: products, error: productError }] = await Promise.all([getAssets, getProducts]);

	console.log(assets);

	// console.log(configurations);

	if (error || !assets) {
		console.log(error);
		notFound();
	}

	return (
		<main>
			<header className='grid grid-cols-3 w-full items-center'>
				<h1 className='text-xl font-semibold'>Assets</h1>

				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Button variant='ghost'>
						<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
					</Button>

					<Button variant='outline'>
						<FocusIcon className='h-4 w-4 mr-1.5' />
						Focus Mode
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button size='sm' className='gap-1'>
								<PlusCircle className='h-3.5 w-3.5' />
								Create Asset
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create Asset</DialogTitle>
							</DialogHeader>
							<form action={createConfiguration} className='grid gap-3'>
								<LabeledInput name='name' label='Name' placeholder='Configuration Name' />

								{/* <StatusSelector />

								<CompanySelector />

								<ContactSelector />

								<Select name='company'>
									<SelectTrigger>
										<SelectValue placeholder='Select a company' />
									</SelectTrigger>

									<SelectContent>
										{products?.map(({ name, id }) => (
											<SelectItem key={id} value={id.toString()}>
												{name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<TypeSelector /> */}

								<DialogFooter>
									<Button>Create</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>

					{/* <Sheet>
						<SheetTrigger asChild>
							<Button>
								<PlusIcon className='w-4 h-4 mr-1.5' /> New Configuration
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-2xl'>
							<SheetHeader>
								<SheetTitle>Add Configuration</SheetTitle>
							</SheetHeader>
							<form>
								<NewConfigurationForm companies={companies ?? []} contacts={contacts ?? []} products={products ?? []} />
							</form>
						</SheetContent>
					</Sheet> */}
				</div>
			</header>

			<Separator />

			<section className='grid grid-cols-4 p-0'>
				<Suspense fallback={<div>Loading...</div>}>
					<ExpiredWarranties />
				</Suspense>

				<Metric isDraggingEnabled title='Warranty Expires' amount='1' timeline='In the next month' />
				<Metric isDraggingEnabled title='Warranty Expires' amount='1' timeline='In the next month' />
				<Metric isDraggingEnabled title='Warranty Expires' amount='1' timeline='In the next month' />
			</section>

			<Separator />

			<section className='space-y-3'>
				<ConfigurationsList data={assets} />
			</section>
		</main>
	);
};

export default Page;
