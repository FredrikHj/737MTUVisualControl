import { initializeStore } from "../../store";
import { phidgetsAPIInstances, phidgetsDevicesSerialNumber, phidgetsDevicesChannel } from './PhidgetsControl/APIFunctions';
import Throttle737TH2_RevSlicer from '../../redux/Throttle737TH2_RevSlicer';
import Throttle737FlapsSlicer from '../../redux/Throttle737FlapsSlicer';

var InitilizeThrottleController: {
        test: any,
        speedbrake: any,
        throttle1: any,
        throttle2: any,
        flaps: any, 
        startLevers: any,
} = {            
        test: async(fsuipcInstance: object) =>{
        
        },    
        speedbrake: async( fsuipcInstance: object) =>{
                var fsuipcInstance = currentInstances["fsuipc"];
                    console.log('currentInstances of fsuipc:', fsuipcInstance);
        
                var phidgetsInstance = currentInstances["phidgets"];
                    console.log('currentInstances of phidgets:', phidgetsInstance);
        
                
        
        },
        throttle1: async( fsuipcInstance: object) =>{
                var BLDCControllerThrl1DCMotor = phidgetsAPIInstances.DCBSLControllerTHL1["blDCMotor"]();
                var BLDCControllerThrl1TemperatureSensor = phidgetsAPIInstances.DCBSLControllerTHL1["temperatureSensor"]();
                var BLDCControllerThrl1PossSensor = phidgetsAPIInstances.DCBSLControllerTHL1["motorPositionSensor"]();

                var BLDCControllerThrl1SerieNr = phidgetsDevicesSerialNumber.vintHub["seriaNr"](668208);
        
              
                var BLDCControllerThrl1HubPort = phidgetsDevicesSerialNumber.vintHub["portNr"](0);
                BLDCControllerThrl1DCMotor.setDeviceSerialNumber(BLDCControllerThrl1SerieNr);
                BLDCControllerThrl1DCMotor.setHubPort(BLDCControllerThrl1HubPort);
                BLDCControllerThrl1TemperatureSensor.setDeviceSerialNumber(BLDCControllerThrl1SerieNr);
                BLDCControllerThrl1TemperatureSensor.setHubPort(BLDCControllerThrl1HubPort);
                BLDCControllerThrl1PossSensor.setDeviceSerialNumber(BLDCControllerThrl1SerieNr);
                BLDCControllerThrl1PossSensor.setHubPort(BLDCControllerThrl1HubPort);
        
        },
        throttle2: async( fsuipcInstance: object) =>{
                var BLDCControllerThrl2DCMotor = phidgetsAPIInstances.DCBSLControllerTHL2["blDCMotor"]();
                var BLDCControllerThrl2TemperatureSensor = phidgetsAPIInstances.DCBSLControllerTHL2["temperatureSensor"]();
                var BLDCControllerThrl2PossSensor = phidgetsAPIInstances.DCBSLControllerTHL2["motorPositionSensor"]();      
        },
        flaps: async( fsuipcInstance: object) =>{
        
        },

        startLevers: async( fsuipcInstance: object) =>{
        
        },           
       /*         
        

        console.log("None phidgetInstance since the needed API is already the file!");
        console.log('737Throttle´s services are all connnected and the throttle can move to action :)');
        
         Phidgets --------------------------------------------------------------------------------------------------------------------
         Get the needed API
        var led64AdvBoard = phidgetsAPIInstances["led_64Adv"]();
        
         Set devices serialNumbers
        led64AdvBoard.setDeviceSerialNumber = phidgetsDevicesSerialNumber["phidgetLED_64Adv"](524938);

        
  
        
         Set devices Channels
        led64AdvBoard.setDeviceChannel = phidgetsDevicesChannel["0"];

         Run functions of the Trottle and import FSUIPC instance
                // SpeedBrake       
                instances["phidgets"] = {BLDCControllerThrl1DCMotor, BLDCControllerThrl1TemperatureSensor, BLDCControllerThrl1PossSensor};
                RunThrottle["speedbrake"](instances);               
        /*
        
         Assign the handler that will be called when the event occurs
        ch.onAttach = function() {
            console.log('Phidget Attached!')
        }
        await ch.open(5000);
        
        
        await ch.setDutyCycle(0.5);
        console.log("dutyCycle: " + dutyCycle);
        
        await ch.setLEDCurrentLimit(0.02);
        const LEDCurrentLimit = ch.data.LEDCurrentLimit["0.02"];
        console.log("LEDCurrentLimit: " + LEDCurrentLimit);
        var VOLTS_5_0 = Number;
        await ch.setLEDForwardVoltage(VOLTS_5_0);

        //const LEDForwardVoltage = ch.setLEDForwardVoltage(phidget22.LEDForwardVoltage.VOLTS_5_0);
        //console.log("LEDForwardVoltage: " + LEDForwardVoltage);
        console.log('closed mode :', mode);
        //console.log('ch :', ch);
        //await ch.close(2000);
        //process.exit(1);
        */
}
export default InitilizeThrottleController;