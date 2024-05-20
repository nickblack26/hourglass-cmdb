'use client';

import { ChartData } from '@/app/(organization)/charts/ticket-by-first-reply';
import React from 'react';
import { Bar, BarChart as RBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
	data: ChartData[];
	className?: string;
}

const BarChart = ({ data, className }: Props) => {
	return (
		<ResponsiveContainer width='100%' height={350} className={className}>
			<RBarChart data={data}>
				<XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
				<YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
				<Bar dataKey='total' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-primary' />
			</RBarChart>
		</ResponsiveContainer>
	);
};

export default BarChart;
