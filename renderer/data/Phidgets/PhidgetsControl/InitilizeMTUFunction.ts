import { initializeStore } from "../../../store";
import BSLControllerTHL1 from "./ThrottleFunctions/BSLControllerTHL1";
import { setServicesConnected } from "../../../redux/ThrottleReadySlicer";
import {AvailabilityOfFSIPCInstance$} from "../../FSUIPC/AvailabilityFSUIPCInstance";

var serviceConnected = false;

// Recusive function for check if service is 
//var isServicesConnected = () => { 
    
var InitilizeMTUFunction = () => {
    
    
    var test = AvailabilityOfFSIPCInstance$;  
    console.log('test :', test);
    //Check services connection
        var initializeStoreState = initializeStore.getState();
        var isFsuipcConnected = initializeStoreState.serviceFSUIPC["connected"];
        var isPhidgetsConnected = initializeStoreState.servicePHIDGETS["connected"];
    
    // Sett if all services are connected
    initializeStore.dispatch(setServicesConnected(true));

    console.log("FSUIPC Connnected? - "+ isFsuipcConnected);
    console.log("Phidgets Connected? - "+ isPhidgetsConnected);

    if(isPhidgetsConnected === true) {
        console.log("Ready to InitilizeMTUFunctions");
        BSLControllerTHL1();
    }
}
export default InitilizeMTUFunction;