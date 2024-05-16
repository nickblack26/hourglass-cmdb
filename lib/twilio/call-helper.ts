import { Device, Call } from '@twilio/voice-sdk';

// HANDLE INCOMING CALL

function handleIncomingCall(call: Call) {
	console.log(`Incoming call from ${call.parameters.From}`);

	//show incoming call div and incoming phone number
	// incomingCallDiv.classList.remove('hide');
	// incomingPhoneNumberEl.innerHTML = call.parameters.From;

	//add event listeners for Accept, Reject, and Hangup buttons
	// incomingCallAcceptButton.onclick = () => {
	// 	acceptIncomingCall(call: any);
	// };

	// incomingCallRejectButton.onclick = () => {
	// 	rejectIncomingCall(call: any);
	// };

	// incomingCallHangupButton.onclick = () => {
	// 	hangupIncomingCall(call: any);
	// };

	// add event listener to call object
	call.on('cancel', handleDisconnectedIncomingCall);
	call.on('disconnect', handleDisconnectedIncomingCall);
	call.on('reject', handleDisconnectedIncomingCall);
}

// ACCEPT INCOMING CALL

function acceptIncomingCall(call: Call) {
	call.accept();

	//update UI
	console.log('Accepted incoming call.');
	// incomingCallAcceptButton.classList.add('hide');
	// incomingCallRejectButton.classList.add('hide');
	// incomingCallHangupButton.classList.remove('hide');
}

// REJECT INCOMING CALL

function rejectIncomingCall(call: Call) {
	call.reject();
	console.log('Rejected incoming call');
	// resetIncomingCallUI();
}

// HANG UP INCOMING CALL

function hangupIncomingCall(call: Call) {
	call.disconnect();
	console.log('Hanging up incoming call');
	// resetIncomingCallUI();
}

// HANDLE CANCELLED INCOMING CALL

function handleDisconnectedIncomingCall() {
	console.log('Incoming call ended.');
	// resetIncomingCallUI();
}

// MAKE AN OUTGOING CALL

export async function makeOutgoingCall(device: Device, to: string) {
	var params = {
		// get the phone number to call from the DOM
		To: to,
	};

	if (device) {
		console.log(`Attempting to call ${params.To} ...`);

		// Twilio.Device.connect() returns a Call object
		const call = await device.connect({ params });

		// add listeners to the Call
		// "accepted" means the call has finished connecting and the state is now "open"
		// call.on('accept', updateUIAcceptedOutgoingCall);
		// call.on('disconnect', updateUIDisconnectedOutgoingCall);
		// call.on('cancel', updateUIDisconnectedOutgoingCall);

		// outgoingCallHangupButton.onclick = () => {
		// 	console.log('Hanging up ...');
		// };
	} else {
		console.log('Unable to make call.');
	}
}

export function disconnectCall(call: Call) {
	call.disconnect();
}

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
export function isAValidPhoneNumber(number: string) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}