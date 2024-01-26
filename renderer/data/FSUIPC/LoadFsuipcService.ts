import { initializeStore } from "../../store";

import generalTexts from '../GeneralTexts'; 
import loadFSUIPCConInfo from "./LoadFSUIPCConInfo";
import serviceServerConfig from "../serviceServerConfig";
import updateFSUIPCInstance from "../WebsocketInstances";
import { setServicesConnected } from "../../redux/ThrottleReadySlicer";

import { setConnected, setConBottonShowable, setLabelConButton, setStateName, setErrorOccured, setConnectionInfo  } from '../../redux/FSUIPCSlicer';
import {makeFSUIPCInstanceAvailable} from "./AvailabilityFSUIPCInstance";

var tryConnection = (fsuipcInstance: any) => {
    fsuipcInstance.onopen = () => {
        console.log("FSUIPC Websocket - Connected");
        
        initializeStore.dispatch(setConBottonShowable(false));
        initializeStore.dispatch(setConnected(true));
        initializeStore.dispatch(setLabelConButton(generalTexts.conButton["disconnect"]));  
        initializeStore.dispatch(setStateName(generalTexts.conStates.fsuipc.webService["started"]));
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
        initializeStore.dispatch(setLabelConButton(generalTexts.conButton["connect"])); 
        initializeStore.dispatch(setStateName(""));

        setTimeout(() => {
            initializeStore.dispatch(setConnectionInfo({
                dataReceived: false,
                receivedData: {}
            }
        ));
        }, 1000);

        initializeStore.dispatch(setErrorOccured(
            {
                isError: true,  
                errorMessegnes: generalTexts.conStates.fsuipc["programError"],
            } 
        ));
        updateFSUIPCInstance(null);
        LoadFsuipcService();

        // Sett if all nonen of the services are disconnected
           initializeStore.dispatch(setServicesConnected(false));

    };
    fsuipcInstance.onerror  = () => {
        console.log("FSUIPC Websocket - Connection Error:");
        
        setTimeout(() => {
            initializeStore.dispatch(setErrorOccured(
                {
                    isError: true, 
                    errorMessegnes: generalTexts.conStates.fsuipc["programError"],
                } 
            ));
        }, 1000);
        LoadFsuipcService();
    };
}

var LoadFsuipcService = () =>{ 
    // Initilize instance
        var fsuipcInstance: any = null;
        
        fsuipcInstance = new WebSocket(`ws://localhost:2048/fsuipc/`, "fsuipc");
        // Make the instance available for the InitilizeMTUFunction component
        makeFSUIPCInstanceAvailable(fsuipcInstance);
        
        tryConnection(fsuipcInstance);

    }

export default LoadFsuipcService;