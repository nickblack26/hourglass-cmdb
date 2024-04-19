'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';

const GoBack = () => {
	const router = useRouter();
	return (
		<Button
			variant='ghost'
			onClick={() => {
				router.back();
			}}
		>
			<XIcon className='w-4 h-4' />
		</Button>
	);
};

export default GoBack;
