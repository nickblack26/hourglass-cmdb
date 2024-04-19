import { Device, Call } from '@twilio/voice-sdk';

import { config } from '@/config'

export async function startupClient(): Promise<string | undefined> {
	console.log('Requesting Access Token...');

	try {
		const response = await fetch('http://localhost:3000/api/auth/twilio/create-token', { method: 'POST' });
		const data = await response.json();
		console.log('Got a token.');
		return data;
	} catch (err) {
		console.log(err);
		console.log('An error occurred. See your browser console for more information.');
	}
}

export function handleIncomingCall(call: Call) {
	console.log(`Incoming call from ${call.parameters.From}`);

	// //show incoming call div and incoming phone number
	// incomingCallDiv.classList.remove('hide');
	// incomingPhoneNumberEl.innerHTML = call.parameters.From;

	// //add event listeners for Accept, Reject, and Hangup buttons
	// incomingCallAcceptButton.onclick = () => {
	// 	acceptIncomingCall(call);
	// };

	// incomingCallRejectButton.onclick = () => {
	// 	rejectIncomingCall(call);
	// };

	// incomingCallHangupButton.onclick = () => {
	// 	hangupIncomingCall(call);
	// };

	// // add event listener to call object
	// call.on('cancel', handleDisconnectedIncomingCall);
	// call.on('disconnect', handleDisconnectedIncomingCall);
	// call.on('reject', handleDisconnectedIncomingCall);
}

// export function intitializeDevice() {
// 	console.log('Initializing device');
// 	device = new Device(token, {
// 		logLevel: 1,
// 		// Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
// 		// providing better audio quality in restrained network conditions.
// 		// @ts-ignore
// 		codecPreferences: ['opus', 'pcmu'],
// 	});

// 	addDeviceListeners(device);

// 	// Device must be registered in order to receive incoming calls
// 	device.register();
// }

// export function addDeviceListeners(device: Device) {
// 	device.on('registered', function () {
// 		console.log('Twilio.Device Ready to make and receive calls!');
// 		// callControlsDiv.classList.remove('hide');
// 	});

// 	device.on('error', function (error) {
// 		console.log('Twilio.Device Error: ' + error.message);
// 	});

// 	device.on('incoming', handleIncomingCall);

// 	// device?.audio.on('deviceChange', updateAllAudioDevices.bind(device));

// 	// Show audio selection UI if it is supported by the browser.
// 	// if (device.audio.isOutputSelectionSupported) {
// 	// 	audioSelectionDiv.classList.remove('hide');
// 	// }
// }
