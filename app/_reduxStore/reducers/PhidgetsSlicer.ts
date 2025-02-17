import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    headlineName: string,
    isPhidgetsConnected: boolean,
    phidgetsServerError: boolean,
    phidgetsServerMess: string,

    phidgetsServerErrorMess: string,
    phidgetsConLost: boolean,

    phidgetsConLostMess: string,
    phidgetsServerHost: string,
    phidgetsServerPort: number,
}

const initialState: State = {
    headlineName: "Phidgets Server",
    isPhidgetsConnected: false,
    phidgetsServerError: false,
    phidgetsServerMess: "",

    phidgetsServerErrorMess: "Server Error - Retrying!",
    phidgetsConLost: false,

    phidgetsConLostMess: "",
    phidgetsServerHost: "",
    phidgetsServerPort: 0,
};

export const PhidgetsSlicer = createSlice({
    name: "PhidgetsSlicer",
    initialState,
    reducers: {
        setIsPhidgetsConnected: (state: State, action: PayloadAction<boolean>) => {
            state.isPhidgetsConnected = action.payload;
        },
        setPhidgetsServerMess: (state: State, action: PayloadAction<string>) => {
            state.phidgetsServerMess = action.payload;
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
    setIsPhidgetsConnected, 
    setPhidgetsServerMess, 
    setIsPhidgetsServerError, 
    setPhidgetsServerErrorMess, 
    setPhidgetsConLost, 
    setPhidgetsServerHost,
    setPhidgetsServerPort,
    setPhidgetsConLostMess
} = PhidgetsSlicer.actions;

export default PhidgetsSlicer.reducer;