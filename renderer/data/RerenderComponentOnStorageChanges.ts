/* ==================================================  Props handler ==================================================
Imports module */
import {BehaviorSubject} from "rxjs";
import theme from '../lib/theme';

// Not includes the store saving for the store part of throttleUpdatingValue = (newValue: number) =>{s

const componentRerenderStorageChanges: any = {};

var speedBrakeLeverPoss: number = 0;
var parkingBrakeLeverPoss: number = 0;
var th1LeverPoss: number = 0;
var th1RevPoss: number = 0;
var th2LeverPoss: number = 0;
var th2LRevPoss: number = 0;
var flapsLeverPoss: number = 0;

export const componentRerenderStorageChanges$ = new BehaviorSubject(componentRerenderStorageChanges);

export var updateSpeedBrakeLeverPossValue$ = new BehaviorSubject(speedBrakeLeverPoss);
export var updateParkingBrakeLeverPossValue$ = new BehaviorSubject(parkingBrakeLeverPoss);
export var updateTh1LeverPossValue$ = new BehaviorSubject(th1LeverPoss);
export var updateTh1RevPossValue$ = new BehaviorSubject(th1RevPoss);
export var updateTh2LeverPossValue$ = new BehaviorSubject(th2LeverPoss);
export var updateTh2LRevPossValue$ = new BehaviorSubject(th2LRevPoss);
export var updateFlapsLeverPossValue$ = new BehaviorSubject(flapsLeverPoss);

export var updateSpeedBrakeLeverPossValue = (newValue: number) =>{
    console.log('New Value for SpeedBrake = ', newValue);
    newValue && updateSpeedBrakeLeverPossValue$.next(newValue);
}
export var updateParkingBrakeLeverPossValue = (newValue: number) =>{
    console.log('New Value for ParkingBrake = ', newValue);
}
export var updateTh1LeverPossValue = (newValue: number) =>{
    console.log('New Value for Th1Lever = ', newValue);
}
export var updateTh1RevPossValue = (newValue: number) =>{
    console.log('New Value for Th1Rev = ', newValue);
}
export var updateTh2LeverPossValue = (newValue: number) =>{
    console.log('New Value for Th2Lever = ', newValue);
}
export var updateTh2LRevPossValue = (newValue: number) =>{
    console.log('New Value for Th2LRev = ', newValue);
}
export var updateFlapsLeverPossValue = (newValue: number) =>{
    console.log('New Value for FlapsLever = ', newValue);
}

export const updateStoreValuesToComponent = (componentRerenderStorageChanges: any) =>{
    console.log('componentRerenderStorageChanges :', componentRerenderStorageChanges);
    componentRerenderStorageChanges && componentRerenderStorageChanges$.next(componentRerenderStorageChanges);
}
//===============================================