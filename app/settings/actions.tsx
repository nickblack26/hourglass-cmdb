'use server';
import { createDocument } from '@/lib/mongodb/create';
import { ObjectId } from 'mongodb';

export const createTeam = async (data: FormData) => {
	await createDocument('teams', {
		name: data.get('name'),
		identifier: data.get('identifier'),
		organization: new ObjectId('665884031e7e5912f6e28ad6'),
	});
};
