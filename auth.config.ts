import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { createClient } from '@/lib/mongodb/client';
import * as Realm from 'realm-web';

export default {
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {},
			async authorize(credentials): Promise<Realm.User | null> {
				const app = createClient();
				// @ts-ignore
				const creds = Realm.Credentials.emailPassword(credentials?.email, credentials?.password);

				const user = await app.logIn(creds);

				return user;
			},
		}),
	],
} satisfies NextAuthConfig;
