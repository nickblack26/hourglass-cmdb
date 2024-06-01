import { Document, Filter, FindOptions, UpdateFilter } from 'mongodb';
import { createClient } from '../';

export async function updateDocument<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	update: T[] | UpdateFilter<T>,
	options?: FindOptions<T>
) {
	const db = await createClient();

	return await db.collection<T>(collection).updateOne(filter, update, options);
}

export async function updateDocuments<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	update: T[] | UpdateFilter<T>,
	options?: FindOptions<T>
) {
	const db = await createClient();

	return await db.collection<T>(collection).updateMany(filter, update, options);
}
