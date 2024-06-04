import React from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { Nav } from '@/components/nav';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const cookieStore = cookies();
	const [teams, user] = await Promise.all([
		getDocuments<Team>('teams', { organization: new ObjectId('665888e02684136c5e529eb4') }),
		getDocument<Contact>('users', { _id: new ObjectId('665889a02684136c5e529eb5') }),
	]);

	const { data: teams } = await supabase.from('teams').select();
	const {
		data: { user: authUser },
	} = await supabase.auth.getUser();
	const { data: user } = await supabase.from('users').select().eq('id', authUser!.id).single();

	const layout = cookieStore.get('react-resizable-panels:layout');
	const collapsed = cookieStore.get('react-resizable-panels:collapsed');

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON?.parse(collapsed.value) : true;

	// const body = new FormData();
	// body.set('accountSid', '');
	// body.set('authToken', '');
	// const body = new FormData();
	// body.set('accountSid', '');
	// body.set('authToken', '');

	// await fetch('http://localhost:3000/api/orgContext', {
	// 	method: 'POST',
	// 	body: body,
	// });

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction='horizontal'
				className='h-full items-stretch relative'
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={defaultCollapsed}
					collapsible={true}
					minSize={15}
					maxSize={20}
					className={cn(defaultCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out sticky top-0 left-0')}
				>
					<Nav
						isCollapsed={false}
						teams={teams}
						user={user}
					/>
				</ResizablePanel>

				<ResizableHandle />

				<ResizablePanel defaultSize={defaultLayout[1]}>
					<ScrollArea className='h-screen'>{children}</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
};

export default Layout;
