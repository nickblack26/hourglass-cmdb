import { Device } from '@twilio/voice-sdk';

async function getAudioDevices(device: Device) {
	await navigator.mediaDevices.getUserMedia({ audio: true });
	updateAllAudioDevices.bind(device);
}

function updateAllAudioDevices(device?: Device) {
	if (device) {
		// updateDevices(speakerDevices, device.audio.speakerDevices.get());
		// updateDevices(ringtoneDevices, device.audio.ringtoneDevices.get());
	}
}

function updateOutputDevice(device: Device) {
	// const selectedDevices = Array.from(speakerDevices.children)
	// 	.filter((node) => node.selected)
	// 	.map((node) => node.getAttribute('data-id'));
	// if (device.audio) {
	// 	device.audio.speakerDevices.set(selectedDevices);
	// }
}

function updateRingtoneDevice() {
	// const selectedDevices = Array.from(ringtoneDevices.children)
	// 	.filter((node) => node.selected)
	// 	.map((node) => node.getAttribute('data-id'));
	// device.audio.ringtoneDevices.set(selectedDevices);
}

// function bindVolumeIndicators(call) {
// 	call.on('volume', function (inputVolume, outputVolume) {
// 		var inputColor = 'red';
// 		if (inputVolume < 0.5) {
// 			inputColor = 'green';
// 		} else if (inputVolume < 0.75) {
// 			inputColor = 'yellow';
// 		}

// 		inputVolumeBar.style.width = Math.floor(inputVolume * 300) + 'px';
// 		inputVolumeBar.style.background = inputColor;

// 		var outputColor = 'red';
// 		if (outputVolume < 0.5) {
// 			outputColor = 'green';
// 		} else if (outputVolume < 0.75) {
// 			outputColor = 'yellow';
// 		}

// 		outputVolumeBar.style.width = Math.floor(outputVolume * 300) + 'px';
// 		outputVolumeBar.style.background = outputColor;
// 	});
// }

// Update the available ringtone and speaker devices
// function updateDevices(selectEl, selectedDevices) {
// 	selectEl.innerHTML = '';

// 	device.audio.availableOutputDevices.forEach(function (device, id) {
// 		var isActive = selectedDevices.size === 0 && id === 'default';
// 		selectedDevices.forEach(function (device) {
// 			if (device.deviceId === id) {
// 				isActive = true;
// 			}
// 		});

// 		var option = document.createElement('option');
// 		option.label = device.label;
// 		option.setAttribute('data-id', id);
// 		if (isActive) {
// 			option.setAttribute('selected', 'selected');
// 		}
// 		selectEl.appendChild(option);
// 	});
// }
