'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
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
}

export function Velo({ defaultLayout = [15, 85], defaultCollapsed = false, navCollapsedSize, children, teams }: Props) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	//
	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction='horizontal'
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
				}}
				className='h-full items-stretch relative'
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={15}
					maxSize={20}
					// onCollapse={(collapsed: boolean): PanelOnCollapse => {
					// 	setIsCollapsed(collapsed || true);
					// 	// console.log(collapsed);
					// 	document.cookie = `react-resizable-panels:collapsed=${typeof collapsed === 'boolean' ? JSON.stringify(collapsed) : JSON.stringify(true)}`;
					// }}
					className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out sticky top-0 left-0')}
				>
					<Nav isCollapsed={false} teams={teams} />
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={defaultLayout[1]}>
					<ScrollArea className='h-screen'>{children}</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
