/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

//Initilize Socket.IO
import { io } from "socket.io-client";

import { setIsPhidgetsConnected, setPhidgetsConLost, } from "../redux/PhidgetsSlicer";
import { log } from 'console';

// Sett type of data
    var nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
    let reqPhidgetConnection = () => {

        console.log("fews");
        const socket = io('http://localhost:3000' , {
            withCredentials: false,
            extraHeaders: {
              "my-custom-header": "abcd"
            } 
        });

        
        socket.on("connect", () => {
            console.log("Socketconnection ID:", socket.id); // x8WIv7-mJelg7on_ALbx
          });
       /*  setInterval(() => {
            axios.get("http://localhost:3000/RequestsPhidgetsConnect").then(response => {
                nodeServerActive = true;
                console.log('response : ', response.data);
                if(response.status === 200){
                    //Save the incomming connection value anf messagnes the Redux store created for the visual presentation of MTU states
                        //Connection States
                            var conStates = response.data;
                            initializeStore.dispatch(setIsPhidgetsConnected(conStates["isPhidgetsConnected"]));
                            initializeStore.dispatch(setIsPhidgetsConnected(conStates["phidgetServerError"])); 
                            initializeStore.dispatch(setBackendNotFound(false));    
                }
            }).
            catch(error => {
                console.log(`Server unavailable ${error}`);
                initializeStore.dispatch(setBackendNotFound(true));
                initializeStore.dispatch(setPhidgetsConLost(false));
                initializeStore.dispatch(setPhidgetsConLost(false));
            }); 
        }, 3000);  */
    }
  
export default reqPhidgetConnection; 