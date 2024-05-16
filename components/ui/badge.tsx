import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-3.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
				outline: 'text-foreground',
				blue: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900 dark:text-blue-300',
				gray: 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-900 dark:text-gray-300',
				red: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900 dark:text-red-300',
				green: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900 dark:text-green-300',
				yellow: 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-900 dark:text-yellow-300',
				indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-900 dark:text-indigo-300',
				purple: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900 dark:text-purple-300',
				pink: 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-700/10 dark:bg-pink-900 dark:text-pink-300',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
