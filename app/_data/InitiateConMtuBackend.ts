/* ================================================== ReqMTUControl ==================================================
Imports module */
import { initializeStore, AppDispatch } from '../_reduxStore/CommonStore';
import { useAppDispatch, useAppSelector, useAppStore } from "../_reduxStore/StoreHooks";

//Initilize Socket.IO
import { io } from "socket.io-client";
import checkReduxStoreTree from"./CheckStoreState";

import { 
  setIsMtuServerConnected, 
  setMtuServerMess,
  setIsMtuServerError, 
  setMtuServerErrorMess,
  setServerHost,
  setServerConId
} from "../_reduxStore/reducers/MtuServerSlicer";

import { 
  setIsPhidgetsConnected, 
  setPhidgetsServerMess, 
  setIsPhidgetsServerError, 
  setPhidgetsServerErrorMess,
  setPhidgetsConLost,
  setPhidgetsConLostMess,
  setPhidgetsServerHost,
  setPhidgetsServerPort
} from "../_reduxStore/reducers/PhidgetsSlicer";
import { setIsfsuipcConnected, setFsuipcConnectionMess } from "../_reduxStore/reducers/FSUIPCSlicer";
import serverConfig from "./ServerConfig";

import RequestMTUServer from '../RequestMTUServer';

// Sett type of data
  const nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
  let InitiateConMtuBackend = () => {
    // Call the redux Store every time it is dispach
      initializeStore.subscribe(checkReduxStoreTree);  

    const socket: any = RequestMTUServer();
    console.log('socket :', socket);

    // If there is no server connection at al at the startup
      if(socket.connected === false){
        initializeStore.dispatch(setIsMtuServerConnected(false));
        initializeStore.dispatch(setIsMtuServerError(true));
        initializeStore.dispatch(setMtuServerMess("Not Connected"));
        initializeStore.dispatch(setPhidgetsServerMess("Not Connected"));
        initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));
        initializeStore.dispatch(setMtuServerErrorMess("Server Error - Retrying!"));
        setMtuServerErrorMess
      }
    //Begin listening for MTU Sever connection
      socket.on("connect", () => {

        socket.on("mtuInitiation", (data: any, acknowledgements: any) => {
          
          console.log('Incomming data from MTUServer: ', data);
          console.log('Is MTUServer conneted? ', data.backend["isConnected"]);
          console.log('Is PhidgetsServer conneted? ', data.phidgets["isConnected"]);

          console.log('Connection to PhidgetsServer :');
          console.log('Is connected :', data.phidgets["isConnected"]);
                    
          if(data.backend["serverAcknowledgements"] === 200){
              //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
              //Connection States for the MTU Server
            initializeStore.dispatch(setIsMtuServerConnected(data.backend["isConnected"]));
            initializeStore.dispatch(setMtuServerMess(data.backend["serverMess"]));
            initializeStore.dispatch(setServerConId(data.backend["serverClientConId"]));

              //Connection States for Phidgets
              initializeStore.dispatch(setIsPhidgetsConnected(data.phidgets["isConnected"]));
              initializeStore.dispatch(setPhidgetsServerMess(data.phidgets["serverMess"]));
              initializeStore.dispatch(setIsPhidgetsServerError(data.phidgets["isError"]));

              initializeStore.dispatch(setPhidgetsConLost(data.phidgets["conLost"]));
              initializeStore.dispatch(setPhidgetsConLostMess(data.phidgets["conLostMess"]));
              initializeStore.dispatch(setPhidgetsServerHost(data.phidgets["serverHostname"]));
              initializeStore.dispatch(setPhidgetsServerPort(data.phidgets["serverPort"]));

          }
          // To be sent to server as a response
            acknowledgements({
                status: 200,
            });
        });
      });
    // If server unenspectively lost the connection
      socket.on("disconnect", (reason: any) => { 
        console.log('Server unenspectively disconnected: ', reason);
        initializeStore.dispatch(setIsMtuServerConnected(false));
        initializeStore.dispatch(setIsMtuServerError(true));

        initializeStore.dispatch(setIsPhidgetsConnected(false));
        initializeStore.dispatch(setIsPhidgetsServerError(true));
        


        initializeStore.dispatch(setMtuServerErrorMess("Server Error - Retrying!"));
        initializeStore.dispatch(setMtuServerMess("Not Connected"));
        
        initializeStore.dispatch(setPhidgetsServerMess("Not Connected"));
        initializeStore.dispatch(setPhidgetsServerErrorMess("Server Error - Retrying!"));

        initializeStore.dispatch(setServerConId(""));

        /* 
       initializeStore.dispatch(setMTUServerConnectionStatusMess("Not Connected"));
       initializeStore.dispatch(setPhidgetsConnectionMess("Not Connected"));
       initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));

       initializeStore.dispatch(setErrorMessCreatedByServer(reason));
        socket.emit("mtuInitiation", "Client disconnected"); */
      });
  }
    
  export default InitiateConMtuBackend;