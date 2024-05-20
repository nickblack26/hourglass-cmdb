'use client';
import { ChartData } from '@/app/(organization)/charts/ticket-by-first-reply';
import { cn } from '@/lib/utils';
import React from 'react';
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Props {
	data: ChartData[];
	className?: string;
}

const COLORS = ['#56B675', '#F6C462', '#CBB3FE', '#6854A2', '#DD6F65'];

export default function PieChart({ data, className }: Props) {
	return (
		<ResponsiveContainer width='100%' height={350} className={cn('flex', className)}>
			<RPieChart className='flex '>
				<Pie data={data} cx='50%' cy='50%' labelLine={false} outerRadius={112} fill='#8884d8' dataKey='value'>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend className='grid' />
			</RPieChart>
		</ResponsiveContainer>
	);
}
