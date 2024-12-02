/* ==================================================  Props handler ==================================================
Imports module */
import {BehaviorSubject} from "rxjs";

// Not includes the store saving for the store part of throttleUpdatingValue = (newValue: number) =>{s

const componentRerenderStorageChanges: any = {};

const speedBrakeLeverPoss: number = 0;
const parkingBrakeLeverPoss: number = 0;
const th1LeverPoss: number = 0;
const th1RevPoss: number = 0;
const th2LeverPoss: number = 0;
const th2LRevPoss: number = 0;
const flapsLeverPoss: number = 0;

export const componentRerenderStorageChanges$ = new BehaviorSubject(componentRerenderStorageChanges);

export const updateSpeedBrakeLeverPossValue$ = new BehaviorSubject(speedBrakeLeverPoss);
export const updateParkingBrakeLeverPossValue$ = new BehaviorSubject(parkingBrakeLeverPoss);
export const updateTh1LeverPossValue$ = new BehaviorSubject(th1LeverPoss);
export const updateTh1RevPossValue$ = new BehaviorSubject(th1RevPoss);
export const updateTh2LeverPossValue$ = new BehaviorSubject(th2LeverPoss);
export const updateTh2LRevPossValue$ = new BehaviorSubject(th2LRevPoss);
export const updateFlapsLeverPossValue$ = new BehaviorSubject(flapsLeverPoss);

export const updateSpeedBrakeLeverPossValue = (newValue: number) =>{
    console.log('New Value for SpeedBrake = ', newValue);
    newValue && updateSpeedBrakeLeverPossValue$.next(newValue);
}
export const updateParkingBrakeLeverPossValue = (newValue: number) =>{
    console.log('New Value for ParkingBrake = ', newValue);
}
export const updateTh1LeverPossValue = (newValue: number) =>{
    console.log('New Value for Th1Lever = ', newValue);
}
export const updateTh1RevPossValue = (newValue: number) =>{
    console.log('New Value for Th1Rev = ', newValue);
}
export const updateTh2LeverPossValue = (newValue: number) =>{
    console.log('New Value for Th2Lever = ', newValue);
}
export const updateTh2LRevPossValue = (newValue: number) =>{
    console.log('New Value for Th2LRev = ', newValue);
}
export const updateFlapsLeverPossValue = (newValue: number) =>{
    console.log('New Value for FlapsLever = ', newValue);
}

export const updateStoreValuesToComponent = (componentRerenderStorageChanges: any) =>{
    console.log('componentRerenderStorageChanges :', componentRerenderStorageChanges);
    componentRerenderStorageChanges && componentRerenderStorageChanges$.next(componentRerenderStorageChanges);
}
//===============================================