'use server';
import { Document, Filter, FindOptions, InsertOneOptions, OptionalUnlessRequiredId } from 'mongodb';
import { createClient } from '../';

export async function createDocuments<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	options?: FindOptions<T>
) {
	const db = await createClient();

	return await db.collection<T>(collection).find<T>(filter, options).toArray();
}

export async function createDocument<T extends Document>(
	collection: string,
	doc: OptionalUnlessRequiredId<T>,
	options?: InsertOneOptions
) {
	const db = await createClient();

	return await db.collection<T>(collection).insertOne(doc, options);
}
