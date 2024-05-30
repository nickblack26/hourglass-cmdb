import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronDown, Plus, SlidersHorizontal } from 'lucide-react';
import React, { ReactNode, Suspense } from 'react';
import Metric from '@/components/Metric';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpiredWarranties from './expired-warranties';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Combobox } from '@/components/combobox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/server';
import AssetForm from '@/components/forms/asset-form';
import SubmitButton from '@/components/submit-button';

type Props = {
	children: ReactNode;
	params?: { id: string };
};

const AssetLayout = async ({ children, params }: Props) => {
	const supabase = createClient();

	const { data: assetTypes } = await supabase
		.from('assetTypes')
		.select('id, name, assetTypes(id, name)')
		.is('parent', null)
		.order('name')
		.returns<{ id: string; name: string; assetTypes: AssetType[] }[]>();

	return (
		<main>
			<header>
				<div className='flex items-center gap-1.5 grow'>
					<h1 className='text-sm text-primary'>Assets</h1>

					<div className='flex items-center gap-1.5 grow overflow-x-scroll'>
						{assetTypes?.map((type) => {
							const href = `/assets/${type.id}`;
							const isCurrent = href === `/assets/${params?.id}`;
							console.log(isCurrent, href, params?.id);

							return (
								<>
									{type.assetTypes.length ? (
										<DropdownMenu key={type.id}>
											<DropdownMenuTrigger>
												<Badge variant={isCurrent ? 'secondary' : 'outline'}>
													<span>{type.name}</span>

													<ChevronDown className='w-3 h-3 ml-1.5' />
												</Badge>
											</DropdownMenuTrigger>

											<DropdownMenuContent
												align='start'
												className='w-52'
											>
												{type.assetTypes.map((t) => {
													const secondHref = `/assets/${t.id}`;
													const isAlsoCurrent = secondHref === `/assets/${params?.id}`;

													return (
														<DropdownMenuItem
															key={t.id}
															asChild
														>
															<Link
																key={t.id}
																href={secondHref}
																className='flex items-center justify-between'
															>
																<span>{t.name}</span>
																{isAlsoCurrent && <Check />}
															</Link>
														</DropdownMenuItem>
													);
												})}
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<Link
											key={type.id}
											href={href}
										>
											<Badge variant={isCurrent ? 'secondary' : 'outline'}>{type.name}</Badge>
										</Link>
									)}
								</>
							);
						})}
					</div>
				</div>

				<div className='flex items-center gap-3 col-span-2 justify-self-end items'>
					<Combobox
						items={[]}
						placeholder='Filter...'
					>
						<Badge variant='outline'>
							<SlidersHorizontal className='mr-1.5' />
							Display
						</Badge>
					</Combobox>

					<Dialog>
						<DialogTrigger>
							<Badge variant='outline'>
								<Plus className='mr-1.5' />
								New Asset
							</Badge>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create Asset</DialogTitle>
							</DialogHeader>

							<AssetForm assetType={params?.id}>
								<DialogFooter>
									<SubmitButton>Create</SubmitButton>
								</DialogFooter>
							</AssetForm>
						</DialogContent>
					</Dialog>
				</div>
			</header>

			<Separator />

			<section className='grid grid-cols-4 p-0'>
				<Suspense fallback={<div>Loading...</div>}>
					<ExpiredWarranties />
				</Suspense>

				<Metric
					isDraggingEnabled
					title='Warranty Expires'
					amount='1'
					timeline='In the next month'
				/>
				<Metric
					isDraggingEnabled
					title='Warranty Expires'
					amount='1'
					timeline='In the next month'
				/>
				<Metric
					isDraggingEnabled
					title='Warranty Expires'
					amount='1'
					timeline='In the next month'
				/>
			</section>

			<Separator />

			{children}
		</main>
	);
};

export default AssetLayout;
