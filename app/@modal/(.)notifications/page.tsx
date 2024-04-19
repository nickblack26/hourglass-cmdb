'use client';
import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckIcon, FilterIcon, Maximize2, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const router = useRouter();

	return (
		<Modal>
			<div className='grid grid-cols-2 justify-items-stretch h-full'>
				<Card className={cn('bg-background rounded-lg h-full', isExpanded && 'col-span-2')}>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-xl'>Notifications</CardTitle>
						<div className='space-x-1.5'>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => {
									setIsExpanded(!isExpanded);
								}}
							>
								<Maximize2 className='w-4 h-4' />
							</Button>
							<Button variant='ghost' size='sm' onClick={() => router.back()}>
								<XIcon className='w-4 h-4' />
							</Button>
						</div>
					</CardHeader>
					<CardContent className='space-y-3'>
						<Separator />

						<div className='flex items-center justify-between'>
							<Button variant='ghost' size='sm' className='-ml-3'>
								<FilterIcon className='w-4 h-4 mr-1.5' /> Filter
							</Button>

							<Button variant='outline' size='sm'>
								<CheckIcon className='w-4 h-4 mr-1.5' />
								Mark As Read
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</Modal>
	);
};

export default Page;
