'use client';
import React, { act, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ActivityInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/activity';

type Props = {
	onValueChange?: (...event: any[]) => void;
	defaultValue?: string;
	className?: string;
};

const ActivitySelector = ({ onValueChange, defaultValue, className }: Props) => {
	const [activities, setActivities] = useState<ActivityInstance[]>([]);

	useEffect(() => {
		const headers = new Headers();
		headers.append('authToken', '927970c354916b481735c0d2d3d46591' ?? '');
		fetch(`http://localhost:3000/api/twilio/1/workspace/$1/activities`, { headers, next: { tags: ['queues'] } })
			.then((r) => r.json())
			.then((d) => setActivities(d))
			.catch((e) => console.error(e));
	}, []);

	if (activities === null) {
		return <div></div>;
	}

	const selectedActivity = activities?.find((activity) => activity.sid === defaultValue);

	return (
		<Select name='activity' onValueChange={onValueChange} defaultValue={defaultValue ?? undefined}>
			<SelectTrigger aria-label='Select activity' className={className}>
				<SelectValue placeholder='Select activity...'>
					{selectedActivity && <span className={cn('ml-1.5')}>{selectedActivity?.friendlyName}</span>}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{activities?.map((activity) => (
					<SelectItem key={activity.sid} value={activity.sid}>
						{activity.friendlyName}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default ActivitySelector;
