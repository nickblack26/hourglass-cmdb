export type WorkDay = {
	day: Day
	enabled: boolean
	from: Date
	to: Date
}

export type Day = {
	id: number;
	name: string;
};

const days: Day[] = [
		{ id: 1, name: 'Sunday' },
		{ id: 2, name: 'Monday' },
		{ id: 3, name: 'Tuesday' },
		{ id: 4, name: 'Wednesday' },
		{ id: 5, name: 'Thursday' },
		{ id: 6, name: 'Friday' },
		{ id: 6, name: 'Saturday' },
	];


export const workDays: WorkDay[] = [
		{ day: days[0], from: new Date(), to: new Date(), enabled: false },
		{ day: days[1], from: new Date(), to: new Date(), enabled: true },
		{ day: days[2], from: new Date(), to: new Date(), enabled: true },
		{ day: days[3], from: new Date(), to: new Date(), enabled: true },
		{ day: days[4], from: new Date(), to: new Date(), enabled: true },
		{ day: days[5], from: new Date(), to: new Date(), enabled: true },
		{ day: days[6], from: new Date(), to: new Date(), enabled: false },
	];