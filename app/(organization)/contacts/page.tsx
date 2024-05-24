import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2Icon, CalendarDaysIcon, EllipsisIcon, FilterIcon, PanelsTopLeftIcon, SearchIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ContactList from './contact-list';
import CSVImporter from '@/components/csv-importer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NewContactForm from './new-contact-form';

const Page = async () => {
	const supabase = createClient();
	const contactsWithCompany = supabase.from('users').select('*, company(id, name)').order('firstName');

	const companiesQuery = supabase.from('companies').select().limit(15).order('id');

	const [{ data: contacts, error: contactsError }, { data: companies, error: companiesError }] = await Promise.all([
		contactsWithCompany,
		companiesQuery,
	]);

	if (contactsError || companiesError) {
		console.error(contactsError, companiesError);
		notFound();
	}

	return (
		<Tabs defaultValue='customers'>
			<main>
				<header className='grid grid-cols-3 w-full items-center py-3 container'>
					<h1 className='text-xl font-semibold'>Customers</h1>

					<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
						<Button variant='ghost'>
							<EllipsisIcon className='w-4 h-4 text-muted-foreground' />
						</Button>

						<NewContactForm />
					</div>
				</header>

				<Separator />

				<section className='flex items-center gap-3 px-6'>
					<div
						className={cn(
							'flex items-center max-w-60 border px-3 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-full'
						)}
					>
						<SearchIcon className='w-4 h-4 mr-1.5' />
						<span className='inline-flex'>Search...</span>
						<kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
							<span className='text-xs'>⌘</span>K
						</kbd>
					</div>

					<Button variant='ghost'>
						<CalendarDaysIcon className='w-4 h-4 mr-1.5' /> Date Created
					</Button>

					<Button variant='ghost'>
						<Building2Icon className='w-4 h-4 mr-1.5' /> Organization
					</Button>

					<Button variant='ghost'>
						<FilterIcon className='w-4 h-4 mr-1.5' /> All sources
					</Button>

					<Button variant='ghost' className='ml-auto'>
						<PanelsTopLeftIcon className='w-4 h-4 mr-1.5' /> Manage Columns
					</Button>

					<TabsList>
						<TabsTrigger value='customers'>Customers</TabsTrigger>
						<TabsTrigger value='organizations'>Organizations</TabsTrigger>
					</TabsList>
				</section>

				<TabsContent value='customers' className='px-6'>
					<ContactList data={contacts ?? []} companies={companies} />
					{/* <DataTable columns={columns} data={contacts ?? []} searchKey='firstName' /> */}
				</TabsContent>
				<TabsContent value='organizations'>{/* <DataTable columns={companyColumns} data={companies ?? []} /> */}</TabsContent>
			</main>
		</Tabs>
	);
};

export default Page;
