/* ================================================== Redux Store updater ==================================================
Import  modules */
import { initializeStore } from "../store";
import {updateStoreValuesToComponent} from "./RerenderComponentOnStorageChanges";

export var currentValueStateTree: object = {};

// The triggered command for check if there are any store change
var checkReduxStoreTree = () => {
    let previousValueStateTree = currentValueStateTree
    currentValueStateTree = initializeStore.getState();

    console.log('currentValueStateTree :', currentValueStateTree);
    // If there are some diff it will trigger the store change to go to the components listener for store changes


    previousValueStateTree !== currentValueStateTree && updateStoreValuesToComponent(currentValueStateTree);  
} 
export default checkReduxStoreTree;