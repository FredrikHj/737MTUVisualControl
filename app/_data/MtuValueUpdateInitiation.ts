/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../_reduxStore/CommonStore";

//Initilize Socket.IO
import { io } from "socket.io-client";
import checkReduxStoreTree from"./CheckStoreState";

import { 
  setSpeedBrakeLeverPoss,
  setParkingBrakeLeverPoss,
  setTh1LeverPoss,
  setTh1RevPoss,
  setTh2LeverPoss,
  setTh2LRevPoss,
  setFlapsLeverPoss
} from "../_reduxStore/reducers/ThrottleUpdatingValuesSlicer";
import {updateSpeedBrakeLeverPossValue} from"./RerenderComponentOnStorageChanges";

import serverConfig from "./ServerConfig";

import RequestSocketIOServer from '../RequestSocketIOServer';
// var mtuValueUpdateObj: any = {};

// Sett type of data
  const nodeServerActive: boolean = false;

// Request and check for Phidgets Connection every 2 seconds
  let MtuValueUpdateInitiation = () => {


    initializeStore.subscribe(checkReduxStoreTree);  
    console.log("fews");
    const socket: any = RequestSocketIOServer();

    socket.on("connect", () => {
      //Begin listening for MTU Sever connection

      socket.on("motorControllerThL1", (type: string, data: any, acknowledgements: any) => {
     
        console.log(`Receiving the values for ${type} with value of ${data["possCurrent"]}`);
                  
        //Save the incomming values into the object of mtuValueUpdateObj
        if(type === "Update ThL1" && data["status"] === 200)
          updateSpeedBrakeLeverPossValue(data["possCurrent"]);
        
        acknowledgements({
          status: 200,
        });

      });
    });
  }  
  
  export default MtuValueUpdateInitiation;