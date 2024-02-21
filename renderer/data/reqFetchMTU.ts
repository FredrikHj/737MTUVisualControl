/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

import { setIsPhidgetsConnected, setIsFsuipcConnected } from "../redux/appStartSlicer";

// Sett type of data
    var request: any;
    var response: any;
    var resData: object;
    var responseStatus: number;
    var responseData: any; 
    var responseType: string;
let reqFetchMTU = () => {
    console.log("gsredf");
    
    setInterval(async() => {

        var request = await fetch("/api/Phidgets/RunServerConnection");
        response = await request.json();
        responseStatus = response.status;
        console.log(response);

       /*  axios.get("/", /* {params: ""}).then(response => {
            if(response.status === 200){
                console.log('response :', response.data["thL1"]);
                //Save the incomming MTUAPI into the Redux store created for the visual presentation of MTU values
                    //Connection States
                    var conStates = response.data["isServiceConnected"]
                    console.log('conStates :', conStates);
                initializeStore.dispatch(setIsPhidgetsConnected(conStates["isPhidgetsConnected"]));

            }
        }).
        catch(error => {}); */
    }, 0.000000001);
}
export default reqFetchMTU;

/*
let reqMTUConnection = () => {
    
    setInterval(() => {
        axios.get("/localhost:3000/InitilizeMTU", /* {params: ""}).then(response => {
            if(response.status === 200){
                console.log('response :', response.data["thL1"]);
                Save the incomming MTUAPI into the Redux store created for the visual presentation of MTU values
                    Connection States
                    var conStates = response.data["isServiceConnected"]
                    console.log('conStates :', conStates);
                initializeStore.dispatch(setIsPhidgetsConnected(conStates["isPhidgetsConnected"]));

            }
        }).
        catch(error => {});
    }, 0.000000001);
}
*/