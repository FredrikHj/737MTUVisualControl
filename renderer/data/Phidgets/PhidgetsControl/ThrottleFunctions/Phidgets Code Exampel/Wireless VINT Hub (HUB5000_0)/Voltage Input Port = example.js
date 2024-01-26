const phidget22 = require('phidget22');

async function runExample() {
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	await conn.connect();

	//Create your Phidget channels
	const voltageInput0 = new phidget22.VoltageInput();
	const voltageInput1 = new phidget22.VoltageInput();

	//Set addressing parameters to specify which channel to open (if any)
	voltageInput0.setIsHubPortDevice(true);
	voltageInput0.setHubPort(0);
	voltageInput0.setDeviceSerialNumber(668208);
	voltageInput1.setIsHubPortDevice(true);
	voltageInput1.setHubPort(1);
	voltageInput1.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	voltageInput0.onVoltageChange = (voltage) => {
		console.log('Voltage [0]: ' + voltage.toString());
	};

	voltageInput0.onAttach = () => {
		console.log('Attach [0]!');
	};

	voltageInput0.onDetach = () => {
		console.log('Detach [0]!');
	};

	voltageInput1.onVoltageChange = (voltage) => {
		console.log('Voltage [1]: ' + voltage.toString());
	};

	voltageInput1.onAttach = () => {
		console.log('Attach [1]!');
	};

	voltageInput1.onDetach = () => {
		console.log('Detach [1]!');
	};

	//Open your Phidgets and wait for attachment
	const openPromiseList = [];
	openPromiseList.push(voltageInput0.open(5000));
	openPromiseList.push(voltageInput1.open(5000));

	await Promise.all(openPromiseList);

	//Do stuff with your Phidgets here or in your event handlers.

	setTimeout(async () => {
		//Close your any Phidgets and connections once the program is done.
		await voltageInput0.close();
		await voltageInput1.close();
		conn.close();
		conn.delete();
	}, 5000);
}

runExample();
