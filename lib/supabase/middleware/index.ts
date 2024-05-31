import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const db = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			get(name: string) {
				return request.cookies.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions) {
				request.cookies.set({
					name,
					value,
					...options,
				});
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				response.cookies.set({
					name,
					value,
					...options,
				});
			},
			remove(name: string, options: CookieOptions) {
				request.cookies.set({
					name,
					value: '',
					...options,
				});
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				response.cookies.set({
					name,
					value: '',
					...options,
				});
			},
		},
	});

	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser();

	// if (user && request.nextUrl.pathname.includes('login')) {
	// 	await supabase.auth.signOut();
	// }

	// if (!!!user && !!!request.nextUrl.pathname.includes('login')) {
	// 	console.log('no user');
	// 	// await supabase.auth.signOut()
	// 	// return NextResponse.redirect(new URL('/login', request.url))
	// }

	return response;
}
