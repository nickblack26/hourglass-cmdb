import React from 'react';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import LabeledInput from '@/components/labled-input';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDocument } from '@/lib/mongodb/read';
import SettingsSection from '@/app/settings/settings-section';
import { IconSelector } from '@/app/settings/types/icon-selector';
import { ObjectId } from 'mongodb';

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const team = await getDocument('teams', { _id: new ObjectId(params.id) });

	if (!team) return notFound();

	return (
		<div className='space-y-6'>
			<SettingsSection
				title={team.name}
				description='Manage team settings'
			/>

			<Separator />

			<SettingsSection title='General'>
				<div className='flex items-center gap-3'>
					<LabeledInput
						name='name'
						label='Icon & Name'
					>
						<div className='flex items-center gap-3'>
							<IconSelector
								defaultValue={team.icon}
								className='w-9'
							/>
							<Input defaultValue={team.name} />
						</div>
					</LabeledInput>

					<LabeledInput
						name='identifier'
						label='Identifier'
						defaultValue={team.identifier}
					/>
				</div>
			</SettingsSection>

			<Separator />

			<SettingsSection
				title='Timezone'
				description='The timezone should be set as the location where most of your team members reside. All other times referenced by the team will be relative to this timezone setting. For example, if the team uses cycles, each cycle will start at midnight in the specified timezone.'
			>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between gap-3'>
						<CardTitle className='text-sm font-medium'>Timezone</CardTitle>
						<Select>
							<SelectTrigger className='max-w-xs'>
								<SelectValue placeholder='Select timezone' />
							</SelectTrigger>
						</Select>
					</CardHeader>
				</Card>
			</SettingsSection>
		</div>
	);
};

export default Page;
