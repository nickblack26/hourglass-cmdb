import React from 'react';
import { Velo } from '@/components/velo';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { JabraProvider } from '@/providers/jabraProvider';
import { redirect } from 'next/navigation';

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const supabase = createClient();

	const { data: teams } = await supabase.from('teams').select();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: user } = await supabase
		.from('users')
		.select()
		.eq('id', session?.user?.id ?? '')
		.single();

	if (!user) return redirect('/login');

	const layout = cookieStore.get('react-resizable-panels:layout');
	const collapsed = cookieStore.get('react-resizable-panels:collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON?.parse(collapsed.value) : true;

	const body = new FormData();
	body.set('accountSid', '');
	body.set('authToken', '');

	await fetch('http://localhost:3000/api/orgContext', {
		method: 'POST',
		body: body,
	});

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
