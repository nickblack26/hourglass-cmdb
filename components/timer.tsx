// Timer.js

import React from 'react';
import { useState, useEffect } from 'react';

type Props = {
	start: DateConstructor;
};

const Timer = ({ start }: Props) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const deadline = 'December, 31, 2022';

	useEffect(() => {
		const getTime = () => {
			const time = start.length - Date.now();

			setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
			setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
			setMinutes(Math.floor((time / 1000 / 60) % 60));
			setSeconds(Math.floor((time / 1000) % 60));
		};
		const interval = setInterval(() => getTime(), 1000);

		return () => clearInterval(interval);
	}, [start]);

	return <div className='timer'>{days > 0 && days}</div>;
};

export default Timer;
