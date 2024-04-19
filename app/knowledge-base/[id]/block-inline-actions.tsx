import * as React from 'react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { GitCompareArrows, GripVertical, StarsIcon, Trash2Icon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BlockState } from './block-list';
import { revalidatePath } from 'next/cache';
import { updateBlock } from '@/lib/supabase/update';
import { deleteBlock } from '@/lib/supabase/delete';

const labels = [
	{ label: 'Heading 1', value: 'heading_1' },
	{ label: 'Heading 2', value: 'heading_2' },
	{ label: 'Heading 3', value: 'heading_3' },
	{ label: 'Heading 4', value: 'heading_4' },
	{ label: 'Paragraph', value: 'paragraph' },
];

export default function BlockInlineActions({ block, mutate }: { block: Block; mutate: (action: BlockState) => void }) {
	const [isPending, startTransition] = React.useTransition();
	const [open, setOpen] = React.useState(false);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<GripVertical className='h-4 w-4 ' />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center' side='left' className='w-[200px]'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => {}} className='flex items-center '>
						<StarsIcon className='mr-1.5 h-4 w-4' />
						<span>Ask AI</span>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={() => {}} className='flex items-center '>
						<StarsIcon className='mr-1.5 h-4 w-4' />
						<span>Duplicate</span>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={() => {}} className='flex items-center '>
						<StarsIcon className='mr-1.5 h-4 w-4' />
						<span>Turn into</span>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={() => {}} className='flex items-center '>
						<StarsIcon className='mr-1.5 h-4 w-4' />
						<span>Turn into page in</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<GitCompareArrows className='mr-1.5 h-4 w-4' />
							Turn into
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className='p-0'>
							<Command>
								<CommandInput placeholder='Filter label...' autoFocus={true} />
								<CommandList>
									<CommandEmpty>No label found.</CommandEmpty>
									<CommandGroup>
										{labels.map(({ label, value }) => (
											<CommandItem
												key={label}
												value={value}
												onSelect={(value) => {
													startTransition(async () => {
														setOpen(false);
														mutate({ updatedBlock: { ...block, type: value }, pending: true });
														await updateBlock(block.id, { type: value });
													});
												}}
											>
												{label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className='text-red-600'
						onSelect={() => {
							startTransition(async () => {
								mutate({ deletedBlock: block.id, pending: true });

								await deleteBlock(block.id);
								// revalidatePath('/knowledge-base');
							});
						}}
					>
						<Trash2Icon className='mr-1.5 h-4 w-4' />
						Delete
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
