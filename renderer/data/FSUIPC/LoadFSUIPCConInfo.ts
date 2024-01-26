import VariousFSUIPCCommands from './FSUIPCCommandsObj';
import { initializeStore } from "../../store";
import { setConnectionInfo } from "../../redux/FSUIPCSlicer";

var loadFSUIPCConInfo = (fsuipcInstance: any) => {
    /*The following code will create a simple request with the command about.read. 
    This will get various information about the WebSocket Server and Flight Sim (if connected).
    This is a simple command that is just checking the connection is established */

    fsuipcInstance.send(JSON.stringify(VariousFSUIPCCommands.startUp.read["about"]));
    fsuipcInstance.onmessage = (msg: any) => {
        // parse the JSON string to a Javascript object
        var response = JSON.parse(msg.data);
        console.log('response :', response);
 
        initializeStore.dispatch(setConnectionInfo({
            dataReceived: true, 
            receivedData: response
        })); 
        setTimeout(() => {
        }, 1000);

    }
};
export default loadFSUIPCConInfo;