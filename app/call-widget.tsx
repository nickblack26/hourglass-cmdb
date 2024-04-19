'use client';
import { Button } from '@/components/ui/button';
import { CirclePause, Dot, Notebook, Pause, PhoneOff, PhoneOutgoing, Settings } from 'lucide-react';
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

const CallWidget = () => {
	const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[] | undefined>();
	const { currentCall, device } = useTwilio();

	useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then((data) => {
			setMediaDevices(data);
		});
	}, []);

	return (
		<div className='fixed bottom-1.5 right-1.5 left-auto top-auto rounded-lg overflow-hidden'>
			{currentCall && (
				<div className={cn('p-3 transition bg-neutral-800 flex items-center gap-3 text-white', currentCall && 'p-2')}>
					<Avatar>
						<AvatarFallback className='bg-neutral-700 '>NB</AvatarFallback>
					</Avatar>

					<div className='text-sm'>
						<p>Unknown Caller</p>
						<p className='text-muted-foreground'>Call in progress • 00:31</p>
					</div>

					<Button
						variant='destructive'
						size='icon'
						className='rounded-full'
						onClick={() => {
							currentCall?.disconnect();
						}}
					>
						<PhoneOff className='w-3.5 h-3.5' />
					</Button>
				</div>
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

				<Button size='icon'>
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
	);
};

export default CallWidget;
