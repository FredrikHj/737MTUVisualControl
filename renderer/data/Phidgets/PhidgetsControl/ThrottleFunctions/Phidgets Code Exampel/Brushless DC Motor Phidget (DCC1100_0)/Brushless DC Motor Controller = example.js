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
	const bldcMotor0 = new phidget22.BLDCMotor();

	//Set addressing parameters to specify which channel to open (if any)
	bldcMotor0.setHubPort(0);
	bldcMotor0.setDeviceSerialNumber(668208);

	//Assign any event handlers you need before calling open so that no events are missed.
	bldcMotor0.onAttach = () => {
		console.log('Attach!');
	};

	bldcMotor0.onDetach = () => {
		console.log('Detach!');
	};

	//Open your Phidgets and wait for attachment
	await bldcMotor0.open(5000);

	//Do stuff with your Phidgets here or in your event handlers.
	await bldcMotor0.setTargetVelocity(1);

	process.stdin.on('keypress', async (str, key) => {
		//Close your any Phidgets and connections once the program is done.
		await bldcMotor0.close();
		conn.close();
		conn.delete();
		process.exit(0);
	});
}

runExample();
