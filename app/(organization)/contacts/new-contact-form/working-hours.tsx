'use client';
import React, { useState } from 'react';
import { workDays as defaultWorkDays } from '@/app/settings/account/hours/data';
import { Switch } from '@/components/ui/switch';
import TimeSelector from '@/components/selector/time-selector';
import { Input } from '@/components/ui/input';
import { Json } from '@/types/supabase';

interface WorkSchedule {
	startTime: string;
	endTime: string;
	closed: boolean;
}

type Props = {
	workSchedule: WorkSchedule[] | undefined;
};

const WorkingHoursForm = ({ workSchedule }: Props) => {
	const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	return (
		<div>
			{workSchedule &&
				workSchedule.map((schedule, index) => {
					return (
						<div
							key={index}
							className='grid grid-cols-3 items-center gap-3 justify-between border-t first:border-t-0 py-2'
						>
							<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
								<Switch defaultChecked={!schedule.closed} />
								<p>{daysOfTheWeek[index]}</p>
							</div>

							{!schedule.closed ? (
								<div className='flex items-center gap-3 text-xs text-muted-foreground col-span-2'>
									<Input
										type='time'
										defaultValue={schedule.startTime}
									/>

									<p>To</p>

									<Input
										type='time'
										defaultValue={schedule.endTime}
									/>
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
