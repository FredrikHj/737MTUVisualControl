import { initializeStore } from "../../store";

import loadFSUIPCConInfo from "./LoadFSUIPCConInfo";
import serviceServerConfig from "../serviceServerConfig";
import updateFSUIPCInstance from "./FSUIPCListener";
import { setServicesConnected } from "../../redux/ThrottleReadySlicer";

import { setIsfsuipcConnected, setfsuipcConLost, setwWebsocketNotFound } from '../../redux/FSUIPCSlicer';

var reqFSUIPCConnection = () => {
    var fsuipcInstance: any = null;

    fsuipcInstance = new WebSocket(`ws://localhost:2048/fsuipc/`, "fsuipc");
    
    fsuipcInstance.onopen = () => {
        console.log("FSUIPC Websocket - Connected");
        
        initializeStore.dispatch(setIsfsuipcConnected(true));
        //initializeStore.dispatch(setStateName("Connected"));
        loadFSUIPCConInfo(fsuipcInstance);
        
        //Share the instance with the Store so it will be easier to call it
            updateFSUIPCInstance(fsuipcInstance);
    };
    fsuipcInstance.onclose = () => {
        console.log("FSUIPC Websocket - Disconnected");

        initializeStore.dispatch(setIsfsuipcConnected(false));
        fsuipcInstance = null;
        //initializeStore.dispatch(setStateName(""));


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
        console.log("FSUIPC Websocket unavailable");
        initializeStore.dispatch(setwWebsocketNotFound(true));
        initializeStore.dispatch(setIsfsuipcConnected(false));
        initializeStore.dispatch(setfsuipcConLost(false));
        reqFSUIPCConnection();
    };
}
export default reqFSUIPCConnection;