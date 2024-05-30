'use client';
import React, { useState } from 'react';
import { WorkflowInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/workflow';
import LabeledInput from './labled-input';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';
import TargetList from './call-workflow-builder/target-list';
import { Button } from './ui/button';
import { Target } from './call-workflow-builder';
import { Plus } from 'lucide-react';

type Props = {
	workflow?: WorkflowInstance;
	queues: TaskQueueInstance[];
	workers: WorkerInstance[];
	teams: Team[];
};

type Filter = {
	filter_friendly_name?: string;
	expression: string;
	targets: Target[];
};

type Configuration = {
	task_routing: {
		filters?: Filter[];
		default_filter: {
			task_queue_sid: string;
		};
	};
};

const WorkflowForm = ({ workflow, queues, workers, teams }: Props) => {
	const filter: Configuration | undefined = workflow?.configuration ? JSON.parse(workflow?.configuration) : undefined;
	const [targets, setTargets] = useState<Target[]>(filter?.task_routing?.filters?.flatMap((f) => f.targets) ?? []);

	return (
		<form className='space-y-3'>
			<LabeledInput name='friendlyName' label='name' />
			<LabeledInput name='taskReservationTimeout' type='number' label='Task reservation timeout' />

			<TargetList defaultTargets={targets} queues={queues} workers={workers} teams={teams} />

			<Button
				variant='secondary'
				type='button'
				className='w-full'
				onClick={() => setTargets((prev) => [...prev, { priority: 0, queue: '', timeout: 300 }])}
			>
				<Plus className=' w-3.5 mr-1.5' />
				Add another group
			</Button>
		</form>
	);
};

export default WorkflowForm;
