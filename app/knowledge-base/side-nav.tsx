import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import React from 'react';
import SideNavLink from './side-nav-link';

const SideNav = ({ pages }: { pages: any[] }) => {
	return (
		<aside className='p-3'>
			<Accordion type='single' collapsible>
				{pages.map((page) => {
					return (
						<AccordionItem key={page.id} value={page.id} className='min-w-[240px]'>
							<SideNavLink page={page} />

							{page.pages?.length > 0 && (
								<AccordionContent className='pt-1'>
									{page.pages.map((page: Page & { pages: Page[] }) => (
										<SideNavLink page={page} key={page.id} />
									))}
								</AccordionContent>
							)}
						</AccordionItem>
					);
				})}
			</Accordion>
		</aside>
	);
};

export default SideNav;
