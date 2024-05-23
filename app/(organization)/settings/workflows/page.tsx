import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import QueueForm from '@/components/queue-form';
import { Card } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, MoreHorizontal, Pencil } from 'lucide-react';
import type { WorkflowInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/workflow';
import WorkflowForm from '@/components/workflow-form';
import { createClient } from '@/lib/supabase/server';

type Props = {};

const Page = async (props: Props) => {
	const supabase = createClient();
	const headers = new Headers();
	headers.append('authToken', '927970c354916b481735c0d2d3d46591' ?? '');
	const responses = await Promise.all([
		fetch(`http://localhost:3000/api/twilio/1/workspace/1/queues`, { headers, next: { tags: ['queues'] } }),
		fetch(`http://localhost:3000/api/twilio/1/workspace/1/workflows`, { headers, next: { tags: ['workflows'] } }),
		fetch(`http://localhost:3000/api/twilio/1/workspace/1/workers`, { headers, next: { tags: ['workers'] } }),
	]);
	const { data: teams, error } = await supabase.from('teams').select();

	const [queues, workflows, workers] = await Promise.all(responses.map((response) => response.json()));

	return (
		<TooltipProvider>
			<div className='space-y-6'>
				<section className='space-y-1.5 px-0'>
					<h1>Workflows</h1>
					<p className='text-sm text-muted-foreground'>Manage workspace workflows</p>
				</section>

				<Separator />

				<section className='space-y-6 px-0'>
					<p className='text-sm text-muted-foreground'>
						Use workflows to control how communication will be prioritized and routed into{' '}
						<Link href='/settings/queues' className='text-accent-foreground hover:underline'>
							Queues
						</Link>
						, and how they should escalate in priority or move across queues over time.
					</p>

					<div className='flex items-center justify-between gap-1.5'>
						<div className='flex items-center gap-1.5'>
							<Input placeholder='Filter by name...' className='max-w-72 h-8 w-full' />
							<Button variant='outline'>
								<ListFilter className='w-3.5 h-3.5 mr-1.5' /> Filters
							</Button>
						</div>

						<div className='flex items-center gap-1.5'>
							<Button variant='outline'>New group</Button>
							<Dialog>
								<DialogTrigger asChild>
									<Button>New workflow</Button>
								</DialogTrigger>

								<DialogContent>
									<DialogHeader>
										<DialogTitle>New Queue</DialogTitle>
									</DialogHeader>

									<WorkflowForm queues={queues} workers={workers} teams={teams ?? []} />

									<DialogFooter>
										<DialogClose asChild>
											<Button type='button' variant='secondary'>
												Cancel
											</Button>
										</DialogClose>

										<Button type='submit' form='queueForm'>
											Save
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					<div className='space-y-3'>
						{workflows.map((workflow: WorkflowInstance) => (
							<Card key={workflow.sid} className='flex items-cente justify-between gap-1.5 py-3 px-6 group'>
								<div className='text-sm'>{workflow.friendlyName}</div>
								<div className='flex items-center gap-3 opacity-0 group-hover:opacity-100'>
									<Tooltip>
										<TooltipTrigger>
											<Info className='w-3.5 h-3.5' />
										</TooltipTrigger>
										<TooltipContent>Created on {new Date(workflow.dateCreated).toDateString()}</TooltipContent>
									</Tooltip>

									<Tooltip>
										<Dialog>
											<DialogTrigger asChild>
												<TooltipTrigger>
													<Pencil className='w-3.5 h-3.5' />
												</TooltipTrigger>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>{workflow.friendlyName}</DialogTitle>
												</DialogHeader>

												<WorkflowForm workflow={workflow} queues={queues} workers={workers} teams={teams ?? []} />

												<DialogFooter>
													<DialogClose asChild>
														<Button type='button' variant='secondary'>
															Cancel
														</Button>
													</DialogClose>
													<Button type='submit' form='queueForm'>
														Save
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
										<TooltipContent>Edit queue</TooltipContent>
									</Tooltip>

									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreHorizontal className='w-3.5 h-3.5' />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuGroup>
												<DropdownMenuItem>Convert to group</DropdownMenuItem>
												<DropdownMenuSub>
													<DropdownMenuSubTrigger>Move to group</DropdownMenuSubTrigger>
													<DropdownMenuSubContent>
														<DropdownMenuItem>Group 1</DropdownMenuItem>
														<DropdownMenuItem>Group 2</DropdownMenuItem>
													</DropdownMenuSubContent>
												</DropdownMenuSub>
											</DropdownMenuGroup>

											<DropdownMenuSeparator />

											<DropdownMenuGroup>
												<DropdownMenuItem>Edit label...</DropdownMenuItem>
												<DropdownMenuItem>Open queue page</DropdownMenuItem>
											</DropdownMenuGroup>

											<DropdownMenuSeparator />

											<DropdownMenuGroup>
												<DropdownMenuItem>Delete label...</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</Card>
						))}
					</div>
				</section>
			</div>
		</TooltipProvider>
	);
};

export default Page;
