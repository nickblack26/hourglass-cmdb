import React from 'react';
import { Velo } from '@/components/velo';
import { cookies } from 'next/headers';
import { TwilioProvider } from '@/providers/twilioVoiceContext';
import { createClient } from '@/lib/supabase/server';
import { JabraProvider } from '@/providers/jabraProvider';

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const supabase = createClient();

	const { data: teams } = await supabase.from('teams').select();

	const { data } = await supabase
		.from('company_secrets')
		.select()
		.eq('id', 'eaf9a72d-7b5d-48cf-90f4-83d63a9fc242')
		.in('key', ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_WORKSPACE_SID']);

	const accountSid = data?.find((secret) => secret.key === 'TWILIO_ACCOUNT_SID')?.value;
	const authToken = data?.find((secret) => secret.key === 'TWILIO_AUTH_TOKEN')?.value;
	const workspaceSid = data?.find((secret) => secret.key === 'TWILIO_WORKSPACE_SID')?.value;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: contact } = await supabase
		.from('users')
		.select()
		.eq('id', user?.id ?? '')
		.single();

	console.log(contact);

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
