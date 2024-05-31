import NextAuth, { User } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import authConfig from './auth.config';

export const BASE_PATH = '/api/auth';

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth({
	...authConfig,
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'publci',
		collections: {
			Users: 'users',
		},
	}),
	basePath: BASE_PATH,
	// session: {
	// 	strategy: 'jwt',
	// },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn() {
			return true;
		},
		async jwt({ token, user, account }) {
			if (user || account) {
				let new_token: { access_token: string | undefined; user: User } = {
					access_token: account?.access_token,
					user: { id: user.id, email: user.email, name: user.name },
				};
				return new_token;
			}

			return token;
		},
		async session({ session, user }) {
			console.log(session, user);
			session.user = user;
			session.sessionToken = user.sessionToken;
			// console.log(session);

			// Add additional user data to the session object
			// session.user.id = user.id;
			// session.user.role = user.role;
			// Add any other data you want to include
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});
