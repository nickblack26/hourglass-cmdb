import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = auth(async ({ auth }) => {
	console.log(auth);
	return NextResponse.json({ user: auth?.user?.name });
});
