'use client';
import React, { useState } from 'react';
import { workDays as defaultWorkDays } from '@/app/settings/account/hours/data';
import { Switch } from '@/components/ui/switch';
import TimeSelector from '@/components/selector/time-selector';
import { Input } from '@/components/ui/input';
import { Json } from '@/types/supabase';

type Props = {
	workSchedule: Json | undefined;
};

const WorkingHoursForm = ({ workSchedule }: Props) => {
	const [workDays, setWorkDays] = useState(defaultWorkDays);
	const sorter = {
		sunday: 0, // << if sunday is first day of week
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
		// sunday: 7,
	};

	// @ts-ignore
	const sortedSchedule = Object.entries(workSchedule)?.sort(function sortByDay(a: any, b: any) {
		let day1 = a[0].toLowerCase();
		let day2 = b[0].toLowerCase();
		// @ts-ignore
		return sorter[day1] - sorter[day2];
	});

	return (
		<div>
			{sortedSchedule &&
				sortedSchedule.map(([key, value]) => {
					const isEnabled = value['closed'] === false || value['open'] !== null || value['close'] !== null;
					return (
						<div
							key={key}
							className='grid grid-cols-3 items-center gap-3 justify-between border-t first:border-t-0 py-2'
						>
							<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
								<Switch defaultChecked={isEnabled} />
								<p>{key}</p>
							</div>

							{isEnabled ? (
								<div className='flex items-center gap-3 text-xs text-muted-foreground col-span-2'>
									{/* <TimeSelector day={day} /> */}
									<Input
										type='time'
										defaultValue={value['open']}
									/>
									<p>To</p>
									<Input
										type='time'
										defaultValue={value['close']}
									/>
									{/* <TimeSelector day={day} /> */}
								</div>
							) : (
								<div className='text-xs text-muted-foreground py-2'>Not working today...</div>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default WorkingHoursForm;
