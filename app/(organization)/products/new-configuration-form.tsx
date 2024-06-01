'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContactSelector from '@/components/selector/contact-selector';
import { Suspense } from 'react';
import CompanySelector from '@/components/selector/company-selector';

const formSchema = z.object({
	company: z.nullable(z.number().optional()),
	contact: z.nullable(z.number().optional()),
	expiration_date: z.nullable(z.string().optional()),
	install_date: z.nullable(z.string().optional()),
	installed_by: z.nullable(z.string().optional()),
	name: z.string(),
	product: z.nullable(z.string().optional()),
	purchase_date: z.nullable(z.string().optional()),
	quantity: z.nullable(z.number().optional()),
	serial_number: z.nullable(z.string().optional()),
	status: z.nullable(z.number().optional()),
	type: z.nullable(z.number().optional()),
	user: z.nullable(z.number().optional()),
});

export default function NewConfigurationForm({ products }: { products: Product[] }) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// console.log(values);

		// console.log(error);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Velo-12345'
									{...field}
								/>
							</FormControl>
							<FormDescription>This is the public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='company'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company</FormLabel>
							<Suspense
								fallback={
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Select a contact' />
										</SelectTrigger>
									</Select>
								}
							>
								<CompanySelector
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
									{...field}
								/>
							</Suspense>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='user'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Contact</FormLabel>
							<Suspense
								fallback={
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Select a contact' />
										</SelectTrigger>
									</Select>
								}
							>
								<ContactSelector
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
									{...field}
								/>
							</Suspense>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='product'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product</FormLabel>

							<Select
								onValueChange={field.onChange}
								defaultValue={field.value ?? undefined}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a company' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{products.map(({ name, id }) => (
										<SelectItem
											key={id}
											value={id.toString()}
										>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
