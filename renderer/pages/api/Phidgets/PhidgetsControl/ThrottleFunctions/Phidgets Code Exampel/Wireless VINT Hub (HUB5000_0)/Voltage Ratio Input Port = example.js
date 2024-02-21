const phidget22 = require('phidget22');

async function runExample() {
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	await conn.connect();

	//Create your Phidget channels
	const voltageRatioInput0 = new phidget22.VoltageRatioInput();
	const voltageRatioInput1 = new phidget22.VoltageRatioInput();

	//Set addressing parameters to specify which channel to open (if any)
	voltageRatioInput0.setIsHubPortDevice(true);
	voltageRatioInput0.setHubPort(0);
	voltageRatioInput0.setDeviceSerialNumber(668208);
	voltageRatioInput1.setIsHubPortDevice(true);
	voltageRatioInput1.setHubPort(1);
	voltageRatioInput1.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	voltageRatioInput0.onVoltageRatioChange = (voltageRatio) => {
		console.log('VoltageRatio [0]: ' + voltageRatio.toString());
	};

	voltageRatioInput0.onAttach = () => {
		console.log('Attach [0]!');
	};

	voltageRatioInput0.onDetach = () => {
		console.log('Detach [0]!');
	};

	voltageRatioInput1.onVoltageRatioChange = (voltageRatio) => {
		console.log('VoltageRatio [1]: ' + voltageRatio.toString());
	};

	voltageRatioInput1.onAttach = () => {
		console.log('Attach [1]!');
	};

	voltageRatioInput1.onDetach = () => {
		console.log('Detach [1]!');
	};

	//Open your Phidgets and wait for attachment
	const openPromiseList = [];
	openPromiseList.push(voltageRatioInput0.open(5000));
	openPromiseList.push(voltageRatioInput1.open(5000));

	await Promise.all(openPromiseList);

	//Do stuff with your Phidgets here or in your event handlers.

	setTimeout(async () => {
		//Close your any Phidgets and connections once the program is done.
		await voltageRatioInput0.close();
		await voltageRatioInput1.close();
		conn.close();
		conn.delete();
	}, 5000);
}

runExample();
