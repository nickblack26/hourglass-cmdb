'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/lib/mongodb';
import CompanySelector from '@/components/selector/company-selector';
import { Suspense } from 'react';
import ContactSelector from '@/components/selector/contact-selector';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
	name: z.string(),
	description: z.nullable(z.string().optional()),
	company: z.nullable(z.number().optional()),
	user: z.nullable(z.number().optional()),
});

type Props = {
	configuration?: Configuration;
};

const ConfigurationDetailForm = ({ configuration }: Props) => {
	const db = await createClient();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: configuration?.name,
			description: '',
			// @ts-ignore
			company: configuration?.user?.company?.id,
			// @ts-ignore
			user: configuration?.user?.user_id,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		delete values['description'];
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// console.log(values);
		if (configuration) {
			const { error } = await db.collection('configurations').update(values).eq('id', configuration.id);
			console.log(error);
		} else {
			const { error } = await db.collection('configurations').insert(values);
			console.log(error);
		}
	}

	console.log(form.formState.isDirty, form.formState.isSubmitted);

	const disabled = !form.formState.isDirty || form.formState.isSubmitted;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Configuration Details</CardTitle>

				<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id='configuration-detail-form'
						name='configuration-detail-form'
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
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a company...' />
													</SelectTrigger>
												</FormControl>
											</Select>
										}
									>
										<CompanySelector
											onValueChange={field.onChange}
											defaultValue={field?.value?.toString() ?? undefined}
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
								<FormItem>
									<FormLabel>Contact</FormLabel>

									<Suspense
										fallback={
											<Select>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a contact...' />
													</SelectTrigger>
												</FormControl>
											</Select>
										}
									>
										<ContactSelector
											onValueChange={field.onChange}
											defaultValue={field.value?.toString() ?? undefined}
										/>
									</Suspense>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* <FormField
					control={form.control}
					name='product'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a company' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{products.map(({ name, id }) => (
										<SelectItem key={id} value={id.toString()}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/> */}
					</form>
				</Form>
			</CardContent>

			<CardFooter className='border-t p-4'>
				<Button
					disabled={disabled}
					className='ml-auto'
					form='configuration-detail-form'
				>
					Save
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ConfigurationDetailForm;
