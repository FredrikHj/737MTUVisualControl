const phidget22 = require('phidget22');

async function runExample() {
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	await conn.connect();

	//Create your Phidget channels
	const digitalOutput0 = new phidget22.DigitalOutput();
	const digitalOutput1 = new phidget22.DigitalOutput();

	//Set addressing parameters to specify which channel to open (if any)
	digitalOutput0.setIsHubPortDevice(true);
	digitalOutput0.setHubPort(0);
	digitalOutput0.setDeviceSerialNumber(668208);
	digitalOutput1.setIsHubPortDevice(true);
	digitalOutput1.setHubPort(1);
	digitalOutput1.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	digitalOutput0.onAttach = () => {
		console.log('Attach [0]!');
	};

	digitalOutput0.onDetach = () => {
		console.log('Detach [0]!');
	};

	digitalOutput1.onAttach = () => {
		console.log('Attach [1]!');
	};

	digitalOutput1.onDetach = () => {
		console.log('Detach [1]!');
	};

	//Open your Phidgets and wait for attachment
	const openPromiseList = [];
	openPromiseList.push(digitalOutput0.open(5000));
	openPromiseList.push(digitalOutput1.open(5000));

	await Promise.all(openPromiseList);

	//Do stuff with your Phidgets here or in your event handlers.
	await digitalOutput0.setDutyCycle(1);
	await digitalOutput1.setDutyCycle(1);

	setTimeout(async () => {
		//Close your any Phidgets and connections once the program is done.
		await digitalOutput0.close();
		await digitalOutput1.close();
		conn.close();
		conn.delete();
	}, 5000);
}

runExample();
