import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ColorOption = 'red' | 'yellow' | 'green' | 'blue' | 'gray';

type Props = {
	text: string;
	color: ColorOption;
};

const StatusBadge = ({ text, color = 'gray' }: Props) => {
	return (
		<Badge
			className={cn(
				color === 'gray' && 'bg-gray-100 text-gray-400 hover:bg-gray-200/50',
				color === 'red' && 'bg-red-100 text-red-400 hover:bg-red-200/50',
				color === 'yellow' && 'bg-amber-100 text-amber-400 hover:bg-amber-200/50',
				color === 'green' && 'bg-green-100 text-green-400 hover:bg-green-200/50',
				color === 'blue' && 'bg-blue-100 text-blue-400 hover:bg-blue-200/50'
			)}
		>
			<CircleIcon className='w-2 h-2 mr-1.5' /> {text}
		</Badge>
	);
};

export default StatusBadge;
