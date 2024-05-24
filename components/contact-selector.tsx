'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createClient } from '@/lib/supabase/client';

type Props = {
	onValueChange?: (...event: any[]) => void;
	defaultValue?: string;
	className?: string;
};

const ContactSelector = ({ onValueChange, defaultValue, className }: Props) => {
	const supabase = createClient();
	const [contacts, setContacts] = useState<Contact[] | null>([]);

	useEffect(() => {
		supabase
			.from('users')
			.select()
			.order('firstName')
			.then(({ data }) => setContacts(data));
	}, [supabase]);

	if (contacts === null) {
		// console.error(error);
		return <div></div>;
	}

	return (
		<Select name='contact' onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger aria-label='Select contact' className={className}>
				<SelectValue placeholder='Select contact' />
			</SelectTrigger>
			<SelectContent>
				{contacts?.map((contact) => (
					<SelectItem key={contact.id} value={contact?.id}>
						<div>
							{contact.firstName} {contact.lastName}
							<p className='text-xs text-secondary-foreground'>{contact.company}</p>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default ContactSelector;
