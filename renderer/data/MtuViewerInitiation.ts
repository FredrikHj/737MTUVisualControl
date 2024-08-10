/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

//Initilize Socket.IO
import { io } from "socket.io-client";
import checkReduxStoreTree from"./CheckStoreState";

import { setIsMtuServerConnected, setMtuServerConnectionMess, setIsMtuServerError, setMtuServerErrorMess, setErrorMessCreatedByServer} from "../redux/MtuServerSlicer";
import { 
  setIsPhidgetsConnected, 
  setPhidgetsConnectionMess, 
  setIsPhidgetsServerError, 
  setPhidgetsServerErrorMess,
  setPhidgetsConLost,
  setPhidgetsConLostMess,
  setPhidgetsServerHost,
  setPhidgetsServerPort,
} from "../redux/PhidgetsSlicer";
import { setIsfsuipcConnected, setFsuipcConnectionMess } from "../redux/FSUIPCSlicer";
import serverConfig from "./ServerConfig";
import { log } from 'console';
import { truncate } from 'original-fs';
import RequestSocketIOServer from '../RequestSocketIOServer';

// Sett type of data
  var nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
  let mtuViewerInitiation = () => {
    initializeStore.subscribe(checkReduxStoreTree);  
    console.log("fews");
    const socket: any = RequestSocketIOServer();
    console.log('socket :', socket);

    // If there is no server connection at al at the startup
      if(socket.connected === false){
        initializeStore.dispatch(setIsMtuServerConnected(false));
        initializeStore.dispatch(setMtuServerConnectionMess("Not Connected"));
        initializeStore.dispatch(setPhidgetsConnectionMess("Not Connected"));
        initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));
      }
    socket.on("connect", () => {
      //Begin listening for MTU Sever connection

      socket.on("mtuInitiation", (data: any, acknowledgements: any) => {
     
        console.log('Connection to MTUServer :');
        console.log('Incomming data :', data);
                  
        if(data.backend["serverAcknowledgements"] === 200){
            //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
            //Connection States for the MTU Server
            initializeStore.dispatch(setIsMtuServerConnected(data.backend["isConnected"]));
            initializeStore.dispatch(setMtuServerConnectionMess(data.backend["serverMess"]));

            //Connection States for Phidgets
              initializeStore.dispatch(setIsPhidgetsConnected(data.phidgets["isConnected"]));
              initializeStore.dispatch(setPhidgetsConnectionMess(data.phidgets["serverMess"]));
              initializeStore.dispatch(setIsPhidgetsServerError(data.phidgets["isError"]));
              initializeStore.dispatch(setPhidgetsConLost(data.phidgets["conLost"]));
              initializeStore.dispatch(setPhidgetsConLostMess(data.phidgets["conLostMess"]));
              
              initializeStore.dispatch(setPhidgetsServerHost(data.phidgets["serverHostname"]));
              initializeStore.dispatch(setPhidgetsServerPort(data.phidgets["serverPort"]));

        }
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
          initializeStore.dispatch(setMtuServerErrorMess("Server Error - Retrying!"));

        initializeStore.dispatch(setIsPhidgetsConnected(false));
        initializeStore.dispatch(setIsPhidgetsServerError(true));
          initializeStore.dispatch(setPhidgetsServerErrorMess("Server Error - Retrying!"));


        initializeStore.dispatch(setMtuServerConnectionMess("Not Connected"));
        initializeStore.dispatch(setPhidgetsConnectionMess("Not Connected"));
        initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));


        initializeStore.dispatch(setErrorMessCreatedByServer(reason));
        socket.emit("mtuInitiation", "Client disconnected");
      });     
  }
    
  export default mtuViewerInitiation;