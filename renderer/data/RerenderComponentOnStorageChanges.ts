/* ==================================================  Props handler ==================================================
Imports module */
import {BehaviorSubject} from "rxjs";

const componentRerenderStorageChanges: any = {};

export const componentRerenderStorageChanges$ = new BehaviorSubject(componentRerenderStorageChanges);

export const updateStoreValuesToComponent = (componentRerenderStorageChanges: any) =>{
console.log('componentRerenderStorageChanges :', componentRerenderStorageChanges);
    if(componentRerenderStorageChanges) componentRerenderStorageChanges$.next(componentRerenderStorageChanges);
}
//===============================================