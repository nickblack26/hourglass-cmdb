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

					{/* <div>
								<DropdownMenu>
									<DropdownMenuTrigger className='relative w-full flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
										<CheckCircle2 className='w-4 h-4 fill-green-500 stroke-primary-foreground mr-1.5' />
										Available
										<ChevronRight className='ml-auto w-4 h-4' />
									</DropdownMenuTrigger>

									<DropdownMenuContent side='right' className='min-w-52 mb-2'>
										<DropdownMenuLabel>Status</DropdownMenuLabel>

										<DropdownMenuSeparator />

										<DropdownMenuGroup>
											<DropdownMenuCheckboxItem>
												<XCircle className='w-4 h-4 text-muted-foreground mr-1.5' />
												Offline
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem checked>
												<CheckCircle2 className='w-4 h-4 fill-green-500 text-primary-foreground mr-1.5' />
												Available
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Clock className='w-4 h-4 fill-orange-500 text-primary-foreground mr-1.5' />
												Unavailable
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Clock className='w-4 h-4 fill-orange-500 text-primary-foreground mr-1.5' />
												Break
											</DropdownMenuCheckboxItem>

											<DropdownMenuCheckboxItem>
												<Building2Icon className='w-4 h-4 fill-red-500 text-primary-foreground mr-1.5' />
												On-Site
											</DropdownMenuCheckboxItem>
										</DropdownMenuGroup>

										<DropdownMenuSeparator />

										<DropdownMenuSub>
											<DropdownMenuSubTrigger className='flex items-center'>
												<Clock className=' h-3.5 text-muted-foreground mr-1.5' />
												Duration
											</DropdownMenuSubTrigger>

											<DropdownMenuSubContent className='min-w-52 mb-1'>
												<DropdownMenuLabel>Status</DropdownMenuLabel>

												<DropdownMenuItem>
													<CheckCircle2 className='w-4 h-4 fill-green-500 stroke-primary-foreground mr-1.5' />
													Available
												</DropdownMenuItem>

												<DropdownMenuLabel>Reset status after</DropdownMenuLabel>

												<DropdownMenuRadioGroup>
													<DropdownMenuRadioItem value='thirty'>30 minutes</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='hour'>1 hour</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='twoHour'>2 hour</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='today'>Today</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='thisWeek'>This week</DropdownMenuRadioItem>
												</DropdownMenuRadioGroup>
											</DropdownMenuSubContent>
										</DropdownMenuSub>
									</DropdownMenuContent>
								</DropdownMenu>

								<DropdownMenu>
									<DropdownMenuTrigger className='relative w-full flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
										<MapPin className='w-4 h-4 mr-1.5' />
										Set work location
										<ChevronRight className='ml-auto w-4 h-4' />
									</DropdownMenuTrigger>

									<DropdownMenuContent side='right' className='min-w-52 mb-2'>
										<DropdownMenuLabel>For today</DropdownMenuLabel>
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<Building className='w-4 h-4 mr-1.5' /> Office
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Home className='w-4 h-4 mr-1.5' /> Remote
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div> */}
				</section>
			</PopoverContent>
		</Popover>
	);
};

export default UserInfo;
