'use server';
import React, { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { ObjectId } from 'mongodb';
import { IDPageProps } from '@/types/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import GeneratedQrCode from 'react-qr-code';
import { ChevronLeft, PlusCircle, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import SystemStatus from './system-status';
import { getDocument } from '@/lib/mongodb/read';

const Page = async ({ params }: IDPageProps) => {
	const configuration = await getDocument<Asset>('assets', { _id: new ObjectId(params.id) });

	if (!configuration) return notFound();

	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8'>
			<div className='grid flex-1 auto-rows-max gap-4'>
				<div className='flex items-center gap-4'>
					<Button
						variant='outline'
						size='icon'
						className='h-7 w-7'
						asChild
					>
						<Link href='/configurations'>
							<ChevronLeft className='h-4 w-4' />
							<span className='sr-only'>Back</span>
						</Link>
					</Button>

					<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
						{configuration.name}
					</h1>

					<Badge
						variant='outline'
						className='ml-auto sm:ml-0'
					>
						In stock
					</Badge>

					<div className='hidden items-center gap-2 md:ml-auto md:flex'>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant='ghost'>
									<QrCode className='w-4 h-4' />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<div style={{ background: 'white', padding: '16px' }}>
									<GeneratedQrCode
										size={300}
										className='max-w-[300px] max-h-[300px] w-full h-full'
										viewBox={`0 0 300 300`}
										value={`http://localhost:3000/asset/${params.id}`}
									/>
								</div>
							</DialogContent>
						</Dialog>

						<Button
							variant='outline'
							size='sm'
						>
							Discard
						</Button>

						<Button size='sm'>Save Product</Button>
					</div>
				</div>

				<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
					<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
						{/* <ConfigurationDetailForm configuration={configuration} /> */}

						<Card>
							<CardHeader>
								<CardTitle>Stock</CardTitle>

								<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
							</CardHeader>

							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className='w-[100px]'>SKU</TableHead>
											<TableHead>Stock</TableHead>
											<TableHead>Price</TableHead>
											<TableHead className='w-[100px]'>Size</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell className='font-semibold'>GGPC-001</TableCell>
											<TableCell>
												<Label
													htmlFor='stock-1'
													className='sr-only'
												>
													Stock
												</Label>
												<Input
													id='stock-1'
													type='number'
													defaultValue='100'
												/>
											</TableCell>
											<TableCell>
												<Label
													htmlFor='price-1'
													className='sr-only'
												>
													Price
												</Label>
												<Input
													id='price-1'
													type='number'
													defaultValue='99.99'
												/>
											</TableCell>
											<TableCell>
												<ToggleGroup
													type='single'
													defaultValue='s'
													variant='outline'
												>
													<ToggleGroupItem value='s'>S</ToggleGroupItem>
													<ToggleGroupItem value='m'>M</ToggleGroupItem>
													<ToggleGroupItem value='l'>L</ToggleGroupItem>
												</ToggleGroup>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className='font-semibold'>GGPC-002</TableCell>
											<TableCell>
												<Label
													htmlFor='stock-2'
													className='sr-only'
												>
													Stock
												</Label>
												<Input
													id='stock-2'
													type='number'
													defaultValue='143'
												/>
											</TableCell>
											<TableCell>
												<Label
													htmlFor='price-2'
													className='sr-only'
												>
													Price
												</Label>
												<Input
													id='price-2'
													type='number'
													defaultValue='99.99'
												/>
											</TableCell>
											<TableCell>
												<ToggleGroup
													type='single'
													defaultValue='m'
													variant='outline'
												>
													<ToggleGroupItem value='s'>S</ToggleGroupItem>
													<ToggleGroupItem value='m'>M</ToggleGroupItem>
													<ToggleGroupItem value='l'>L</ToggleGroupItem>
												</ToggleGroup>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className='font-semibold'>GGPC-003</TableCell>
											<TableCell>
												<Label
													htmlFor='stock-3'
													className='sr-only'
												>
													Stock
												</Label>
												<Input
													id='stock-3'
													type='number'
													defaultValue='32'
												/>
											</TableCell>
											<TableCell>
												<Label
													htmlFor='price-3'
													className='sr-only'
												>
													Stock
												</Label>
												<Input
													id='price-3'
													type='number'
													defaultValue='99.99'
												/>
											</TableCell>
											<TableCell>
												<ToggleGroup
													type='single'
													defaultValue='s'
													variant='outline'
												>
													<ToggleGroupItem value='s'>S</ToggleGroupItem>
													<ToggleGroupItem value='m'>M</ToggleGroupItem>
													<ToggleGroupItem value='l'>L</ToggleGroupItem>
												</ToggleGroup>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>

							<CardFooter className='justify-center border-t p-4'>
								<Button
									size='sm'
									variant='ghost'
									className='gap-1'
								>
									<PlusCircle className=' w-3.5' />
									Add Variant
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Product Category</CardTitle>
							</CardHeader>

							<CardContent>
								<div className='grid gap-6 sm:grid-cols-3'>
									<div className='grid gap-3'>
										<Label htmlFor='category'>Category</Label>

										<Suspense
											fallback={
												<Select disabled>
													<SelectTrigger>
														<SelectValue placeholder='Select type' />
													</SelectTrigger>
												</Select>
											}
										>
											{/* <TypeSelector defaultValue={configuration?.type ?? undefined} /> */}
										</Suspense>
									</div>

									<div className='grid gap-3'>
										<Label htmlFor='subcategory'>Subcategory (optional)</Label>

										<Suspense
											fallback={
												<Select disabled>
													<SelectTrigger>
														<SelectValue placeholder='Select type' />
													</SelectTrigger>
												</Select>
											}
										>
											{/* <SubTypeSelector /> */}
										</Suspense>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
						<Card>
							<form
								id='status'
								name='status'
								action={async (data: FormData) => {
									'use server';
									const status = parseInt(data.get('status') as string);
									// await updateConfiguration(configuration._id.toString(), { status });
								}}
							>
								<CardHeader>
									<CardTitle>Product Status</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='grid gap-6'>
										<div className='grid gap-3'>
											<Label htmlFor='status'>Status</Label>
											<Suspense
												fallback={
													<Select disabled>
														<SelectTrigger>
															<SelectValue placeholder='Select status' />
														</SelectTrigger>
													</Select>
												}
											>
												{/* <StatusSelector defaultValue={configuration.status?.toString()} /> */}
											</Suspense>
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<Button form='status'>Save</Button>
								</CardFooter>
							</form>
						</Card>

						<SystemStatus />

						<Card className='overflow-hidden'>
							<CardHeader>
								<CardTitle>Product Images</CardTitle>

								<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
							</CardHeader>

							<CardContent>
								<Image
									alt='Product image'
									className='aspect-square w-full rounded-md object-cover'
									height='300'
									src='/asset-tag.png'
									width='300'
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Archive Product</CardTitle>

								<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
							</CardHeader>

							<CardContent>
								<div></div>

								<Button
									size='sm'
									variant='secondary'
								>
									Archive Product
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className='flex items-center justify-center gap-2 md:hidden'>
					<Button
						variant='outline'
						size='sm'
					>
						Discard
					</Button>
					<Button size='sm'>Save Product</Button>
				</div>
			</div>
		</main>
	);
};

export default Page;
