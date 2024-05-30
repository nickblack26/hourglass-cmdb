'use client';
import React, { useState } from 'react';
import { workDays as defaultWorkDays } from '@/app/settings/account/hours/data';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import TimeSelector from '@/components/selector/time-selector';

type Props = {};

const WorkingHoursForm = (props: Props) => {
	const [workDays, setWorkDays] = useState(defaultWorkDays);
	return (
		<div>
			{defaultWorkDays
				.sort((a, b) => a.day.id - b.day.id)
				.map((day, index) => (
					<div
						key={day.day.id}
						className='grid grid-cols-3 items-center gap-3 justify-between border-t first:border-t-0 py-2'
					>
						<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
							<Switch
								defaultChecked={day.enabled}
								onCheckedChange={(e) => setWorkDays([...workDays, { ...workDays[index], enabled: e }])}
							/>
							<p>{day.day.name}</p>
						</div>

						{day.enabled ? (
							<div className='flex items-center gap-3 text-xs text-muted-foreground col-span-2'>
								<TimeSelector day={day} />
								<p>To</p>
								<TimeSelector day={day} />
							</div>
						) : (
							<div className='text-xs text-muted-foreground py-2'>Not working today...</div>
						)}
					</div>
				))}
		</div>
	);
};

export default WorkingHoursForm;
