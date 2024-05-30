'use client';

import * as React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Nav } from './nav';
import { ScrollArea } from './ui/scroll-area';

interface Props {
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
	children: React.ReactNode;
	teams: Team[];
	user: Contact;
}

export function Velo({
	defaultLayout = [15, 85],
	defaultCollapsed = false,
	navCollapsedSize,
	children,
	teams,
	user,
}: Props) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	//
	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction='horizontal'
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
				}}
				className='flex w-full h-full items-stretch overflow-hidden relative'
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={13}
					maxSize={20}
				>
					<Nav
						user={user}
						isCollapsed={false}
						teams={teams}
					/>
				</ResizablePanel>

				<ResizableHandle />

				<ResizablePanel defaultSize={defaultLayout[1]}>
					<ScrollArea className='flex flex-col grow bg-background'>{children}</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
