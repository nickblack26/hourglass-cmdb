import PieChart from '@/components/pie-chart';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

const data = [
	{ name: '0-1 Hours', value: 81 },
	{ name: '1-8 Hours', value: 9 },
	{ name: '8-24 Hours', value: 4 },
	{ name: '>24 Hours', value: 4 },
	{ name: 'No replies', value: 2 },
];

const COLORS = ['#4AA0FF', '#7B4DDB', '#649E5B', '#F6C360', '#B4B7BB'];

export async function TicketByChannel({ className }: { className?: string }) {
	const supabase = createClient();
	const { data, error } = await supabase.from('ticket_source_summary').select();

	if (!data || error) {
		return <div></div>;
	}

	return (
		<PieChart
			data={data.map((d) => {
				return { name: d.source_name ?? '', value: d.ticket_count ?? 0 };
			})}
		/>
		// <ResponsiveContainer width='100%' height={350} className={cn('flex', className)}>
		// 	<PieChart className='flex'>
		// 		<Pie
		// 			dataKey='value'
		// 			startAngle={180}
		// 			endAngle={0}
		// 			data={data}
		// 			cx='50%'
		// 			cy='50%'
		// 			innerRadius={110}
		// 			outerRadius={150}
		// 			fill='#8884d8'
		// 			activeShape={({ cx, cy, fill, payload }: PieSectorDataItem): React.JSX.Element => (
		// 				/* console.log(payload);*/ <g>
		// 					<text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
		// 						{payload && payload.name}
		// 					</text>
		// 				</g>
		// 			)}
		// 		>
		// 			{data.map((entry, index) => (
		// 				<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className='rounded-sm' />
		// 			))}
		// 		</Pie>
		// 	</PieChart>
		// </ResponsiveContainer>
	);
}
