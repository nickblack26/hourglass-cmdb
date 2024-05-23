'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ComboBoxItem = {
	label: string | React.ReactNode;
	value: string;
};

type Props = {
	items: ComboBoxItem[];
	placeholder: string;
	children?: React.ReactNode;
};

export function Combobox({ items, placeholder, children }: Props) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{children === undefined ? (
					<Button variant='outline' role='combobox' aria-expanded={open} className='justify-between'>
						{value ? items.find((item) => item.value === value)?.label : placeholder}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				) : (
					children
				)}
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandList>
						{items.map((item) => (
							<CommandItem
								key={item.value}
								value={item.value}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? '' : currentValue);
									setOpen(false);
								}}
							>
								<Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
								{item.label}
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
