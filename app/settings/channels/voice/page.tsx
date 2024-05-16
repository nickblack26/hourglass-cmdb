import React from 'react';
import StatusBadge from '@/components/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Briefcase, Phone, TrashIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Workflow } from '@/types/data';
import { Label } from '@/components/ui/label';
import LabeledInput from '@/components/labled-input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Props = {};

const Page = async (props: Props) => {
	const responses = await Promise.all([fetch('http://localhost:3000/api/twilio/workflows'), fetch('http://localhost:3000/api/twilio/queues')]);
	const [workflows, queues] = await Promise.all(responses.map((response) => response.json()));

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
									queues?.map((queue: Workflow) => (
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
						<div className='grid grid-cols-4 gap-3'>
							{workflows &&
								workflows.length > 0 &&
								workflows?.map((workflow: Workflow) => (
									<>
										<h4>{workflow.friendlyName}</h4>
									</>
								))}
						</div>
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
