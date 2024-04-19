'use client';
import { Input, InputProps } from '@/components/ui/input';
import { updateBlock } from '@/lib/supabase/update';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import React, { forwardRef, useRef, useState, useTransition } from 'react';
import { BlockState } from './block-list';
import { createBlock } from '@/lib/supabase/create';
import BlockInlineActions from './block-inline-actions';
import { Textarea } from '@/components/ui/textarea';

interface Props extends InputProps {
	block: Block;
	isTemp: boolean;
	isLast: boolean;
	mutate: (action: BlockState) => void;
}

const BlockItem = ({ block, isTemp, isLast, mutate }: Props) => {
	const [isPending, startTransition] = useTransition();
	const [isTargeted, setIsTargeted] = useState<boolean>(false);

	const handleKeyDown = (e: React.KeyboardEventHandler<HTMLTextAreaElement>) => {
		if (e.currentTarget.value === 'Enter' && isLast) {
			startTransition(async () => {
				const newBlock: BlockInsert = block;
				mutate({ newBlock, pending: true });
				delete newBlock['id'];
				await createBlock(newBlock);
			});
			e.currentTarget.value = '';
		} else if (e.currentTarget.value === 'Enter' && !isLast) {
			startTransition(async () => {
				const updatedBlock = { ...block, text: e.currentTarget.value };
				mutate({ updatedBlock, pending: true });
				await updateBlock(block.id, updatedBlock);
			});
		}
	};

	const handleBlur = (e: React.FocusEventHandler<HTMLTextAreaElement>) => {
		if (e.currentTarget.value !== block.text && isLast) {
			startTransition(async () => {
				const newBlock: BlockInsert = { ...block, text: e.currentTarget.value };
				mutate({ newBlock, pending: true });
				delete newBlock['id'];
				await createBlock(newBlock);
			});
			e.currentTarget.value = '';
		} else if (e.currentTarget.value !== block.text && !isLast) {
			startTransition(async () => {
				const updatedBlock = { ...block, text: e.currentTarget.value };
				mutate({ updatedBlock, pending: true });
				await updateBlock(block.id, updatedBlock);
			});
		}
		setIsTargeted(false);
	};

	return (
		<div className='relative'>
			<div
				className={cn(
					'opacity-0 hover:opacity-100 hover:bg-muted/50 hover:cursor-pointer py-1 px-0.5 rounded-md absolute -left-12 top-1 transition-all',
					isTargeted && 'opacity-100',
					isLast && 'opacity-100'
				)}
			>
				<PlusIcon className='h-4 w-4 ' />
			</div>

			<div
				className={cn(
					'opacity-0 hover:opacity-100 hover:bg-muted/50 hover:cursor-pointer py-1 px-0.5 rounded-md absolute -left-8 top-1 transition-all',
					isTargeted && 'opacity-100',
					isLast && 'opacity-100'
				)}
			>
				<BlockInlineActions block={block} mutate={mutate} />
			</div>

			<Textarea
				defaultValue={block.text}
				placeholder="Write something or press 'space' for AI, '/' for commands..."
				className={cn(
					'border-none shadow-none focus-visible:ring-0 px-0',
					block.type === 'heading_1' && 'text-2xl font-semibold mb-2',
					block.type === 'heading_2' && 'text-xl font-semibold mb-2',
					block.type === 'heading_3' && 'text-lg font-semibold',
					block.type === 'heading_4' && 'text-base font-semibold'
				)}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				onFocus={(e) => {
					setIsTargeted(true);
				}}
			/>
		</div>
	);
};

export default BlockItem;
