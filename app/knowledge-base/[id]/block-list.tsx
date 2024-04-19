'use client';
import React, { useOptimistic, useRef, useTransition } from 'react';
import { v4 as uuid } from 'uuid';
import BlockItem from './block-item';

export type BlockState = {
	newBlocks?: BlockInsert[];
	newBlock?: BlockInsert;
	updatedBlock?: Block;
	updatedBlocks?: Block[];
	deletedBlock?: string;
	pending: boolean;
};

const BlockList = ({ id, blocks }: { id: string; blocks: Block[] }) => {
	const blockStub: Block = {
		id: uuid(),
		text: '',
		page: id,
		annotations: {},
		type: 'paragraph',
		sibling: null,
		created_at: new Date().toISOString(),
	};

	const [state, mutate] = useOptimistic({ blocks, pending: false }, (state, newState: BlockState) => {
		if (newState.newBlock) {
			return {
				blocks: [...state.blocks, newState.newBlock] as Block[],
				pending: newState.pending,
			};
		} else if (newState.newBlocks) {
			return {
				blocks: newState.newBlocks as Block[],
				pending: newState.pending,
			};
		} else if (newState.updatedBlock) {
			return {
				blocks: [...state.blocks.filter((f) => f.id !== newState.updatedBlock!.id), newState.updatedBlock] as Block[],
				pending: newState.pending,
			};
		} else if (newState.updatedBlocks) {
			return {
				blocks: newState.updatedBlocks,
				pending: newState.pending,
			};
		} else {
			return {
				blocks: [...state.blocks.filter((f) => f.id !== newState.deletedBlock)] as Block[],
				pending: newState.pending,
			};
		}
	});

	return (
		<>
			{state.blocks.map((block, index) => (
				<BlockItem key={block.id} block={block} isTemp={block.id !== null} isLast={false} mutate={mutate} />
			))}
			<BlockItem
				block={{ ...blockStub, sibling: state.blocks.length ? state.blocks[state.blocks.length - 1].id : null }}
				isTemp
				isLast
				mutate={mutate}
			/>
		</>
	);
};

export default BlockList;
