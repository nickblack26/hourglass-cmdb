'use client';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDown, Circle, Info, MoreHorizontal, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Props = {
	type: AssetType & { assetTypes?: AssetType[] };
	isGroupMember?: boolean;
};

const TypeItem = ({ type, isGroupMember = false }: Props) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<TooltipProvider>
			<Card className={!!!isGroupMember ? 'rounded-md' : 'rounded-none'}>
				{isEditing ? (
					<div className='flex items-center justify-between gap-1.5 px-3 py-1.5 bg-card group'>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant='outline' className='h-9 w-9'>
									<Circle className='w-2.5 h-2.5 fill-red-500 stroke-red-500' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-96' align='start'>
								<div className='p-24'></div>
							</PopoverContent>
						</Popover>

						<Input placeholder='Type name' name='name' defaultValue={type.name} />

						<Separator orientation='vertical' className='h-9' />

						<Button variant='outline' onClick={() => setIsEditing(false)}>
							Cancel
						</Button>

						<Button>Save</Button>
					</div>
				) : (
					<Collapsible className={isGroupMember ? 'bg-secondary pl-6' : ''}>
						<div className='flex items-center gap-1.5 pl-3'>
							{type?.assetTypes && type.assetTypes.length > 0 && (
								<CollapsibleTrigger>
									<ArrowDown className='w-2.5 h-2.5' />
								</CollapsibleTrigger>
							)}
							<Circle className='w-2.5 h-2.5 fill-red-500 stroke-red-500' />
							<span className='text-sm font-medium'>{type.name}</span>
						</div>

						<div className='flex items-center gap-3 opacity-0 group-hover:opacity-100'>
							<Tooltip>
								<TooltipTrigger>
									<Info className='w-3.5 h-3.5' />
								</TooltipTrigger>
								<TooltipContent>Created on {new Date(type.dateCreated).toDateString()}</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger onClick={() => setIsEditing(!isEditing)}>
									<Pencil className='w-3.5 h-3.5' />
								</TooltipTrigger>

								<TooltipContent>Edit type</TooltipContent>
							</Tooltip>

							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreHorizontal className='w-3.5 h-3.5' />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuGroup>
										<DropdownMenuItem>Convert to group</DropdownMenuItem>
										<DropdownMenuSub>
											<DropdownMenuSubTrigger>Move to group</DropdownMenuSubTrigger>
											<DropdownMenuSubContent>
												<DropdownMenuItem>Group 1</DropdownMenuItem>
												<DropdownMenuItem>Group 2</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuSub>
									</DropdownMenuGroup>

									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<DropdownMenuItem>Edit label...</DropdownMenuItem>
										<DropdownMenuItem>Open queue page</DropdownMenuItem>
									</DropdownMenuGroup>

									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<DropdownMenuItem>Delete label...</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<CollapsibleContent>
							{type?.assetTypes?.map((t) => (
								<TypeItem key={t.id} type={t} isGroupMember />
							))}
						</CollapsibleContent>
					</Collapsible>
				)}
			</Card>
		</TooltipProvider>
	);
};

export default TypeItem;
