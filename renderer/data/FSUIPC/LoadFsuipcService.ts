import { initializeStore } from "../../store";

import loadFSUIPCConInfo from "./LoadFSUIPCConInfo";
import serviceServerConfig from "../serviceServerConfig";
import updateFSUIPCInstance from "./FSUIPCListener";
import { setServicesConnected } from "../../redux/ThrottleReadySlicer";

import { setConnected, setStateName, setErrorOccured, setConnectionInfo  } from '../../redux/FSUIPCSlicer';
import reqFSUIPCConnection from"./reqFSUIPCConnection";

var tryFSUIPCConnection = (fsuipcInstance: any) => {
    fsuipcInstance.onopen = () => {
        console.log("FSUIPC Websocket - Connected");
        
        initializeStore.dispatch(setConnected(true));
        initializeStore.dispatch(setStateName("Connected"));
        initializeStore.dispatch(setErrorOccured({
                isError: false,
            }
        ));
        loadFSUIPCConInfo(fsuipcInstance);
        
        //Share the instance with the Store so it will be easier to call it
            updateFSUIPCInstance(fsuipcInstance);
    };
    fsuipcInstance.onclose = () => {
        console.log("FSUIPC Websocket - Disconnected");

        initializeStore.dispatch(setConnected(false));
        initializeStore.dispatch(setStateName(""));

        setTimeout(() => {
            initializeStore.dispatch(setConnectionInfo({
                dataReceived: false,
                receivedData: {}
            }
        ));
        }, 1000);

       /*  initializeStore.dispatch(setErrorOccured(
            {
                isError: true,  
                errorMessegnes: generalTexts.conStates.fsuipc["programError"],
            } 
        )); */
        updateFSUIPCInstance(null);
        reqFSUIPCConnection();

        // Sett if all nonen of the services are disconnected
           initializeStore.dispatch(setServicesConnected(false));

    };
    fsuipcInstance.onerror  = () => {
        console.log("FSUIPC Websocket - Connection Error:");
        
        setTimeout(() => {
           /*  initializeStore.dispatch(setErrorOccured(
                {
                    isError: true, 
                    errorMessegnes: generalTexts.conStates.fsuipc["programError"],
                } 
            )); */
        }, 1000);
        reqFSUIPCConnection();
    };
}
export default tryFSUIPCConnection;