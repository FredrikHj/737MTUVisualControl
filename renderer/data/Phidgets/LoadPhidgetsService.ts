import generalTexts from '../GeneralTexts'; 
import { initializeStore } from "../../store";
import serviceServerConfig from "../serviceServerConfig";
import { setServicesConnected } from "../../redux/ThrottleReadySlicer";
import { setConnected, setConBottonShowable, setLabelConButton, setStateName, setErrorOccured, setConnectionInfo  } from '../../redux/PhidgetsSlicer';

const phidget22 = require("./libraries/phidget22");

export var LoadPhidgetsService = async() =>{
    
    var phidgetsConn = new phidget22.NetworkConnection({
        hostname: serviceServerConfig["phidgets"]["hostname"],
        port: serviceServerConfig["phidgets"]["port"],
        name: "Phidget Server Connection",
        passwd: "",
        onAuthenticationNeeded: function() { return "password"; },
        onError: () => {
            //console.log("Phidgets Networkserver - Connection Error:", msg);

            initializeStore.dispatch(setErrorOccured(
                {
                    isError: true, 
                    errorMessegnes: generalTexts.conStates.phidgets["programError"],
                }
            ));
        },
        onConnect: function() {
            console.log("Phidgets Networkserver - Connection is established and MTU is ready to work");
            
            // Set the staates in Store
                initializeStore.dispatch(setConBottonShowable(false));
                initializeStore.dispatch(setConnected(true));
                initializeStore.dispatch(setLabelConButton(generalTexts.conButton["disconnect"]));  
                initializeStore.dispatch(setStateName(generalTexts.conStates.phidgets.webService["started"]));

            setTimeout(() => {
                    initializeStore.dispatch(setConnectionInfo({
                    dataReceived: true,
                    receivedData: {     
                        serverLocation: serviceServerConfig.phidgets["hostname"],
                        port: serviceServerConfig.phidgets["port"],
                        messegnes: generalTexts.conStates.phidgets.webService["started"], 
                        connect: true
                    }
                }));
            }, 1000);
            
            initializeStore.dispatch(setErrorOccured({
                    isError: false,
              }
            ));
        },
        onDisconnect: function() { 
            console.log("Phidgets Networkserver - Disconnected");
            
            initializeStore.dispatch(setConnected(false));
            initializeStore.dispatch(setLabelConButton(generalTexts.conButton["connect"]));  
            initializeStore.dispatch(setStateName(""));

            // Sett if all nonen of the services are disconnected
                initializeStore.dispatch(setServicesConnected(false));

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
                    errorMessegnes: generalTexts.conStates.phidgets["programError"],
                }
            ));
        }
    });
    
    await phidgetsConn.connect().then(() => {})
}