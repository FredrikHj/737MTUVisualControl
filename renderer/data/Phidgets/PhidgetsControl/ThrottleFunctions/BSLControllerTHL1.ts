const phidget22 = require('phidget22');

var BSLControllerTHL1 = async () => {
    console.log("BSLControllerTHL1 is ready!");
    
  
        // Get Instances
            var THL1BlDcMotor1: any = new phidget22.BLDCMotor();
            var THL1BlDcMotorPosSensor: any = new phidget22.MotorPositionController();
            var THL1BlDcTempSensor: any = new phidget22.TemperatureSensor();
            
            // Get some information for the motor to get function
            // Set the Vint HubPort
            THL1BlDcMotor1.setHubPort(0);
            // Serial number = If Vint Hub is in use use it as serialnr
            THL1BlDcMotor1.setDeviceSerialNumber(668208);
            //THL1BlDcMotorPosSensor.
            
            // The channel on each device is set 
            //THL1BlDcMotor1.channel = 0;
            // Open the connection and the conection will be timed out in (ms)
            
            //Assign any event handlers you need before calling open so that no events are missed.
	        THL1BlDcMotor1.onAttach = () => {
                console.log('Attach!');
            };
            
            await THL1BlDcMotor1.open(5000);
            
            console.log('THL1BlDcMotor1?:', THL1BlDcMotor1);
            //await THL1BlDcMotor1.rescaleFactor(1);
            await THL1BlDcMotor1.setTargetVelocity(1);
            //await THL1BlDcMotor1.setAcceleration(0.1)
            //await THL1BlDcMotor1.setStallVelocity(400);
	
        //ch.position
}

export default BSLControllerTHL1;