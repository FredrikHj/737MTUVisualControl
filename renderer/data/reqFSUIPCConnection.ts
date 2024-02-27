/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import {makeFSUIPCInstanceAvailable} from "./FSUIPC/AvailabilityFSUIPCInstance";
import tryFSUIPCConnection from"./FSUIPC/tryFSUIPCConnection";


var reqFSUIPCConnection = () =>{ 
    // Initilize instance
        var fsuipcInstance: any = null;
        
        fsuipcInstance = new WebSocket(`ws://localhost:2048/fsuipc/`, "fsuipc");
        // Make the instance available for the InitilizeMTUFunction component
        makeFSUIPCInstanceAvailable(fsuipcInstance);
        
        tryFSUIPCConnection(fsuipcInstance);

    }

export default reqFSUIPCConnection;