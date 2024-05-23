'use client';
import React, { useState } from 'react';
import type { WorkflowInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/workflow';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TargetItem from './target-item';
import { Button } from '../ui/button';
import { PhoneCall, Plus } from 'lucide-react';
import type { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import type { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';

type Props = {
	workflow?: WorkflowInstance;
	queues?: TaskQueueInstance[];
	workers?: WorkerInstance[];
};

export type Target = {
	queue: string;
	priority?: number;
	timeout?: number;
	expression?: string;
};

type Filter = {
	filter_friendly_name: string;
	expression: string;
	targets: Target[];
	default_filter?: {
		queue: string;
	};
};

const CallWorkflowBuilder = ({ workflow, queues, workers }: Props) => {
	const [targets, setTargets] = useState<Target[]>([]);

	return (
		<DialogContent className='sm:max-w-3xl overflow-hidden'>
			<DialogHeader>
				<div className='flex items-center gap-3'>
					<div className='h-10 w-10 bg-secondary grid place-items-center rounded-full'>
						<PhoneCall className='h-4 w-4' />
					</div>

					<div>
						<DialogTitle>Ring order</DialogTitle>
						<DialogDescription>Call routing rules and ring duration</DialogDescription>
					</div>
				</div>
			</DialogHeader>

			<Tabs defaultValue='custom'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='font-medium'>Order type</p>
						<p className='text-sm text-muted-foreground'>How users receive calls</p>
					</div>

					<TabsList>
						<TabsTrigger value='all'>All at once</TabsTrigger>
						<TabsTrigger value='random'>Random</TabsTrigger>
						<TabsTrigger value='custom'>Custom</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value='custom' className='space-y-3'>
					<div className='grid grid-cols-3 gap-3'>
						<p>Users</p>
						<p>Ring order</p>
						<p>Ring duration</p>

						{targets.map((target, index) => (
							<TargetItem key={`${target.queue}-${target.timeout}`} target={target} index={index} queues={queues ?? []} workers={workers ?? []} />
						))}
					</div>
					<Button
						variant='secondary'
						type='button'
						className='w-full'
						onClick={() => setTargets((prev) => [...prev, { priority: 0, queue: '', timeout: 300 }])}
					>
						<Plus className='h-3.5 w-3.5 mr-1.5' />
						Add another group
					</Button>
				</TabsContent>
			</Tabs>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant='secondary'>Close</Button>
				</DialogClose>

				<Button>Save</Button>
			</DialogFooter>
		</DialogContent>
	);
};

export default CallWorkflowBuilder;
