import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
	title: string;
	description?: string | ReactNode;
	header?: boolean;
	children?: ReactNode;
	className?: string;
};

const SettingsSection = ({ children, title, header = false, description, className }: Props) => {
	return (
		<section className={cn('space-y-6 px-0', className)}>
			<div className='space-y-1.5'>
				{children === undefined ? <h1>{title}</h1> : <h4 className='font-medium'>{title}</h4>}

				{description && <p className='text-sm text-muted-foreground font-medium'>{description}</p>}
			</div>

			{children && <div className='space-y-6'>{children}</div>}
		</section>
	);
};

export default SettingsSection;
