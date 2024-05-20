import React, { Suspense } from 'react';
import StatusBadge from '@/components/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Briefcase, Pencil, Phone, TrashIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Queue, Workflow, Worker } from '@/types/twilio/taskrouter';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactSelector from '@/components/contact-selector';
import { cookies } from 'next/headers';

type Props = {};

const Page = async (props: Props) => {
	const supabase = createClient();
	type CompanyWithSecrets = Organization & { company: Company & { company_secrets: CompanySecret[] } };
	const { data: organization, error } = await supabase
		.from('organizations')
		.select('*, company(*, company_secrets(*))')
		.returns<CompanyWithSecrets[]>()
		.single();

	console.log(error);

	if (!organization || error) return notFound();

	const data = organization.company;
	const authToken = data.company_secrets.find((s) => s.key === 'TWILIO_AUTH_TOKEN')?.value;
	const accountSid = data.company_secrets.find((s) => s.key === 'TWILIO_ACCOUNT_SID')?.value;
	const workspaceSid = data.company_secrets.find((s) => s.key === 'TWILIO_WORKSPACE_SID')?.value;

	data.company_secrets.forEach((secret) => console.log(secret.key, secret.value));

	const headers = new Headers();
	headers.append('authToken', authToken ?? '');

	const responses = await Promise.all([
		fetch(`http://localhost:3000/api/twilio/${accountSid}/workspace/${workspaceSid}/workflows`, { headers, next: { tags: ['workflows'] } }),
		fetch(`http://localhost:3000/api/twilio/${accountSid}/workspace/${workspaceSid}/queues`, { headers, next: { tags: ['queues'] } }),
		fetch(`http://localhost:3000/api/twilio/${accountSid}/workspace/${workspaceSid}/workers`, { headers, next: { tags: ['workers'] } }),
	]);

	const [workflows, queues, workers] = await Promise.all(responses.map((response) => response.json()));

	console.log(workflows);

	const createWorker = async (formData: FormData) => {
		'use server';
		fetch(`http://localhost:3000/api/twilio/${accountSid}/workspace/${workspaceSid}/workers`, { method: 'POST', body: formData, headers });
	};

	return (
		<main>
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Call Queues</CardTitle>
						<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead className='w-[125px] text-nowrap'>Max reserved Workers</TableHead>
									<TableHead>Target Workers</TableHead>
									<TableHead className='w-[24px] text-nowrap'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{queues &&
									queues?.length > 0 &&
									queues?.map((queue: Queue) => (
										<TableRow key={queue.sid}>
											<TableCell className='font-medium'>{queue.friendlyName}</TableCell>
											<TableCell>
												<Label htmlFor='maxReservedWorkers' className='sr-only'>
													Maximum reserved Workers
												</Label>
												<Input name='maxReservedWorkers' type='number' defaultValue={queue.maxReservedWorkers ?? undefined} />
											</TableCell>
											<TableCell>
												<Label htmlFor='maxReservedWorkers' className='sr-only'>
													Target Worker Expression
												</Label>
												<Textarea name='maxReservedWorkers' defaultValue={queue.targetWorkers ?? undefined} />
											</TableCell>
											<TableCell>
												<div className='flex items-center gap-1.5'>
													<Dialog>
														<DialogTrigger asChild>
															<Button variant='ghost' className='hover:bg-red-50 focus:bg-red-50'>
																<Pencil className='w-3.5 h-3.5 ' />
															</Button>
														</DialogTrigger>
														<DialogContent>
															<DialogHeader>
																<DialogTitle>Edit Queue</DialogTitle>
															</DialogHeader>
															<form action=''></form>
														</DialogContent>
													</Dialog>
													<Button variant='ghost' className='hover:bg-red-50 focus:bg-red-50'>
														<TrashIcon className='w-3.5 h-3.5 text-red-500 ' />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</section>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>Workflows</CardTitle>
						<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead className='w-[125px] text-nowrap'>Max reserved Workers</TableHead>
									<TableHead>Target Workers</TableHead>
									<TableHead className='w-[24px] text-nowrap'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{workflows &&
									workflows?.length > 0 &&
									workflows?.map((workflow: Workflow) => (
										<TableRow key={workflow.sid}>
											<TableCell className='font-medium'>{workflow.friendlyName}</TableCell>
											<TableCell>
												<Label htmlFor='maxReservedWorkers' className='sr-only'>
													Maximum reserved Workers
												</Label>
												<Input name='maxReservedWorkers' type='number' defaultValue={workflow.timeoutActivityName ?? undefined} />
											</TableCell>
											<TableCell>
												<Label htmlFor='maxReservedWorkers' className='sr-only'>
													Target Worker Expression
												</Label>
												<Textarea name='maxReservedWorkers' defaultValue={workflow.accountSid ?? undefined} />
											</TableCell>
											<TableCell>
												<div className='flex items-center gap-1.5'>
													<Dialog>
														<DialogTrigger asChild>
															<Button variant='ghost' className='hover:bg-red-50 focus:bg-red-50'>
																<Pencil className='w-3.5 h-3.5 ' />
															</Button>
														</DialogTrigger>
														<DialogContent>
															<DialogHeader>
																<DialogTitle>Edit Queue</DialogTitle>
															</DialogHeader>
															<form action=''></form>
														</DialogContent>
													</Dialog>
													<Button variant='ghost' className='hover:bg-red-50 focus:bg-red-50'>
														<TrashIcon className='w-3.5 h-3.5 text-red-500 ' />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</section>

			<section>
				<Card>
					<CardHeader className='flex flex-row justify-between space-y-0'>
						<div className='space-y-1.5'>
							<CardTitle>Workers</CardTitle>
							<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Add Worker</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Add Agent</DialogTitle>
								</DialogHeader>

								<form action={createWorker} className='space-y-3'>
									<Suspense fallback={<div></div>}>
										<ContactSelector />
									</Suspense>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant='secondary'>Cancel</Button>
										</DialogClose>

										<Button>Save</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</CardHeader>
					<CardContent className='grid grid-cols-4 gap-3'>
						{workers &&
							workers.length > 0 &&
							workers?.map((worker: Worker) => (
								<div key={worker.sid} className='flex items-center gap-3 justify-around'>
									<div>
										<h4>{worker.friendlyName}</h4>
									</div>
									<Badge variant={worker.available ? 'green' : 'secondary'}>{worker.available ? 'Available' : 'Unavailable'}</Badge>
								</div>
							))}
					</CardContent>
				</Card>
			</section>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>Port existing number</CardTitle>
						<CardDescription>Complete these three simple steps to get started</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex gap-3'>
							<Checkbox className='mt-1' />

							<div>
								<p>
									Phone number <StatusBadge color='green' text='Completed' />
								</p>
								<p className='text-muted-foreground'>Existing phone number information</p>

								<Card>
									<CardContent className='space-y-1.5 p-3'>
										<div className='grid grid-cols-2 gap-3'>
											<div className='flex items-center gap-1.5'>
												<Phone className='h-3.5 w-3.5' />
												<p>Type</p>
											</div>

											<div>🇺🇸 US number</div>
										</div>

										<div className='grid grid-cols-2 gap-3'>
											<div className='flex items-center gap-1.5'>
												<Briefcase className='h-3.5 w-3.5' />
												<p>Carrier</p>
											</div>

											<div>AT&T</div>
										</div>

										<div className='grid grid-cols-2 gap-3'>
											<div className='flex items-center gap-1.5'>
												<Phone className='h-3.5 w-3.5' />
												<p>Phone number</p>
											</div>

											<Input placeholder='(555) 555-5555' />
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
};

export default Page;
