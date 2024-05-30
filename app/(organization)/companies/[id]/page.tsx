import ContactList from '@/app/(organization)/contacts/contact-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import { IDPageProps } from '@/types/data';
import { BoxIcon, Building2Icon, CalendarDaysIcon, UserIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Page({ params }: IDPageProps) {
	const supabase = createClient();
	const companyQuery = supabase.from('companies').select('*, contacts(*)').eq('id', params.id).single();
	const allCompaniesQuery = supabase.from('companies').select('id, name');

	const [{ data: company, error: companyError }, { data: companies, error: companiesError }] = await Promise.all([
		companyQuery,
		allCompaniesQuery,
	]);

	if (!company || companyError || !companies || companiesError) {
		console.error(companyError, companiesError);
		return notFound();
	}

	const details = [
		{
			label: 'Identifier',
			value: company.accountNumber,
			icon: CalendarDaysIcon,
		},
		{
			label: 'Expiration date',
			value: `${company.addressLine1}\n${company.addressLine2}\n${company.city},${company.state}${company.zip}`,
			icon: CalendarDaysIcon,
		},
		{
			label: 'Phone Number',
			value: company.phoneNumber,
			icon: UserIcon,
		},
		{
			label: 'Website',
			value: company.website,
			icon: BoxIcon,
		},
		{
			label: 'Status',
			value: JSON.stringify(company?.status?.name),
			icon: Building2Icon,
		},
	];

	return (
		<main>
			<header>
				<h1>{company.name}</h1>

				<Button>Add Ticket</Button>
			</header>

			<Separator />
			<section className='grid grid-cols-[256px_1fr] gap-12 px-6 flex-1'>
				<Card className='bg-secondary/50 shadow-none border-none justify-self-stretch mb-6'>
					<CardHeader className='px-3'>
						<CardTitle>Details</CardTitle>
					</CardHeader>
					<CardContent className='px-3 space-y-3'>
						{details.map((detail) => (
							<div
								key={detail.label}
								className='text-sm font-medium'
							>
								<div className='flex items-center text-muted-foreground font-normal'>
									<detail.icon className='w-3 h-3 mr-1.5' /> {detail.label}
									{detail.action && detail.action}
									{/* <Button variant='ghost' className='ml-auto'>
										{detail.value ? <PencilIcon className='w-3 h-3' /> : <PlusIcon className='w-3 h-3' />}
									</Button> */}
								</div>
								<div className='ml-[18px]'>{detail.value}</div>
							</div>
						))}
					</CardContent>
				</Card>

				<div className='space-y-3'>
					<h2>Contacts</h2>
					<ContactList
						data={company.contacts ?? []}
						companies={companies ?? []}
					/>
				</div>
			</section>

			<Separator />
		</main>
	);
}
