import { Call } from '@twilio/voice-sdk';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Dot, Grip, Phone } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

type Props = {
	call?: Call;
	isCollapsed: boolean;
};

const CallCard = ({ call, isCollapsed }: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='lg' className='flex items-center h-9 w-9 p-0'>
					<div className='p-1.5 rounded-md bg-secondary'>
						<Phone className='h-3.5 w-3.5' />
					</div>

					{!isCollapsed && (
						<div>
							<p>Call</p>

							<p className='text-sm text-muted-foreground'>(123) 456-7890</p>
						</div>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent side='right' className='z-50 md:min-w-96'>
				<section className='px-1.5 space-y-3'>
					<div className='flex justify-between gap-4'>
						<h4>Incoming Call</h4>
						<p>
							Answer in <Progress value={73} />
						</p>
					</div>

					<div className='flex items-center gap-3'>
						<Avatar>
							<AvatarFallback className='text-sm'>X</AvatarFallback>
						</Avatar>

						<div>
							<h5 className=''>Xavi Hernandez</h5>
							<p className='text-sm text-muted-foreground'>
								<Phone className='w-3 h-3 inline-block' />+ 678-908-456
							</p>
						</div>
					</div>
				</section>

				<Separator />

				<section className='px-1.5 space-y-3'>
					<h4 className='font-medium'>Receiving Number</h4>
				</section>

				<Separator />

				<section className='px-1.5 grid grid-cols-2 items-center gap-2 '>
					<Button variant='outline'>Assign</Button>
					<Button>Accept</Button>
				</section>

				<Separator />

				<section className='px-1.5 grid grid-cols-2 items-center gap-2 '>
					<Button variant='outline'>Assign</Button>
					<Button size='icon' variant='secondary' className='rounded-full flex flex-col'>
						<Grip className='w-3.5 h-3.5' />
						<Dot className='w-3.5 h-3.5 -mt-1' />
					</Button>
				</section>
			</PopoverContent>
		</Popover>
	);
};

export default CallCard;
