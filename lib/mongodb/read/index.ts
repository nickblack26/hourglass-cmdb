'use server';
import { AggregateOptions, Document, Filter, FindOptions, Sort, SortDirection } from 'mongodb';
import { createClient } from '../';

export async function getDocuments<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	sort: Sort = {},
	options?: FindOptions<T>,
	sortDirection?: SortDirection
) {
	const db = await createClient();

	return await db.collection<T>(collection).find<T>(filter, options).sort(sort, sortDirection).toArray();
}

export async function getDocument<T extends Document>(
	collection: string,
	filter: Filter<T> = {},
	options?: FindOptions<T>
) {
	const db = await createClient();

	return await db.collection<T>(collection).findOne<T>(filter, options);
}

export async function getAggregateDocuments<T extends Document>(
	collection: string,
	pipeline?: Document[],
	options?: AggregateOptions
) {
	const db = await createClient();

	return await db.collection<T>(collection).aggregate<T>(pipeline, options).toArray();
}

export async function getAggregateDocument<T extends Document>(
	collection: string,
	pipeline?: Document[],
	options?: AggregateOptions
) {
	const db = await createClient();

	return db.collection<T>(collection).aggregate<T>(pipeline, options);
}
