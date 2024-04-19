'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Icon, icons } from '@/lib/data';

export function IconSelector() {
	const [open, setOpen] = React.useState(false);
	const [selectedIcon, setSelectedIcon] = React.useState<Icon | null>(null);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='w-full justify-start'>
					{selectedIcon ? (
						<>
							<selectedIcon.icon className='mr-2 h-4 w-4 shrink-0' />
							{selectedIcon.label}
						</>
					) : (
						<>+ Set icon</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0' side='right' align='start'>
				<Command>
					<CommandInput placeholder='Filter icons...' autoFocus={true} />
					<CommandList>
						<CommandEmpty>No label found.</CommandEmpty>
						<CommandGroup>
							{icons.map((icon) => (
								<CommandItem
									key={icon.value}
									value={icon.value}
									onSelect={(value) => {
										setSelectedIcon(icons.find((priority) => priority.value === value) || null);
										setOpen(false);
									}}
								>
									<icon.icon className={cn('mr-2 h-4 w-4', icon.value === selectedIcon?.value ? 'opacity-100' : 'opacity-40')} />
									<span>{icon.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
