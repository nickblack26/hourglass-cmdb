import LabeledInput from '@/components/labled-input';
import QueueForm from '@/components/queue-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ListFilter, MoreHorizontal, Pencil } from 'lucide-react';
import React from 'react';
import type { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';

type Props = {};

const Page = async ({}: Props) => {
	const headers = new Headers();
	headers.append('authToken', '927970c354916b481735c0d2d3d46591' ?? '');
	const responses = await Promise.all([
		fetch(`http://localhost:3000/api/twilio/1/workspace/$1/queues`, { headers, next: { tags: ['queues'] } }),
		fetch(`http://localhost:3000/api/twilio/1/workspace/1/workers`, { headers, next: { tags: ['workers'] } }),
	]);

	const [queues, workers] = await Promise.all(responses.map((response) => response.json()));

	console.log(queues);

	return (
		<TooltipProvider>
			<div className='space-y-6'>
				<section className='space-y-1.5 px-0'>
					<h1>Queues</h1>
					<p className='text-sm text-muted-foreground'>Manage workspace queues</p>
				</section>

				<Separator />

				<section className='space-y-6 px-0'>
					<p className='text-sm text-muted-foreground'>
						Use queues to categorize communication and describe which members are eligible to handle that communication. As your Workflows process
						communication, use queues to ensure it passes through one or more queues until it is assigned and accepted by an eligible member.
					</p>

					<div className='flex items-center justify-between gap-1.5'>
						<div className='flex items-center gap-1.5'>
							<Input placeholder='Filter by name...' className='max-w-72 h-8 w-full' />
							<Button variant='outline'>
								<ListFilter className=' h-3.5 mr-1.5' /> Filters
							</Button>
						</div>

						<div className='flex items-center gap-1.5'>
							<Button variant='outline'>New group</Button>
							<Dialog>
								<DialogTrigger asChild>
									<Button>New queue</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>New Queue</DialogTitle>
									</DialogHeader>
									<QueueForm />
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

					{queues?.map((queue: TaskQueueInstance) => (
						<Card key={queue.sid} className='flex items-cente justify-between gap-1.5 py-3 px-6 group'>
							<div>{queue.friendlyName}</div>
							<div className='flex items-center gap-3 opacity-0 group-hover:opacity-100'>
								<Tooltip>
									<TooltipTrigger>
										<Info className=' h-3.5' />
									</TooltipTrigger>
									<TooltipContent>Created on {new Date(queue.dateCreated).toDateString()}</TooltipContent>
								</Tooltip>

								<Tooltip>
									<Dialog>
										<DialogTrigger asChild>
											<TooltipTrigger>
												<Pencil className=' h-3.5' />
											</TooltipTrigger>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>{queue.friendlyName}</DialogTitle>
											</DialogHeader>
											<QueueForm queue={queue} />
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
										<MoreHorizontal className=' h-3.5' />
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

					{/* {workers?.map((queue: WorkerInstance) => (
					<div key={queue.sid}>{queue.friendlyName}</div>
				))} */}
				</section>
			</div>
		</TooltipProvider>
	);
};

export default Page;
