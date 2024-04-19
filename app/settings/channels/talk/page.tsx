import React from 'react';
import StatusBadge from '@/components/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Briefcase, Phone } from 'lucide-react';

type Props = {};

const Page = (props: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Port existing number</CardTitle>
				<CardDescription>Complete these three simple steps to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex gap-3'>
					<Checkbox className='mt-1' />

					<div>
						<p>
							Phone number <StatusBadge color='green' text='Completed' />
						</p>
						<p className='text-muted-foreground'>Existing phone number information</p>

						<Card>
							<CardContent className='space-y-1.5 p-3'>
								<div className='grid grid-cols-2 gap-3'>
									<div className='flex items-center gap-1.5'>
										<Phone className='h-3.5 w-3.5' />
										<p>Type</p>
									</div>

									<div>🇺🇸 US number</div>
								</div>

								<div className='grid grid-cols-2 gap-3'>
									<div className='flex items-center gap-1.5'>
										<Briefcase className='h-3.5 w-3.5' />
										<p>Carrier</p>
									</div>

									<div>AT&T</div>
								</div>

								<div className='grid grid-cols-2 gap-3'>
									<div className='flex items-center gap-1.5'>
										<Phone className='h-3.5 w-3.5' />
										<p>Phone number</p>
									</div>

									<Input placeholder='(555) 555-5555' />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Page;
