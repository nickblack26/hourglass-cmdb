import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
	return (
		<div>
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Talk</CardTitle>
						<CardDescription>Enable talk for your organziation.</CardDescription>
					</CardHeader>

					<CardContent>
						<Image src='/twilio.svg' alt='Twilio logo' width={50} height={50} />
					</CardContent>

					<CardFooter>
						<Switch />
					</CardFooter>
				</Card>
			</section>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>SMS</CardTitle>
						<CardDescription>Enable talk for your organziation.</CardDescription>
					</CardHeader>

					<CardContent>
						<Image src='/twilio.svg' alt='Twilio logo' width={50} height={50} />
					</CardContent>

					<CardFooter>
						<Switch />
					</CardFooter>
				</Card>
			</section>
		</div>
	);
};

export default Page;
