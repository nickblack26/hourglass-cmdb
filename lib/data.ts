import { Cable, Cpu, HardDrive, Laptop, LucideIcon, MemoryStick, Monitor, PcCase, Phone, Printer, Router, Server } from 'lucide-react';

export interface Icon {
	label: string;
	value: string;
	icon: LucideIcon;
}

export const icons: Icon[] = [
	{ label: 'Phone', value: 'phone', icon: Phone },
	{ label: 'Laptop', value: 'laptop', icon: Laptop },
	{ label: 'Printer', value: 'printer', icon: Printer },
	{ label: 'Server', value: 'server', icon: Server },
	{ label: 'Router', value: 'router', icon: Router },
	{ label: 'Cable', value: 'cable', icon: Cable },
	{ label: 'CPU', value: 'cpu', icon: Cpu },
	{ label: 'Hard Drive', value: 'hard-drive', icon: HardDrive },
	{ label: 'Memory Stick', value: 'memory-stick', icon: MemoryStick },
	{ label: 'PC Case', value: 'pc-case', icon: PcCase },
	{ label: 'Monitor', value: 'monitor', icon: Monitor },
];
