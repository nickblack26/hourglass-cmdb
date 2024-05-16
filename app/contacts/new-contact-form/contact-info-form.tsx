import LabeledInput from '@/components/labled-input';
import React from 'react';

type Props = {};

const ContactInfoForm = (props: Props) => {
	return (
		<div className='grid gap-3'>
			<LabeledInput label='First Name' name='firstName' required />
			<LabeledInput label='Last Name' name='lastName' required />
			<LabeledInput label='Email' name='email' required />
		</div>
	);
};

export default ContactInfoForm;
