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
  setPhidgetsServerPort,
  setPhidgetsControllerBoardsObj,
} from "../_reduxStore/reducers/PhidgetsSlicer";
import { setIsfsuipcConnected, setFsuipcConnectionMess } from "../_reduxStore/reducers/FSUIPCSlicer";
import serverConfig from './ServerConfig';

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
          var pathToMtuConParts = data.MTUConParts;
          var pathToServicePhidgets = data.servicesConParts;
          console.log('Incomming data from MTUServer: ', data);
          console.log('Is MTUServer conneted? ', pathToMtuConParts.backend["isConnected"]);
          console.log('Is PhidgetsServer conneted? ', pathToMtuConParts.phidgets["isConnected"]);

          console.log('Connection to PhidgetsServer :');
          console.log('Is connected :', pathToMtuConParts.phidgets["isConnected"]);
                    
          if(pathToMtuConParts.backend["serverAcknowledgements"] === 200){
            //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
            //Connection States for the MTU Server
              initializeStore.dispatch(setIsMtuServerConnected(pathToMtuConParts.backend["isConnected"]));
              initializeStore.dispatch(setMtuServerMess(pathToMtuConParts.backend["serverMess"]));
              initializeStore.dispatch(setServerConId(pathToMtuConParts.backend["serverClientConId"]));

            //Connection States for Phidgets
              initializeStore.dispatch(setIsPhidgetsConnected(pathToMtuConParts.phidgets["isConnected"]));
              initializeStore.dispatch(setPhidgetsServerMess(pathToMtuConParts.phidgets["serverMess"]));
              initializeStore.dispatch(setIsPhidgetsServerError(pathToMtuConParts.phidgets["isError"]));

              initializeStore.dispatch(setPhidgetsConLost(pathToMtuConParts.phidgets["conLost"]));
              initializeStore.dispatch(setPhidgetsConLostMess(pathToMtuConParts.phidgets["conLostMess"]));
              initializeStore.dispatch(setPhidgetsServerHost(pathToMtuConParts.phidgets["serverHostname"]));
              initializeStore.dispatch(setPhidgetsServerPort(pathToMtuConParts.phidgets["serverPort"]));

              // Set con info for Controllerboards
              initializeStore.dispatch(setPhidgetsControllerBoardsObj(pathToServicePhidgets));
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