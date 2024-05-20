'use client';
import { clients } from '@/app/(organization)/contacts/data';
import { Client, Priority, Ticket, TicketType } from '@/types/data';
import { FlameIcon, LightbulbIcon, MessageCircleQuestionIcon, PuzzleIcon } from 'lucide-react';
import { v4 as uuid } from 'uuid';

export const prioritites: Priority[] = [
	{ id: uuid(), name: 'High', color: 'red' },
	{ id: uuid(), name: 'Medium', color: 'yellow' },
	{ id: uuid(), name: 'Low', color: 'green' },
];

export const types: TicketType[] = [
	{ id: uuid(), name: 'Incident', icon: FlameIcon },
	{ id: uuid(), name: 'Suggestion', icon: LightbulbIcon },
	{ id: uuid(), name: 'Question', icon: MessageCircleQuestionIcon },
	{ id: uuid(), name: 'Problem', icon: PuzzleIcon },
];

export const tickets: Ticket[] = [];

// Function to generate a random integer within a range
function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random date within a range
function getRandomDate(start: Date, end: Date) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for (let i = 1; i <= 30; i++) {
	const ticket: Ticket = {
		id: i,
		text: `Ticket ${i}`,
		priority: prioritites[getRandomInt(0, 2)],
		type: types[getRandomInt(0, 3)],
		client: clients[getRandomInt(0, 14)],
		requestDate: getRandomDate(new Date(2024, 0, 1), new Date()),
	};
	tickets.push(ticket);
}
