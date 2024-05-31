'use server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Cable,
	Cpu,
	HardDrive,
	Laptop,
	ListFilterIcon,
	LucideIcon,
	MemoryStick,
	PcCase,
	Phone,
	Printer,
	Router,
	Server,
} from 'lucide-react';
import { IconSelector } from './icon-selector';
import SettingsSection from '../settings-section';
import { Separator } from '@/components/ui/separator';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import TypeItem from './type-item';
import LabeledInput from '@/components/labled-input';
import { createAssetType } from '@/lib/supabase/create';
import SubmitButton from '@/components/submit-button';
import { Suspense } from 'react';
import SelectorFallback from '@/components/selector/selector-fallback';
import TypeSelector from '@/components/selector/type-selector';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Icon {
	name: string;
	value: string;
	icon: LucideIcon;
}

export default async function Page() {
	const db = await createClient();

	const [types, organization] = await Promise.all([
		db
			.collection('assetTypes')
			.find<AssetType>({ organization: new ObjectId('665888e02684136c5e529eb4') })
			.toArray(),
		db.collection('organizations').findOne<Organization>({ _id: new ObjectId('665888e02684136c5e529eb4') }),
	]);

	const icons: Icon[] = [
		{ name: 'Phone', value: 'phone', icon: Phone },
		{ name: 'Laptop', value: 'laptop', icon: Laptop },
		{ name: 'Printer', value: 'printer', icon: Printer },
		{ name: 'Server', value: 'server', icon: Server },
		{ name: 'Router', value: 'router', icon: Router },
		{ name: 'Cable', value: 'cable', icon: Cable },
		{ name: 'CPU', value: 'cpu', icon: Cpu },
		{ name: 'Hard Drive', value: 'hard-drive', icon: HardDrive },
		{ name: 'Memory Stick', value: 'memory-stick', icon: MemoryStick },
		{ name: 'PC Case', value: 'pc-case', icon: PcCase },
	];

	return (
		<div className='grid gap-6'>
			<SettingsSection
				title='Workspace Types'
				description='Manage workspace types'
			/>

			<Separator />

			<SettingsSection
				title=''
				description='Use labels and label groups to help organize and filter issues in your workspace. Labels created in this section are available for all teams to use. To create labels or label groups that only apply to certain teams, add them in the team-specific label settings.'
			>
				<div className='flex items-center justify-between gap-1.5'>
					<div className='flex items-center gap-1.5'>
						<Input
							placeholder='Filter by name...'
							className='max-w-72 h-8 w-full'
						/>
						<Button variant='outline'>
							<ListFilterIcon className=' h-3.5 mr-1.5' /> Filters
						</Button>
					</div>

					<div className='flex items-center gap-1.5'>
						<Button variant='outline'>New group</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button>New type</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>New type</DialogTitle>
								</DialogHeader>

								<form
									action={createAssetType}
									className='space-y-3'
								>
									<Input
										name='organization'
										defaultValue={organization?.id}
										className='hidden'
									/>

									<LabeledInput
										name='name'
										placeholder='Type name'
										label='Name'
										required
									/>

									<LabeledInput
										name='icon'
										placeholder='icon'
										label='Icon'
										required
									>
										<IconSelector />
									</LabeledInput>

									<LabeledInput
										name='type'
										label='Type'
										required
									>
										<Suspense fallback={<SelectorFallback placeholder='Select a type...' />}>
											<TypeSelector />
										</Suspense>
									</LabeledInput>

									<DialogFooter>
										<DialogClose asChild>
											<Button
												type='button'
												variant='secondary'
											>
												Cancel
											</Button>
										</DialogClose>

										<SubmitButton>Save</SubmitButton>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<div className='space-y-1.5'>
					{types?.map((type) => (
						<TypeItem
							key={type.id}
							type={type}
						/>
					))}
				</div>
			</SettingsSection>

			{/* <Card>
				<CardHeader>
					<CardTitle>Stock</CardTitle>
					<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Icon</TableHead>
								<TableHead className='w-[100px]'>Size</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{types?.map((type) => (
								<TableRow key={type.id}>
									<TableCell className='font-semibold'>GGPC-001</TableCell>
									<TableCell>
										<Label htmlFor='name' className='sr-only'>
											Name
										</Label>
										<Input name='name' defaultValue={type.name} />
									</TableCell>

									<TableCell>
										<IconSelector />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className='justify-center border-t p-4'>
					<Button size='sm' variant='ghost' className='gap-1'>
						<PlusCircle className=' w-3.5' />
						Add Type
					</Button>
				</CardFooter>
			</Card> */}
		</div>
	);
}
