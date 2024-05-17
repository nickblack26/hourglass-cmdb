'use client';
import React, { act, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTwilio } from '@/providers/twilioVoiceContext';
import { Activity } from '@/types/twilio/taskrouter';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

type Props = {
	onValueChange?: (...event: any[]) => void;
	defaultValue?: string;
	className?: string;
};

const ActivitySelector = ({ onValueChange, defaultValue, className }: Props) => {
	const twilio = useTwilio();
	const [activities, setActivities] = useState<Activity[] | null>([]);

	useEffect(() => {
		const headers = new Headers();
		headers.append('authToken', 'TWILIO AUTH TOKEN');
		fetch('http://localhost:3000/api/twilio/TWILIO ACCOUNT SID/workspace/TWILIO WORKSPACE SID/activities', { headers })
			.then((response) => response.json())
			.then((data) => setActivities(data));
	}, []);

	if (activities === null) {
		return <div></div>;
	}

	const selectedActivity = activities?.find((activity) => activity.sid === defaultValue);

	return (
		<Select name='activity' onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger aria-label='Select contact' className={className}>
				<SelectValue placeholder='Select contact'>
					<Circle
						className={cn(
							'mr-1.5 h-3 w-3 inline-block',
							selectedActivity?.available ? 'fill-green-500 stroke-green-500' : 'fill-gray-500 stroke-gray-500'
						)}
					/>
					<span className={cn('ml-1.5')}>{selectedActivity?.friendlyName}</span>
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
