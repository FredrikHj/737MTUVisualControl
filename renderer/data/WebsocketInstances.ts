/* ==================================================  Props handler ==================================================
Imports module */
import {BehaviorSubject} from "rxjs";

const FSUIPCInstance: any = {};

export const FSUIPCInstance$ = new BehaviorSubject(FSUIPCInstance);

const updateFSUIPCInstance = (FSUIPCInstance: any) =>{
    console.log('UpdateFSUIPCInstance :', FSUIPCInstance);
    if(FSUIPCInstance) FSUIPCInstance$.next(FSUIPCInstance);
}
export default updateFSUIPCInstance;
//===============================================