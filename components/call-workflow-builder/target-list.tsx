'use client';
import React, { useState } from 'react';
import { Target } from '.';
import TargetItem from './target-item';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';

type Props = {
	defaultTargets?: Target[];
	queues: TaskQueueInstance[];
	workers: WorkerInstance[];
	teams: Team[];
};

const TargetList = ({ defaultTargets, queues, workers, teams }: Props) => {
	return (
		<div className='grid grid-cols-3 gap-3'>
			<p>Users</p>
			<p>Ring order</p>
			<p>Ring duration</p>

			{defaultTargets?.map((target, index) => (
				<TargetItem
					key={`${target.queue}-${target.timeout}`}
					target={target}
					teams={teams}
					index={index}
					queues={queues ?? []}
					workers={workers ?? []}
				/>
			))}
		</div>
	);
};

export default TargetList;
