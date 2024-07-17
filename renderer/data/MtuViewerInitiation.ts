/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

//Initilize Socket.IO
import { io } from "socket.io-client";

import { setMtuServerConnectionLoading, setIsMtuServerConnected, setMtuServerConnectionMess } from "../redux/MtuServerSlicer";
import { setIsPhidgetsConnected, setPhidgetsConLost, setConnectionMess} from "../redux/PhidgetsSlicer";
import {setTH1CurrentPoss } from "../redux/Throttle737TH1_RevSlicer";
import { log } from 'console';
import { truncate } from 'original-fs';

// Sett type of data
    var nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
    let mtuViewerInitiation = () => {
        console.log("fews");
        const socket = io('http://localhost:3000' , {
          withCredentials: false,
          extraHeaders: {
            "my-custom-header": "abcd"
          } 
        });
        console.log('socket :', socket);

        socket.on("connect", () => {
          // Listen on server if the connenction has disconnected
          socket.on("mtuInitiation", (data, serverAcknowledgements) => {
            serverAcknowledgements({
              status: 200,
            });

            socket.emit("mtuInitiation", true, (response: any) => {
              console.log('Server Response :', response);
              if(response.status === 200){
                //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
                  //Connection States for the MTU Server
                  initializeStore.dispatch(setIsMtuServerConnected(data.backend["isConnected"]));
                  //initializeStore.dispatch(setMtuServerConnectionMess(data.backend["serverMess"]));
  
                  //Connection States for Phidgets
                    //initializeStore.dispatch(setIsPhidgetsConnected(data.phidgets["isConnected"]));
                    //initializeStore.dispatch(setIsPhidgetsConnected(response.data.phidgets["isError"])); 
                    //initializeStore.dispatch(setConnectionMess(data.phidgets["serverMess"]));
              }
              console.log('data :', data);
            });
          });
        });


        // Client listener for a connection from a Socket.IO server if socket connected is true
        /* if(socket.connected === true){
          socket.on("connect", () => {
            // Listen on server if the connenction has disconnected
            socket.on("mtuInitiation", (reconnected, serverAcknowledgements) => {
                            serverAcknowledgements({
                status: 200,
              });
            });
            //  Initilaze the MTU Server
            socket.emit("mtuInitiation", true, (response: any) => {
              console.log('response from server:', response);
              
             
            });

          });
        }
        else {
          initializeStore.dispatch(setMtuServerConnectionLoading(true));
          initializeStore.dispatch(setIsMtuServerConnected(false));
          initializeStore.dispatch(setMtuServerConnectionMess("Not Connected!"));

        } */
          console.log("Socket Connection ID:", socket.id);
              /*        if(socket.id){
              //Save the incomming connection objects´ values into the Redux store created for the visual presentation of MTU states
                //Connection States for the MTU Server
                initializeStore.dispatch(setIsMtuServerConnected(response.backend["isConnected"]));
                initializeStore.dispatch(setMtuServerConnectionMess(response.backend["serverMess"]));
 
                //Connection States for Phidgets
                  initializeStore.dispatch(setIsPhidgetsConnected(response.phidgets["isConnected"]));
                  initializeStore.dispatch(setIsPhidgetsConnected(response.phidgets["isError"])); 
                  initializeStore.dispatch(setConnectionMess(response.phidgets["serverMess"])); 
            }  */
         
/*           socket.on("mtuInit", (arg, mtuServerAcknowledged) => {
            console.log("mtuInit", arg);

            // Incomming connection object
              var response = arg;


                    
          }); */
                  
                    /*           socket.on("disconnect", () => {
                      console.log(socket.id); // undefined
                      console.log(`Server unavailable`);
                      initializeStore.dispatch(setBackendNotFound(true));
              initializeStore.dispatch(setPhidgetsConLost(false));
              initializeStore.dispatch(setPhidgetsConLost(false));
              }); */
          // Client listener for a connection from the server
        
          
      }
      
    export default mtuViewerInitiation;