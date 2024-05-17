import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/server';
import { sectionedFeatures } from './features';
import { Switch } from '@/components/ui/switch';

export default async function Page() {
	const supabase = createClient();

	const { data: organization, error } = await supabase
		.from('organizations')
		.select('company(*)')
		.returns<{ id: string } & { company: Company }>()
		.single();

	if (!organization?.company) return <div>{JSON.stringify(error)}</div>;

	return (
		<div className='grid gap-6'>
			<Card>
				<CardHeader>
					<CardTitle>Organization Name</CardTitle>
					<CardDescription>Used to identify your store in the marketplace.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<Input placeholder='Store Name' defaultValue={organization?.company?.name} />
					</form>
				</CardContent>
				<CardFooter className='border-t px-6 py-4'>
					<Button>Save</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Plugins Directory</CardTitle>
					<CardDescription>The directory within your project, in which your plugins are located.</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='flex flex-col gap-4'>
						<Input placeholder='Project Name' defaultValue='/content/plugins' />
						<div className='flex items-center space-x-2'>
							<Checkbox id='include' defaultChecked />
							<label htmlFor='include' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								Allow administrators to change the directory.
							</label>
						</div>
					</form>
				</CardContent>
				<CardFooter className='border-t px-6 py-4'>
					<Button>Save</Button>
				</CardFooter>
			</Card>

			<section className='px-0 space-y-2'>
				<h2>Features</h2>

				{sectionedFeatures.map((section) => (
					<div key={section.name}>
						<h4 className='mb-2'>{section.name}</h4>

						<div className='space-y-4'>
							{section.features.map((feature) => (
								<Card key={feature.name}>
									<CardHeader>
										<CardTitle>{feature.name}</CardTitle>
										{feature.description && <CardDescription>{feature.description}</CardDescription>}
									</CardHeader>
									<CardContent>
										<Switch defaultChecked={feature.enabled} />
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
