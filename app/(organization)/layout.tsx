import React from 'react';
import { Velo } from '@/components/velo';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { JabraProvider } from '@/providers/jabraProvider';

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const supabase = createClient();

	const { data: teams } = await supabase.from('teams').select();

	const layout = cookieStore.get('react-resizable-panels:layout');
	const collapsed = cookieStore.get('react-resizable-panels:collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON?.parse(collapsed.value) : true;

	return (
		<JabraProvider>
			{/* <TwilioProvider contact={contact} accountSid={accountSid} authToken={authToken} workspaceSid={workspaceSid}> */}
			<Velo defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} teams={teams || []}>
				{children}
			</Velo>
			{/* </TwilioProvider> */}
		</JabraProvider>
	);
};

export default Layout;
