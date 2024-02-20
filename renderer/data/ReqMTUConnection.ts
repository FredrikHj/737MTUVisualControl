/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';
import { initializeStore } from "../store";

import { setIsPhidgetsConnected, setIsFsuipcConnected } from "../redux/appStartSlicer";

// Import inportant components for the specific page

let reqMTUControl = () => {
    setInterval(() => {
        axios.get("http://localhost:3000/InitilizeMTU", /* {params: ""} */).then(response => {
            if(response.status === 200){
                console.log('response :', response.data["thL1"]);
                //Save the incomming MTUAPI into the Redux store created for the visual presentation of MTU values
                    //Connection States
                    var conStates = response.data["isServiceConnected"]
                    console.log('conStates :', conStates);
                initializeStore.dispatch(setIsPhidgetsConnected(conStates["isPhidgetsConnected"]));

            }
        }).
        catch(error => {});
    }, 0.000000001);
}
export default reqMTUControl;