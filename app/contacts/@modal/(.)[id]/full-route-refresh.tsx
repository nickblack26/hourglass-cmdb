'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

const ViewFullDetails = () => {
	return (
		<Button
			variant='outline'
			onClick={() => {
				location.reload();
			}}
		>
			View Full Details
		</Button>
	);
};

export default ViewFullDetails;
