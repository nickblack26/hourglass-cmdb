'use client';
import { Button } from '@/components/ui/button';
import { AudioLines, CirclePause, Dot, Notebook, Pause, Phone, PhoneOff, PhoneOutgoing, Settings, UserPlus, X } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Call, Device } from '@twilio/voice-sdk';
import { cn } from '@/lib/utils';
import { useTwilio } from '@/providers/twilioVoiceContext';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { makeOutgoingCall } from '@/lib/twilio/call-helper';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CallWidget = () => {
	const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[] | undefined>();
	const [inboundCalls, setInboundCalls] = useState<Call[]>();
	const [outbound, setOutboundCalls] = useState<Call[]>();

	const [showCalls, setShowCalls] = useState(false);
	const { currentCall, device } = useTwilio();

	useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then((data) => {
			setMediaDevices(data);
		});

		// Promise.all([
		// 	fetch('/api/calls/inbound', { next: { tags: ['inboundCalls'] } }),
		// 	fetch('/api/calls/outbound', { next: { tags: ['outboundCalls'] } }),
		// ]).then(([inboundResonse, outboundResponse]) => {
		// 	inboundResonse.json().then((data) => {
		// 		console.log(data);
		// 		setInboundCalls(data);
		// 	});
		// 	outboundResponse.json().then((data) => {
		// 		console.log(data);
		// 		setOutboundCalls(data);
		// 	});
		// });
	}, []);

	return (
		<TooltipProvider>
			<div className='fixed bottom-1.5 right-1.5 left-auto top-auto rounded-lg overflow-hidden'>
				{currentCall !== undefined && (
					<div
						className={cn('p-3 min-w-[375px] transition bg-neutral-800 grid place-items-center gap-3 text-white text-center', currentCall && 'p-2')}
					>
						<div className='flex items-center justify-between gap-3 text-xs w-full'>
							<p>🚀 Customer Support</p>

							<div className='flex items-center gap-1.5'>
								<p>Incoming call</p>
								<Button variant='ghost' className='h-4.5 w-4.5 p-1 hover:bg-neutral-700 hover:text-primary-foreground'>
									<X className='w-3 h-3' />
								</Button>
							</div>
						</div>

						<Separator className='bg-neutral-700' />

						<Avatar className='w-14 h-14'>
							<AvatarFallback className='bg-neutral-700 text-xl'>NB</AvatarFallback>
						</Avatar>

						<div className='text-sm'>
							<h4 className='text-lg'>Unknown Caller</h4>
							<p className='text-white/75'>is calling Customer Support</p>
						</div>

						<div className='grid grid-cols-2 gap-3 w-full'>
							<Button
								variant='destructive'
								className='w-full'
								onClick={() => {
									currentCall?.disconnect();
								}}
							>
								<Phone className='w-3.5 h-3.5 mr-1.5 fill-primary-foreground stroke-none rotate-[135deg]' />
								Decline
							</Button>
							<Button className='w-full bg-green-500 hover:bg-green-600'>
								<Phone className='w-3.5 h-3.5 mr-1.5 fill-primary-foreground stroke-none' /> Answer
							</Button>
						</div>
					</div>
				)}

				{currentCall !== undefined && (
					<div
						className={cn('p-3 min-w-[375px] transition bg-neutral-800 grid place-items-center gap-3 text-white text-center', currentCall && 'p-2')}
					>
						<div className='flex items-center justify-between gap-3 text-xs w-full'>
							<p>🚀 Customer Support 12:37</p>

							<div className='flex items-center gap-1.5'>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant='ghost' className='h-4.5 w-4.5 p-1 hover:bg-neutral-700 hover:text-primary-foreground'>
											<UserPlus className='w-3 h-3' />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Add caller</TooltipContent>
								</Tooltip>
							</div>
						</div>

						<Separator className='bg-neutral-700' />

						<div className='grid grid-cols-[24px_1fr] gap-3 items-center justify-start w-full'>
							<Avatar className='w-6 h-6'>
								<AvatarFallback className='bg-neutral-700 text-xs'>NB</AvatarFallback>
							</Avatar>

							<div className='text-sm text-left flex items-center gap-1.5'>
								<p>Nick Black</p>
								<p className='text-white/75 text-xs'>You</p>
								{/* <AudioLines className='w-3.5 h-3.5 text-green-500' /> */}
							</div>
						</div>

						<div className='grid grid-cols-[24px_1fr] gap-3 items-center justify-start w-full'>
							<Avatar className='w-6 h-6'>
								<AvatarFallback className='bg-neutral-700 text-xs'>NB</AvatarFallback>
							</Avatar>

							<div className='text-sm text-left flex items-center gap-1.5'>
								<p>Unknown Caller</p>
								<AudioLines className='w-3.5 h-3.5 text-green-500' />
							</div>
						</div>
					</div>
				)}

				{showCalls && (
					<Tabs defaultValue='inbound' className='bg-neutral-800 text-white overflow-hidden'>
						<TabsList>
							<TabsTrigger value='inbound'>Inbound</TabsTrigger>
							<TabsTrigger value='outbound'>Outbound</TabsTrigger>
						</TabsList>

						<TabsContent value='inbound' className='min-h-20 max-h-40 px-6'>
							{inboundCalls?.map((call) => (
								// @ts-ignore
								<div key={call?.sid} className='flex items-center gap-3 transition-colors hover:bg-neutral-900 py-1 px-3 -mx-3 rounded-md'>
									{/* @ts-ignore */}
									<Button variant='ghost' size='sm' onClick={() => makeOutgoingCall(device, call.from)}>
										<PhoneOutgoing className='w-3.5 h-3.5' />
									</Button>
									{/* @ts-ignore */}
									<p>{call?.from}</p>
								</div>
							))}
						</TabsContent>
						<TabsContent value='outbound'></TabsContent>
					</Tabs>
				)}

				<div
					className={cn(
						'flex items-end justify-end gap-1.5 bg-neutral-700 p-1.5',
						currentCall && currentCall.status() === Call.State.Open && 'justify-start'
					)}
				>
					<Button size='icon'>
						<PhoneOutgoing className='w-3.5 h-3.5' />
					</Button>

					<Button size='icon'>
						<Pause className='w-3.5 h-3.5' />
					</Button>

					<Button size='icon' onClick={() => setShowCalls(!showCalls)}>
						<Notebook className='w-3.5 h-3.5' />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size='icon'>
								<Settings className='w-3.5 h-3.5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup title='Audio'>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Input</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuRadioGroup
											defaultValue={
												mediaDevices?.filter((device) => device.kind === 'audioinput').find((device) => device.label.includes('Default'))?.deviceId
											}
											className='mb-2'
										>
											{mediaDevices &&
												mediaDevices
													.filter((device) => device.kind === 'audioinput')
													.map((device) => (
														<DropdownMenuRadioItem key={device.deviceId} value={device.deviceId}>
															{device.label}
														</DropdownMenuRadioItem>
													))}
										</DropdownMenuRadioGroup>
									</DropdownMenuSubContent>
								</DropdownMenuSub>

								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Output</DropdownMenuSubTrigger>
									<DropdownMenuSubContent className='mb-2'>
										<DropdownMenuRadioGroup
											defaultValue={
												mediaDevices?.filter((device) => device.kind === 'audiooutput').find((device) => device.label.includes('Default'))?.deviceId
											}
										>
											{mediaDevices &&
												mediaDevices
													.filter((device) => device.kind === 'audiooutput')
													.map((device) => (
														<DropdownMenuRadioItem key={device.deviceId} value={device.deviceId}>
															{device.label}
														</DropdownMenuRadioItem>
													))}
										</DropdownMenuRadioGroup>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<Dot className='w-6 h-6 text-green-500' />
				</div>
			</div>
		</TooltipProvider>
	);
};

export default CallWidget;
