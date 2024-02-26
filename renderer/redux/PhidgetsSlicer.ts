import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CSSOthersObjectForCSSObject } from '@mui/styled-engine';

interface State {
    name: string,
    phidgetsConnectionLoading: boolean,
    phidgetsConnected: boolean,
    connectionMess: string,
    phidgetsConLost: boolean,
    phidgetsConLostMess: string,
    backendNotFound: boolean,
    backendNotFoundMess: string,
    connectionInfo: object,
}

const initialState: State = {
    name: "Phidgets",
    phidgetsConnectionLoading: false,
    phidgetsConnected: false,
    connectionMess: "Connected",
    phidgetsConLost: false,
    phidgetsConLostMess: "Connection Lost - Retrying!",
    backendNotFound: false,
    backendNotFoundMess: "Backend Not Found - Retrying",
    connectionInfo: {
        dataReceived: false,
        receivedData: {},
    },  
};

export const PhidgetsSlicer = createSlice({
    name: "PhidgetsSlicer",
    initialState,
    reducers: {
        phidgetsConnectionLoading: (state: State, action: PayloadAction<boolean>) => {
            state.phidgetsConnectionLoading = action.payload;
        },     
        setIsPhidgetsConnected: (state: State, action: PayloadAction<boolean>) => {
            state.phidgetsConnected = action.payload;
        },
        setPhidgetsConLost: (state: State, action: PayloadAction<boolean>) => {
            state.phidgetsConLost = action.payload;
        },
        setBackendNotFound: (state: State, action: PayloadAction<boolean>) => {
            state.backendNotFound = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },        
    },
});

export const { phidgetsConnectionLoading, setIsPhidgetsConnected, setPhidgetsConLost, setBackendNotFound, setConnectionInfo } = PhidgetsSlicer.actions;
export default PhidgetsSlicer.reducer;