const phidget22 = require('phidget22');
/*--- Required for keyboard input ---*/
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if(process.stdin.isTTY)
	process.stdin.setRawMode(true);
/*-----------------------------------*/

async function runExample() {
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	await conn.connect();

	//Create your Phidget channels
	const motorPositionController0 = new phidget22.MotorPositionController();

	//Set addressing parameters to specify which channel to open (if any)
	motorPositionController0.setHubPort(0);
	motorPositionController0.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	motorPositionController0.onAttach = () => {
		console.log('Attach!');
	};

	motorPositionController0.onDetach = () => {
		console.log('Detach!');
	};

	//Open your Phidgets and wait for attachment
	await motorPositionController0.open(5000);

	//Do stuff with your Phidgets here or in your event handlers.
	await motorPositionController0.setTargetPosition(50000);
	await motorPositionController0.setEngaged(true);

	process.stdin.on('keypress', async (str, key) => {
		//Close your any Phidgets and connections once the program is done.
		await motorPositionController0.close();
		conn.close();
		conn.delete();
		process.exit(0);
	});
}

runExample();
