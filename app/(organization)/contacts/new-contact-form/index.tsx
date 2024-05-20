import React from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactInfoForm from './contact-info-form';
import AssignedServicesForm from './assigned-services-form';
import WorkingHoursForm from './working-hours';
import DaysOffForm from './days-off';

type Props = {};

const NewContactForm = (props: Props) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Add customer</Button>
			</SheetTrigger>
			<SheetContent className='sm:max-w-lg flex flex-col'>
				<SheetHeader>
					<SheetTitle>Add New Contact</SheetTitle>
				</SheetHeader>

				<form className='grow'>
					<Tabs>
						<TabsList>
							<TabsTrigger value='staff_info'>Contact Info</TabsTrigger>
							<TabsTrigger value='assigned_services'>Assigned Services</TabsTrigger>
							<TabsTrigger value='working_hours'>Working Hours</TabsTrigger>
							<TabsTrigger value='days_off'>Days Off</TabsTrigger>
						</TabsList>

						<TabsContent value='staff_info'>
							<ContactInfoForm />
						</TabsContent>
						<TabsContent value='assigned_services'>
							<AssignedServicesForm />
						</TabsContent>
						<TabsContent value='working_hours'>
							<WorkingHoursForm />
						</TabsContent>
						<TabsContent value='days_off'>
							<DaysOffForm />
						</TabsContent>
					</Tabs>
				</form>

				<SheetFooter>
					<Button variant='link'>Cancel</Button>

					<Button>Next</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default NewContactForm;
