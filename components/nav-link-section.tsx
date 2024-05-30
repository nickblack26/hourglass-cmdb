import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import NavLinkItem from './nav-link-item';
import { LinkSection } from '@/types/data';

type Props = {
	section: LinkSection;
	isCollapsed: boolean;
	pathname: string;
};

const NavLinkSection = ({ section, isCollapsed, pathname }: Props) => {
	return (
		<>
			{section.name ? (
				<Accordion
					type='multiple'
					className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'
				>
					<AccordionItem value={section.name}>
						<AccordionTrigger>
							<div className='flex items-center gap-1.5'>
								<h2 className='text-xs px-3 font-medium text-muted-foreground'>{section.name}</h2>
							</div>
						</AccordionTrigger>

						<AccordionContent className='flex flex-col gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'>
							{section.links.length > 0 &&
								section.links.map((link) => {
									return (
										<NavLinkItem
											key={link.href}
											isCollapsed={isCollapsed}
											link={link}
											pathname={pathname}
										/>
									);
								})}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			) : (
				section.links.map((link) => {
					return (
						<NavLinkItem
							key={link.href}
							isCollapsed={isCollapsed}
							link={link}
							pathname={pathname}
						/>
					);
				})
			)}
		</>
	);
};

export default NavLinkSection;
