const phidget22 = require('phidget22');

async function runExample() {
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	await conn.connect();

	//Create your Phidget channels
	const digitalInput0 = new phidget22.DigitalInput();
	const digitalInput1 = new phidget22.DigitalInput();

	//Set addressing parameters to specify which channel to open (if any)
	digitalInput0.setIsHubPortDevice(true);
	digitalInput0.setHubPort(0);
	digitalInput0.setDeviceSerialNumber(668208);
	digitalInput1.setIsHubPortDevice(true);
	digitalInput1.setHubPort(1);
	digitalInput1.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	digitalInput0.onStateChange = (state) => {
		console.log('State [0]: ' + state.toString());
	};

	digitalInput0.onAttach = () => {
		console.log('Attach [0]!');
	};

	digitalInput0.onDetach = () => {
		console.log('Detach [0]!');
	};

	digitalInput1.onStateChange = (state) => {
		console.log('State [1]: ' + state.toString());
	};

	digitalInput1.onAttach = () => {
		console.log('Attach [1]!');
	};

	digitalInput1.onDetach = () => {
		console.log('Detach [1]!');
	};

	//Open your Phidgets and wait for attachment
	const openPromiseList = [];
	openPromiseList.push(digitalInput0.open(5000));
	openPromiseList.push(digitalInput1.open(5000));

	await Promise.all(openPromiseList);

	//Do stuff with your Phidgets here or in your event handlers.

	setTimeout(async () => {
		//Close your any Phidgets and connections once the program is done.
		await digitalInput0.close();
		await digitalInput1.close();
		conn.close();
		conn.delete();
	}, 5000);
}

runExample();
