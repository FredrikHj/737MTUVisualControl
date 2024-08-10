import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    isPhidgetsConnected: boolean,
    phidgetsConnectionMess: string,
    phidgetsServerError: boolean,
    phidgetsServerErrorMess: string,
    phidgetsConLost: boolean,
    phidgetsConLostMess: string,
    phidgetsServerHost: string,
    phidgetsServerPort: number,
}

const initialState: State = {
    name: "Phidgets",
    connectionLoading: false,
    isPhidgetsConnected: false,
    phidgetsConnectionMess: "",
    phidgetsServerError: false,
    phidgetsServerErrorMess: "",
    phidgetsConLost: false,
    phidgetsConLostMess: "",
    phidgetsServerHost: "",
    phidgetsServerPort: 0,
};

export const PhidgetsSlicer = createSlice({
    name: "PhidgetsSlicer",
    initialState,
    reducers: {
        phidgetsConnectionLoading: (state: State, action: PayloadAction<boolean>) => {
            state.connectionLoading = action.payload;
        },     
        setIsPhidgetsConnected: (state: State, action: PayloadAction<boolean>) => {
            state.isPhidgetsConnected = action.payload;
        },
        setPhidgetsConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.phidgetsConnectionMess = action.payload;
        },
        setIsPhidgetsServerError: (state: State, action: PayloadAction<boolean>) => {
            state.phidgetsServerError = action.payload;
        },
        setPhidgetsServerErrorMess: (state: State, action: PayloadAction<string>) => {
            state.phidgetsServerErrorMess = action.payload;
        },
        setPhidgetsConLost: (state: State, action: PayloadAction<boolean>) => {
            state.phidgetsConLost = action.payload;
        },
        setPhidgetsConLostMess: (state: State, action: PayloadAction<string>) => {
            state.phidgetsConLostMess = action.payload;
        },
        setPhidgetsServerHost: (state: State, action: PayloadAction<string>) => {
            state.phidgetsServerHost = action.payload;
        },
        setPhidgetsServerPort: (state: State, action: PayloadAction<number>) => {
            state.phidgetsServerPort = action.payload;
        },
    },
});

export const { 
    phidgetsConnectionLoading, 
    setIsPhidgetsConnected, 
    setPhidgetsConnectionMess, 
    setIsPhidgetsServerError, 
    setPhidgetsServerErrorMess, 
    setPhidgetsConLost, 
    setPhidgetsServerHost,
    setPhidgetsServerPort,
    setPhidgetsConLostMess
} = PhidgetsSlicer.actions;

export default PhidgetsSlicer.reducer;