import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type Props = {
	avatars: Array<{ src?: string; fallback: string }>;
};

const AvatarGroup = ({ avatars }: Props) => {
	return (
		<div className='flex -space-x-3 *:ring *:ring-background'>
			{avatars.map(({ fallback, src }, index) => (
				<Avatar key={index}>
					<AvatarImage src={src}></AvatarImage>
					<AvatarFallback>{fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
};

export default AvatarGroup;
