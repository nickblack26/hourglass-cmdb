import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cable, Cpu, HardDrive, Laptop, LucideIcon, MemoryStick, PcCase, Phone, PlusCircle, Printer, Router, Server } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconSelector } from './icon-selector';

interface Icon {
	name: string;
	value: string;
	icon: LucideIcon;
}

export default async function Page() {
	const supabase = createClient();

	const { data: types, error } = await supabase.from('assetTypes').select();

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
			<Card>
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
								{/* <TableHead className='w-[100px]'>Size</TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{types?.map((type) => (
								<TableRow key={type.id}>
									{/* <TableCell className='font-semibold'>GGPC-001</TableCell> */}
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
						<PlusCircle className='h-3.5 w-3.5' />
						Add Type
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
