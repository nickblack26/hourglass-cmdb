'use client';
import React, { Suspense } from 'react';
import LabeledInput from './labled-input';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ActivitySelector from './selector/activity-selector';

type Props = {
	queue?: TaskQueueInstance;
};

const QueueForm = ({ queue }: Props) => {
	const action = async (action: FormData) => {
		if (queue) {
			fetch('https://localhost:3000/');
		} else {
		}
	};

	return (
		<form
			action={action}
			name='queueForm'
			id='queueForm'
			className='space-y-3'
		>
			<LabeledInput
				name='name'
				label='Queue name'
				placeholder='Name'
				defaultValue={queue?.friendlyName}
				required
			/>

			<LabeledInput
				name='order'
				label='Task order'
				required
			>
				<Select defaultValue='FIFO'>
					<SelectTrigger>
						<SelectValue placeholder='Choose task order...' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='FIFO'>First In, First Out</SelectItem>
						<SelectItem value='LIFO'>Last In, First Out</SelectItem>
					</SelectContent>
				</Select>
			</LabeledInput>

			<LabeledInput
				name='reservationActivity'
				label='Reservation activity'
				required
			>
				<Suspense
					fallback={
						<Select disabled>
							<SelectTrigger aria-label='Select activity'>
								<SelectValue placeholder='Select activity...' />
							</SelectTrigger>
						</Select>
					}
				>
					<ActivitySelector defaultValue={queue?.reservationActivitySid} />
				</Suspense>
			</LabeledInput>

			<LabeledInput
				name='assignmentActivity'
				label='Assignment Activity'
				required
			>
				<Suspense
					fallback={
						<Select disabled>
							<SelectTrigger aria-label='Select activity'>
								<SelectValue placeholder='Select activity...' />
							</SelectTrigger>
						</Select>
					}
				>
					<ActivitySelector defaultValue={queue?.assignmentActivitySid} />
				</Suspense>
			</LabeledInput>

			<LabeledInput
				name='reserverdWorkers'
				type='number'
				label='Maximum reserved workers'
				placeholder='Name'
				required
				defaultValue={queue?.maxReservedWorkers ?? 1}
			/>
			<div>Worker expression builder</div>
		</form>
	);
};

export default QueueForm;
