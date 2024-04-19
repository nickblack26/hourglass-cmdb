'use client';

import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<div
			className='absolute z-50 bg-primary/10 top-0 right-0 bottom-0 h-full left-0 w-full flex flex-col p-6 overflow-hidden'
			// style={{ width: 'calc(100vw - 256px)' }}
		>
			<div className='flex-1 overflow-hidden'>{children}</div>
		</div>
	);
}
