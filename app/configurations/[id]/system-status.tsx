import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, Info, Laptop, Settings } from 'lucide-react';
import React from 'react';

type Props = {};

const SystemStatus = (props: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Panel Status</CardTitle>
			</CardHeader>

			<CardContent className='space-y-3'>
				<div className='bg-accent/75 rounded-lg p-3 space-y-3'>
					<div className='flex items-center gap-3'>
						<Avatar>
							<AvatarFallback>
								<Laptop />
							</AvatarFallback>
						</Avatar>

						<div>
							<h4>MacOS Catalina</h4>

							<p className='text-muted-foreground text-sm'>
								Version 10.15 <Info className='inline-block h-4 w-4 stroke-white fill-red-500' />
							</p>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className='ml-auto'>
									About <ChevronDown className='w-3 h-3' />
								</Button>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</div>

					<Separator />

					<div className='grid grid-cols-2 gap-3'>
						<div>
							<Label className='text-xs'>Processor</Label>
							<p className='font-semibold text-sm'>2.9GHz Intel Core i9</p>
						</div>

						<div>
							<Label className='text-xs'>Memory</Label>
							<p className='font-semibold text-sm'>8GB 3200MHz LPDDR5</p>
						</div>

						<div>
							<Label className='text-xs'>Startup Disk</Label>
							<p className='font-semibold text-sm'>System 7</p>
						</div>

						<div>
							<Label className='text-xs'>Serial Number</Label>
							<p className='font-semibold text-sm'>X2TW7DDQMX</p>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-[2fr_1fr] gap-3'>
					<div className='bg-accent/75 p-3 rounded-lg space-y-3'>
						<div>
							<h1>
								72<span className='text-xs text-muted-foreground'>%</span>
							</h1>
							<p className='text-xs text-muted-foreground'>Remaining Battery</p>
						</div>

						<Slider disabled defaultValue={[72]} max={100} step={1} />

						<p className='text-sm'>High Performance</p>
					</div>

					<div className='bg-accent/75 p-3 rounded-lg space-y-1.5'>
						<Avatar>
							<AvatarFallback>
								<Settings />
							</AvatarFallback>
						</Avatar>

						<h4 className='font-semibold'>macOS Catalina</h4>

						<span className='text-xs font-medium text-muted-foreground'>10.15 • 12.18GB</span>

						<Button size='sm' className='w-full'>
							Upgrade Now
						</Button>
					</div>
				</div>

				<div className='bg-accent/75 p-3 rounded-lg space-y-3'>
					<div className='flex items-center justify-between'>
						<h1>
							5.32<span className='text-xs text-muted-foreground'>GB</span>
						</h1>

						<Button>Release</Button>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<div className='space-y-1.5'>
							{/* @ts-ignore */}
							<Progress value={60} fill='bg-yellow-500' />
							<div className='flex items-center justify-between text-xs'>
								<p className='text-muted-foreground'>Physical Memory</p>
								<p className=''>165GB</p>
							</div>
						</div>

						<div className='space-y-1.5'>
							{/* @ts-ignore */}
							<Progress value={80} fill='bg-orange-500' />
							<div className='flex items-center justify-between text-xs'>
								<p className='text-muted-foreground'>Pressure</p>
								<p className=''>82%</p>
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Badge className='rounded-full'>Figma</Badge>

						<Badge className='rounded-full'>Microsoft Teams</Badge>

						<Badge className='rounded-full'>Spotify</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default SystemStatus;
