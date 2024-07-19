/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

//Initilize Socket.IO
import { io } from "socket.io-client";
import checkReduxStoreTree from"./CheckStoreState";

import { setIsMtuServerConnected, setMtuServerConnectionMess, setIsMtuServerError, setMtuServerErrorMess, setErrorMessCreatedByServer} from "../redux/MtuServerSlicer";
import { setIsPhidgetsConnected, setPhidgetsConnectionMess} from "../redux/PhidgetsSlicer";
import { setIsfsuipcConnected, setFsuipcConnectionMess } from "../redux/FSUIPCSlicer";
import serverConfig from "./ServerConfig";
import { log } from 'console';
import { truncate } from 'original-fs';

// Sett type of data
  var nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
  let mtuViewerInitiation = () => {
    initializeStore.subscribe(checkReduxStoreTree);  
    console.log("fews");
    const socket = io(`http://${serverConfig.hostname}:${serverConfig.port}` , {
      withCredentials: false,
      extraHeaders: {
        "my-custom-header": "abcd"
      } 
    });
    console.log('socket :', socket);

    // If there is no server connection at al at the startup
      if(socket.connected === false){
        initializeStore.dispatch(setIsMtuServerConnected(false));
        initializeStore.dispatch(setMtuServerConnectionMess("Not Connected"));
        initializeStore.dispatch(setPhidgetsConnectionMess("Not Connected"));
        initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));
      }

    socket.on("connect", () => {
      // Listen on server if the connenction has disconnected
      socket.on("mtuInitiation", (data, serverAcknowledgements) => {
        serverAcknowledgements({
          status: 200,
        });

        socket.emit("mtuInitiation", true, (response: any) => {
          console.log('Server Response :', response);
          console.log('Incomming data :', data);
          if(response.status === 200){
            //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
              //Connection States for the MTU Server
              initializeStore.dispatch(setIsMtuServerConnected(data.backend["isConnected"]));
              initializeStore.dispatch(setMtuServerConnectionMess(data.backend["serverMess"]));

              //Connection States for Phidgets
                initializeStore.dispatch(setIsPhidgetsConnected(data.phidgets["isConnected"]));
                initializeStore.dispatch(setPhidgetsConnectionMess(data.phidgets["serverMess"]));
          }
        });
      });
      // If server unenspectively lost the connection
        socket.on("disconnect", (reason) => {
          console.log('Server unenspectively disconnected: ', reason);
          initializeStore.dispatch(setIsMtuServerConnected(false));
          initializeStore.dispatch(setIsMtuServerError(true));
            initializeStore.dispatch(setMtuServerErrorMess("Server Error - Retrying!"));

          initializeStore.dispatch(setMtuServerConnectionMess("Not Connected"));
          initializeStore.dispatch(setPhidgetsConnectionMess("Not Connected"));
          initializeStore.dispatch(setFsuipcConnectionMess("Not Connected"));
          initializeStore.dispatch(setErrorMessCreatedByServer(reason));
          
        }); 
    });     
  }
    
  export default mtuViewerInitiation;