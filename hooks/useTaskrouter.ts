'use client'
import { RequestClient, Twilio } from 'twilio';

const client: Twilio = new Twilio('', '', { httpClient: new RequestClient() });

const useTaskrouter = () => {

	return client?.taskrouter.v1
}

export default useTaskrouter