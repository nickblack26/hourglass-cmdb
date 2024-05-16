import React from 'react';
import { Label } from './ui/label';
import { Input, InputProps } from './ui/input';

interface Props extends InputProps {
	label?: string;
	description?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, Props>(({ className, type, description, label, ...props }, ref) => {
	return (
		<div className='grid gap-1.5'>
			{label && (
				<Label htmlFor={props.name || props.id}>
					{label}
					{props.required && <span className='text-red-500'>*</span>}
				</Label>
			)}
			<Input ref={ref} {...props} />
			{description && <p className='text-[0.8rem] text-muted-foreground'>{description}</p>}
		</div>
	);
});

LabeledInput.displayName = 'LabeledInput';

export default LabeledInput;
