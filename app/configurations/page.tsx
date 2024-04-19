import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EllipsisIcon, FocusIcon, PlusCircle, PlusIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ConfigurationsList from './configurations-list';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import NewConfigurationForm from '../products/new-configuration-form';
import Metric from '@/components/Metric';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpiredWarranties from './expired-warranties';
import { createConfiguration } from '@/lib/supabase/create';
import LabeledInput from '@/components/labled-input';
import StatusSelector from '@/components/status-selector';
import CompanySelector from '@/components/company-selector';
import ContactSelector from '@/components/contact-selector';
import TypeSelector from '@/components/type-selector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Page = async () => {
	const supabase = createClient();
	const getConfigs = supabase
		.from('configurations')
		.select('*, type(icon), user(id, firstName, lastName, company(id, name)), status(id, name)')
		.order('name')
		.limit(14);
	const getContacts = await supabase.from('contacts').select().order('firstName');
	const getCompanies = await supabase.from('companies').select();
	const getStatuses = await supabase.from('statuses').select();
	const getProducts = await supabase.from('products').select();

	const [
		{ data: configurations, error },
		{ data: contacts, error: contactError },
		{ data: companies, error: companyError },
		{ data: statuses, error: statusError },
		{ data: products, error: productError },
	] = await Promise.all([getConfigs, getContacts, getCompanies, getStatuses, getProducts]);

	// console.log(configurations);

	if (error || !configurations) {
		console.log(error);
		notFound();
	}

	return (
		<main>
			<header className='grid grid-cols-3 w-full items-center'>
				<h1 className='text-xl font-semibold'>Configurations</h1>

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
								Create Configuration
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create Product</DialogTitle>
							</DialogHeader>
							<form action={createConfiguration} className='grid gap-3'>
								<LabeledInput name='name' label='Name' placeholder='Configuration Name' />

								<StatusSelector />

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

								<TypeSelector />

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

				<Metric title='Warranty Expires' amount='1' timeline='In the next month' />
				<Metric title='Warranty Expires' amount='1' timeline='In the next month' />
				<Metric title='Warranty Expires' amount='1' timeline='In the next month' />
			</section>

			<Separator />

			<section className='space-y-3'>
				<ConfigurationsList data={configurations} />
			</section>
		</main>
	);
};

export default Page;
