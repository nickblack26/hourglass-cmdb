'use server';
import Stripe from 'stripe';
import { stripe } from '.';
import { createClient } from '../supabase/server';

export const subscriptionCreated = async (subscription: Stripe.Subscription, customerId: string) => {
	try {
		const db = await createClient();

		const { data, error } = await db.collection('organizations').update({}).eq('id', customerId);

		if (error) throw new Error('Could not update organizaion data...');

		// const data = {
		//   active: subscription.status === 'active',
		//   agencyId: agency.id,
		//   customerId,
		//   currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
		//   //@ts-ignore
		//   priceId: subscription.plan.id,
		//   subscritiptionId: subscription.id,
		//   //@ts-ignore
		//   plan: subscription.plan.id,
		// }

		// const res = await db.subscription.upsert({
		//   where: {
		//     agencyId: agency.id,
		//   },
		//   create: data,
		//   update: data,
		// })
		console.log(`🟢 Created Subscription for ${subscription.id}`);
	} catch (error) {
		console.log('🔴 Error from Create action', error);
	}
};

export const getConnectAccountProducts = async (stripeAccount: string) => {
	const products = await stripe.products.list(
		{
			limit: 50,
			expand: ['data.default_price'],
		},
		{
			stripeAccount,
		}
	);
	return products.data;
};
