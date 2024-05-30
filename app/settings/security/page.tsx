import React from 'react';
import SettingsSection from '../settings-section';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type Props = {};

const Page = (props: Props) => {
	return (
		<div className='space-y-6'>
			<SettingsSection title='Security' header description='Manage your workspace’s security and how its members authenticate' />

			<Separator />

			<SettingsSection
				title='Allowed email domains'
				description={
					<span>
						Anyone with an email address at these domains is allowed to sign up for this workspace.<Link href={'#'}>Learn more</Link>
					</span>
				}
			>
				<Button>Add domain</Button>
			</SettingsSection>

			<Separator />

			<SettingsSection title='SAML' description='Allow logins through your SAML identity provider single sign-on functionality.'>
				<Button disabled>Configure</Button>
			</SettingsSection>

			<Separator />

			<SettingsSection title='Google' description="Allow logins through Google's single sign-on functionality.">
				<Switch defaultChecked disabled />
			</SettingsSection>

			<Separator />

			<SettingsSection title='Microsoft' description="Allow logins through Microsoft's single sign-on functionality.">
				<Switch defaultChecked disabled />
			</SettingsSection>

			<Separator />

			<SettingsSection title='Email & passkeys' description='Allow passwordless logins through magic links delivered over email and passkeys.'>
				<Switch defaultChecked disabled />
			</SettingsSection>
		</div>
	);
};

export default Page;
