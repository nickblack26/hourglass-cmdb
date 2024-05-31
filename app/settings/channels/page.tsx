import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Page = async (props: Props) => {
	const db = await createClient();
	const { data, error } = await db.collection('organizations').select().single();

	console.log(data, error);

	if (!data || error) return <div></div>;

	return (
		<div>
			<section>
				<Card>
					<CardHeader className='flex flex-row space-y-0 justify-between'>
						<div className='space-y-1.5'>
							<CardTitle>Voice</CardTitle>
							<CardDescription>Enable talk for your organziation.</CardDescription>
						</div>

						<Button
							variant='secondary'
							asChild
						>
							<Link href='/settings/channels/voice'>Configure</Link>
						</Button>
					</CardHeader>

					<CardContent>
						<Image
							src='/twilio.svg'
							alt='Twilio logo'
							width={50}
							height={50}
						/>
					</CardContent>

					<CardFooter>
						<Switch defaultChecked={data.features && (data?.features['voice'] as boolean)} />
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
						<Image
							src='/twilio.svg'
							alt='Twilio logo'
							width={50}
							height={50}
						/>
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
