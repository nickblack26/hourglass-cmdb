import React, { useState } from 'react';
import { Target } from '.';
import { TaskQueueInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/taskQueue';
import { WorkerInstance } from 'twilio/lib/rest/taskrouter/v1/workspace/worker';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Combobox } from '../combobox';
import { GripVertical } from 'lucide-react';

type Props = {
	target: Target;
	index: number;
	queues: TaskQueueInstance[];
	workers: WorkerInstance[];
	teams: Team[];
};

const TargetItem = ({ target, index, queues, workers, teams }: Props) => {
	const [selectedQueue, setSelectedQueue] = useState<string>(target.queue);
	const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
	const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

	const durations: { label: string; value: string }[] = [
		{ label: '15 seconds', value: '15' },
		{ label: '30 seconds', value: '30' },
		{ label: '45 seconds', value: '45' },
		{ label: '1 minute', value: '60' },
		{ label: '2 minutes', value: '120' },
		{ label: '5 minutes', value: '300' },
		{ label: '15 minutes', value: '900' },
		{ label: '30 minutes', value: '1800' },
		{ label: '1 hour', value: '3600' },
	];

	const orders: { label: string; value: string }[] = [
		{ label: 'All at once', value: 'all' },
		{ label: `In groups of ${Math.ceil(selectedWorkers.length / 2)}`, value: `${Math.ceil(selectedWorkers.length / 2)}` },
		{ label: `In groups of ${Math.ceil(selectedWorkers.length / 3)}`, value: `${Math.ceil(selectedWorkers.length / 3)}` },
		{ label: `In groups of ${Math.ceil(selectedWorkers.length / 4)}`, value: `${Math.ceil(selectedWorkers.length / 4)}` },
		{ label: `In groups of ${Math.ceil(selectedWorkers.length / 5)}`, value: `${Math.ceil(selectedWorkers.length / 5)}` },
	];

	const filteredOrders = selectedWorkers.length > 0 ? orders : orders.filter((o) => !o.label.includes('groups'));

	return (
		<>
			<div className='flex items-center gap-1.5 grow'>
				<GripVertical className='h-3.5 w-3.5' />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='w-full'>
							{!selectedQueue && selectedWorkers.length === 0 && selectedTeams.length === 0 && 'Add target'}
							{selectedQueue && queues.find((q) => q.sid === selectedQueue)?.friendlyName}
							{selectedWorkers.length > 0 && selectedWorkers.map((worker) => workers.find((w) => w.sid === worker)?.friendlyName)}
							{selectedTeams.length > 0 && selectedTeams.map((team) => teams.find((w) => w.id === team)?.name)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuLabel>Queues</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={queues.find((q) => q.sid === selectedQueue)?.sid} onValueChange={setSelectedQueue}>
							{queues.map((queue) => (
								<DropdownMenuRadioItem key={queue.sid} value={queue.sid}>
									{queue.friendlyName}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>

						<DropdownMenuLabel>Workers</DropdownMenuLabel>

						<DropdownMenuSeparator />

						{workers.map((worker) => (
							<DropdownMenuCheckboxItem
								key={worker.sid}
								checked={selectedWorkers.includes(worker.sid)}
								onCheckedChange={(checked) => {
									checked
										? setSelectedWorkers((prev) => [...prev, worker.sid])
										: setSelectedWorkers((prev) => [...prev].filter((q) => q !== worker.sid));

									console.log(selectedWorkers);
								}}
							>
								{worker.friendlyName}
							</DropdownMenuCheckboxItem>
						))}

						<DropdownMenuLabel>Teams</DropdownMenuLabel>

						<DropdownMenuSeparator />

						{teams.map((team) => (
							<DropdownMenuCheckboxItem
								key={team.id}
								checked={selectedTeams.includes(team.id)}
								onCheckedChange={(checked) => {
									checked ? setSelectedTeams((prev) => [...prev, team.id]) : setSelectedTeams((prev) => [...prev].filter((q) => q !== team.id));
								}}
							>
								{team.name}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Combobox items={filteredOrders} placeholder='Select ring order...' />
			<Combobox items={durations} placeholder='Select duration...' />
		</>
	);
};

export default TargetItem;
