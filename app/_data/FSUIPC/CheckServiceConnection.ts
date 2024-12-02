/* ================================================== Redux Store updater ==================================================
Import  modules */
import { initializeStore } from "../../_reduxStore/_reduxStore/CommonStore";

import checkReduxStoreTree, {
} from "../CheckStoreState";
import {loadFsuipcService} from './';


//initializeStore.subscribe(handleStateChange)
const checkServicesConnection = (service: string) =>{
  retryConnection(service);
}
const retryConnection = (service: string) => { 
  /* if (service === generalTexts.services["fsuipc"]) {
    var storeListenerServiceFSUIPC: any = checkReduxStoreTree("serviceFSUIPC");
    var serviceConnected: boolean = storeListenerServiceFSUIPC["connected"];
    
    if (serviceConnected === false) {
      setTimeout(() => {
 
        setTimeout(() => {loadFsuipcService("connect");},2000);
        return retryConnection(service);
      }, 6000);
    }
  } */
}

export default checkServicesConnection; //;