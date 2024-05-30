import CompanySelector from '@/components/selector/company-selector';
import ContactSelector from '@/components/selector/contact-selector';
import LabeledInput from '@/components/labled-input';
import TypeSelector from '@/components/selector/type-selector';
import { Label } from '@/components/ui/label';
import React from 'react';

type Props = {};

const TicketForm = async (props: Props) => {
	return (
		<form className='grow overflow-auto min-h-0 space-y-3'>
			<LabeledInput
				label='Name'
				name='name'
				placeholder='LAP-12345'
				required
			/>

			<div className='space-y-1.5'>
				<Label htmlFor='type'>Type</Label>
				<TypeSelector />
			</div>

			<div className='space-y-1.5'>
				<Label htmlFor='company'>Company</Label>
				<CompanySelector />
			</div>

			<div className='space-y-1.5'>
				<Label htmlFor='contact'>Contact</Label>
				<ContactSelector />
			</div>
		</form>
	);
};

export default TicketForm;
