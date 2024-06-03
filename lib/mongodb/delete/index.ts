'use server';
import { Document, Filter, FindOptions, InsertOneOptions } from 'mongodb';
import { createClient } from '../';

export async function deleteDocuments<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	options?: FindOptions<T>
) {
	const db = await createClient();

	return await db.collection<T>(collection).deleteMany(filter, options);
}

export async function deleteDocument<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	options?: InsertOneOptions
) {
	const db = await createClient();

	return await db.collection<T>(collection).deleteOne(filter, options);
}
