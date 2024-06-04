'use client';
import { UserCircle, User, Circle, LogOut, Headset } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { signOut } from '@/lib/supabase/read';
import { Worker } from 'twilio-taskrouter';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Separator } from './ui/separator';
import { webHidPairing } from '../node_modules/@gnaudio/jabra-js/browser-esm/index.js';
import { useJabra } from '@/providers/jabraProvider';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
	user: Contact;
	worker: Worker | null;
	isCollapsed: boolean;
};
const UserInfo = ({ user, worker, isCollapsed }: Props) => {
	const { callControlDevices, currentCallControl, setCurrentCallControl } = useJabra();

	return (
		<Popover>
			<PopoverTrigger asChild>
				{isCollapsed ? (
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='h-9 w-9 shrink-0'
							>
								<User className='h-4 w-4' />
								<span className='sr-only'>User</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							className='flex items-center gap-3'
						>
							Settings
						</TooltipContent>
					</Tooltip>
				) : (
					<Button
						variant='outline'
						size='icon'
						className='p-1.5 h-8 w-8'
					>
						<User />
						<span className='group-[[data-collapsed=true]]:hidden sr-only'>
							{user.firstName} {user.lastName}
						</span>
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent
				side='right'
				className='z-50 md:min-w-48 mt-1.5 space-y-1.5'
			>
				<header className='p-0 justify-start gap-3'>
					<div>
						<p className='font-semibold text-sm'>
							{user.firstName} {user.lastName}
						</p>
						<p className='text-sm'>{user.email}</p>
					</div>
				</header>

				<Separator />

				<section className='px-0'>
					<div className='grid grid-cols-5 gap-1.5'>
						{/* <ActivitySelector className='col-span-2' /> */}
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									onClick={async () => await webHidPairing()}
									className='justify-start text-left font-normal col-span-2'
								>
									<Circle
										className={cn(
											'mr-1.5 h-3 w-3',
											worker && worker?.available ? 'fill-green-500 stroke-green-500' : 'fill-gray-500 stroke-gray-500'
										)}
									/>
									<span>{worker && worker?.available ? 'Available' : 'Unavailable'}</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'></PopoverContent>
						</Popover>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									className=' col-span-3'
								>
									<Headset className=' h-3.5 mr-1.5' />
									{currentCallControl ? currentCallControl.device.name : 'Open'}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56'>
								<DropdownMenuLabel>Devices</DropdownMenuLabel>
								{callControlDevices.map((controlDevice) => {
									const { device } = controlDevice;
									return (
										<DropdownMenuCheckboxItem
											key={device.id.toString()}
											defaultChecked={currentCallControl?.device.id === device.id}
											checked={currentCallControl?.device.id === device.id}
											onCheckedChange={() => {
												webHidPairing().then((data) => {
													setCurrentCallControl(controlDevice);
												});
											}}
										>
											{device.name}
										</DropdownMenuCheckboxItem>
									);
								})}
								<DropdownMenuSeparator />
							</DropdownMenuContent>
						</DropdownMenu>

						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className='justify-start text-left font-normal col-span-5'
								>
									<UserCircle className='w-3 h-3 mr-3' />
									<span>Manage account</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'></PopoverContent>
						</Popover>

						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className='justify-start text-left font-normal col-span-5'
									onClick={async () => signOut()}
								>
									<LogOut className='w-3 h-3 mr-3' />
									<span>Sign out</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'></PopoverContent>
						</Popover>
					</div>
				</section>
			</PopoverContent>
		</Popover>
	);
};

export default UserInfo;
