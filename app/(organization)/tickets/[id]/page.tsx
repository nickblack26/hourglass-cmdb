import { ArrowRight, ChevronDown, CornerDownLeft, Mic, Paperclip } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import ContactSelector from '@/components/selector/contact-selector';
import { DatePicker } from '@/components/ui/date-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Page = async ({ params }: { params: { id: string } }) => {
	const db = await createClient();
	const ticket = await db.collection('tickets').findOne<Ticket>({ _id: new ObjectId(params.id) });

	if (!ticket) {
		notFound();
	}

	return (
		<TooltipProvider>
			<main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
				<div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
					<Badge
						variant='outline'
						className='absolute right-3 top-3'
					>
						Output
					</Badge>
					<div className='flex-1' />
					<form
						className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
						x-chunk='dashboard-03-chunk-1'
					>
						<Label
							htmlFor='message'
							className='sr-only'
						>
							Message
						</Label>
						<Textarea
							id='message'
							placeholder='Type your message here...'
							className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
						/>
						<div className='flex items-center p-3 pt-0'>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
									>
										<Paperclip className='size-4' />
										<span className='sr-only'>Attach file</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side='top'>Attach File</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
									>
										<Mic className='size-4' />
										<span className='sr-only'>Use Microphone</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side='top'>Use Microphone</TooltipContent>
							</Tooltip>
							<Button
								type='submit'
								size='sm'
								className='ml-auto gap-1.5'
							>
								Send Message
								<CornerDownLeft className='size-3.5' />
							</Button>
						</div>
					</form>
				</div>

				<div>
					<div className='flex items-center gap-3'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='default'>
									Watiting for support <ChevronDown className='w-3 h-3 ml-1.5' />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent className='w-64'>
								<DropdownMenuItem className='flex items-center justify-between gap-3'>
									<span className='text-sm'>Escalate</span>
									<span>
										<ArrowRight className='w-3 h-3 inline-block' /> <Badge className='text-xs'>Escalated</Badge>
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Popover>
							<PopoverTrigger asChild>
								<Button variant='ghost'>
									<LightningBoltIcon className=' h-3.5 mr-1.5' />
									Actions <ChevronDown className='w-3 h-3 ml-1.5' />
								</Button>
							</PopoverTrigger>

							<PopoverContent></PopoverContent>
						</Popover>
					</div>

					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium'>Details</legend>

						<div className='grid grid-cols-5 items-center gap-1.5'>
							<Label htmlFor='contact'>Model</Label>

							<ContactSelector className='col-span-4' />
						</div>

						<div className='grid grid-cols-5 items-center gap-1.5'>
							<Label htmlFor='contact'>Reporter</Label>

							<ContactSelector className='col-span-4' />
						</div>

						<div className='grid grid-cols-5 items-center gap-1.5'>
							<Label htmlFor='priority'>Priority Selector</Label>

							{/* <DatePicker className='col-span-4' /> */}
						</div>

						<div className='grid grid-cols-5 items-center gap-1.5'>
							<Label htmlFor='dueDate'>Due Date</Label>

							<DatePicker className='col-span-4' />
						</div>
					</fieldset>
				</div>
			</main>
		</TooltipProvider>
	);
};

export default Page;
