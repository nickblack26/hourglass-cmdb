import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

export function useApp() {
	const [app, setApp] = useState<Realm.App | null>(null);
	// Run in useEffect so that App is not created in server-side environment
	useEffect(() => {
		const appId = process.env.NEXT_PUBLIC_APP_ID!;
		setApp(Realm.getApp(appId));
	}, []);
	return app;
}
