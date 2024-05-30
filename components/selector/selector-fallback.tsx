import React from 'react';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
	placeholder: string;
};

const SelectorFallback = ({ placeholder }: Props) => {
	return (
		<Select disabled>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
		</Select>
	);
};

export default SelectorFallback;
