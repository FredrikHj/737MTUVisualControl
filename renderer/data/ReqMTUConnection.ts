/* ================================================== ReqMTUControl ==================================================
Imports module */
import axios from 'axios';

// Import inportant components for the specific page

let reqMTUControl = () => {
    
    axios.get("http://localhost:3000/InitilizeMTU", /* {params: ""} */).then(response => {
        setTimeout(() => {console.log('response :', response.data);}, 5000);

        if(response.status === 200){
            //Save the incomming MTUAPI into the Redux store created for the visual presentation of MTU values
            

        }
    }).
    catch(error => {});
}
export default reqMTUControl;