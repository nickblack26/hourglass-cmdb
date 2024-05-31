import React from 'react';
import { Velo } from '@/components/velo';
import { cookies } from 'next/headers';
import { JabraProvider } from '@/providers/jabraProvider';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const db = await createClient();

	const [teams, user] = await Promise.all([
		db
			.collection('teams')
			.find<Team>({ organization: new ObjectId('665888e02684136c5e529eb4') })
			.toArray(),
		db.collection('users').findOne<Contact>({ _id: new ObjectId('665889a02684136c5e529eb5') }),
	]);

	if (!user) return redirect('/login');

	const layout = cookieStore.get('react-resizable-panels:layout');
	const collapsed = cookieStore.get('react-resizable-panels:collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON?.parse(collapsed.value) : true;

	// const body = new FormData();
	// body.set('accountSid', '');
	// body.set('authToken', '');

	// await fetch('http://localhost:3000/api/orgContext', {
	// 	method: 'POST',
	// 	body: body,
	// });

	return (
		<JabraProvider>
			{/* <TwilioProvider contact={contact} accountSid={accountSid} authToken={authToken} workspaceSid={workspaceSid}> */}
			<Velo
				user={user}
				defaultLayout={defaultLayout}
				defaultCollapsed={defaultCollapsed}
				navCollapsedSize={4}
				teams={teams || []}
			>
				{children}
			</Velo>
			{/* </TwilioProvider> */}
		</JabraProvider>
	);
};

export default Layout;
