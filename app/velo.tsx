'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Nav } from './nav';
import CallButton from './call-button';

interface Props {
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
	children: React.ReactNode;
}

export function Velo({ defaultLayout = [15, 85], defaultCollapsed = false, navCollapsedSize, children }: Props) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	//
	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction='horizontal'
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
				}}
				className='h-full items-stretch'
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={15}
					maxSize={20}
					onCollapse={(collapsed) => {
						setIsCollapsed(collapsed || true);
						// console.log(collapsed);
						document.cookie = `react-resizable-panels:collapsed=${typeof collapsed === 'boolean' ? JSON.stringify(collapsed) : JSON.stringify(true)}`;
					}}
					className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
				>
					{/* <CallButton /> */}
					<Nav isCollapsed={isCollapsed} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
