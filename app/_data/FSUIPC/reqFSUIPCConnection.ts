import { initializeStore } from "../../_reduxStore/_reduxStore/CommonStore";

import loadFSUIPCConInfo from "./LoadFSUIPCConInfo";
import serviceServerConfig from "../ServerConfig";
import updateFSUIPCInstance from "./FSUIPCListener";

import { setIsfsuipcConnected, setfsuipcConLost, setwWebsocketNotFound } from '../../_reduxStore/reducers/FSUIPCSlicer';

const reqFSUIPCConnection = () => {
    const fsuipcInstance: any = null;

    fsuipcInstance = new WebSocket(`ws://localhost:2048/fsuipc/`, "fsuipc");
    console.log("fsuipcInstance", fsuipcInstance);
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