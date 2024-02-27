import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    connected: boolean,
    connectionMess: string,
    conLost: boolean,
    conLostMess: string,
    backendNotFound: boolean,
    backendNotFoundMess: string,
    connectionInfo: object,
}

const initialState: State = {
    name: "Phidgets",
    connectionLoading: false,
    connected: false,
    connectionMess: "Connected",
    conLost: false,
    conLostMess: "Connection Lost - Retrying!",
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
            state.connectionLoading = action.payload;
        },     
        setIsPhidgetsConnected: (state: State, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setPhidgetsConLost: (state: State, action: PayloadAction<boolean>) => {
            state.conLost = action.payload;
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