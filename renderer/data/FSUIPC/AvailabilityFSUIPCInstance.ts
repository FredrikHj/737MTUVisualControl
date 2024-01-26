/* ==================================================  Props handler ==================================================
Imports module */
import {BehaviorSubject} from "rxjs";

const FSUIPCInstance: object = {};

export const AvailabilityOfFSIPCInstance$ = new BehaviorSubject(FSUIPCInstance);

export const makeFSUIPCInstanceAvailable = (FSUIPCInstance: object) =>{
    console.log('FSUIPCInstance :', FSUIPCInstance);
    if(FSUIPCInstance) AvailabilityOfFSIPCInstance$.next(FSUIPCInstance);
}
//=============================================== 