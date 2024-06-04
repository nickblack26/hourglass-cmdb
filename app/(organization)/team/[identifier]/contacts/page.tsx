import ContactList from '@/app/(organization)/contacts/contact-list';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

type Props = {
	params: { identifier: string };
};

const Page = async ({ params }: Props) => {
	const supabase = createClient();

	console.log(params.identifier);

	const { data: users, error } = await supabase
		.from('users')
		.select('*, company(team(identifier))')
		.eq('company.team.identifier', params.identifier);

	users?.forEach((user) => console.log(user.company));

	return (
		<div>
			<ContactList
				data={users ?? []}
				companies={[]}
			/>
		</div>
	);
};

export default Page;
