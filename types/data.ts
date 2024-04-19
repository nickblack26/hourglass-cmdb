import { ColorOption } from '@/components/status-badge';
import { LucideIcon } from 'lucide-react';

export interface SearchParams {
	[key: string]: string | string[] | undefined;
}

export interface IDPageProps {
	params: { id: string };
	searchParams: SearchParams;
}

export interface Priority {
	id: string;
	name: string;
	color: ColorOption;
}

export interface TicketType {
	id: string;
	name: string;
	icon: LucideIcon;
}

export interface Client {
	id: string;
	name: string;
	icon: string;
	email?: string;
	phoneNumber?: string;
	dateCreated?: Date;
	organization?: string;
	tags?: Priority[];
	latestUpdate?: Date;
}

export interface Ticket {
	id: number;
	text: string;
	priority: Priority;
	type: TicketType;
	client: Client;
	requestDate: Date;
}
