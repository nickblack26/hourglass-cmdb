import { Call } from '@twilio/voice-sdk';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { ChevronDown, Circle, Dot, Grip, Phone, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { type Activity, Reservation } from 'twilio-taskrouter';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useJabra } from '@/providers/jabraProvider';

type Props = {
	call?: Call;
	reservation?: Reservation;
	isCollapsed: boolean;
};

const CallCard = ({ call, reservation, isCollapsed }: Props) => {
	const { currentCallControl } = useJabra();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!reservation) return;
		currentCallControl?.signalIncomingCall();

		setIsOpen(true);
		reservation.on('accepted', (e) => {
			// e.on()
		});
	}, [reservation, currentCallControl]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				{/* <Button variant='ghost' size='sm' className='flex items-center h-9 w-auto p-0'>
					<div className='p-1.5 rounded-md bg-secondary'>
						<Phone className=' w-3.5' />
					</div>

					{!isCollapsed && (
						<div>
							<p>Call</p>

							<p className='text-sm text-muted-foreground'>(123) 456-7890</p>
						</div>
					)}
				</Button> */}
				{isCollapsed ? (
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<Button variant='ghost' size='icon' className='h-9 w-9'>
								<Phone className=' w-3.5' />
								<span className='sr-only'>Phone</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side='right' className='flex items-center gap-3'>
							Phone
						</TooltipContent>
					</Tooltip>
				) : (
					<Button variant='ghost' size='icon' className='justify-start'>
						<Phone className=' w-3.5' />

						<div>
							<p>Call</p>

							<p className='text-sm text-muted-foreground'>(123) 456-7890</p>
						</div>
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent side='right' className='z-50 md:min-w-96'>
				<header className='px-1.5 grid grid-cols-3 items-center'>
					<Select defaultValue='WA86669809ccf0ad1907fe6e154259ce69'>
						<SelectTrigger>
							<div className='flex items-center gap-1.5'>
								<Circle className='w-2 h-2 fill-green-500 stroke-green-500' />
								<span>Online</span>
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='WA86669809ccf0ad1907fe6e154259ce69'>
								<div className='flex items-center gap-1.5'>
									<Circle className='w-2 h-2 fill-gray-500 stroke-gray-500' />
									Offline
								</div>
							</SelectItem>
							<SelectItem value='WAde91c2ed3cb06ae36e980ca51c215fee'>
								<div className='flex items-center gap-1.5'>
									<Circle className='w-2 h-2 fill-green-500 stroke-green-500' />
									Available
								</div>
							</SelectItem>
							<SelectItem value='WA6755aa0b5f199dbf148c1633fc4e367e'>
								<div className='flex items-center gap-1.5'>
									<Circle className='w-2 h-2 fill-gray-500 stroke-gray-500' />
									Unavailable
								</div>
							</SelectItem>
						</SelectContent>
					</Select>
					<Button variant={'ghost'} size={'icon'} className='col-span-2 justify-self-end' onClick={() => setIsOpen(!isOpen)}>
						<X className=' h-3.5' />
					</Button>
				</header>

				<Separator />

				<section className='px-1.5 space-y-3'>
					<div className='flex justify-between gap-4'>
						{reservation?.status === 'accepted' ? (
							<h4>
								Call in progress - <span>00:45</span>
							</h4>
						) : (
							<h4>Incoming Call</h4>
						)}
						{reservation?.status !== 'accepted' && (
							<p>
								Answer in <Progress value={reservation?.timeout} />
							</p>
						)}
					</div>

					<div className='flex items-center gap-3'>
						<Avatar>
							<AvatarFallback className='text-sm'>X</AvatarFallback>
						</Avatar>

						<div>
							<h5 className=''>{reservation?.task.attributes['name']}</h5>
							<p className='text-sm text-muted-foreground'>
								<Phone className='w-3 h-3 inline-block' />
								{reservation?.task.attributes['from']}
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
					<Button variant='destructive' onClick={async () => await reservation?.reject()}>
						Reject
					</Button>
					<Button onClick={async () => await reservation?.accept()}>Accept</Button>
				</section>

				<Separator />

				<section className='px-1.5 grid grid-cols-2 items-center gap-2 '>
					{reservation?.status === 'accepted' ? (
						<Button onClick={async () => await reservation.task.wrapUp({ reason: 'Wrapping' })}>Complete</Button>
					) : (
						<Button variant='outline'>Reject</Button>
					)}
				</section>
			</PopoverContent>
		</Popover>
	);
};

export default CallCard;
