import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    connected: boolean,
    connectionMess: string,
    conLost: boolean,
    conLostMess: string,
    backendFound: boolean,
    backendNotFoundMess: string,
    connectionInfo: object,
}

const initialState: State = {
    name: "Phidgets",
    connectionLoading: false,
    connected: false,
    connectionMess: "",
    conLost: false,
    conLostMess: "Connection Lost - Retrying!",
    backendFound: false,
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
        setConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.connectionMess = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },        
    },
});

export const { phidgetsConnectionLoading, setIsPhidgetsConnected, setPhidgetsConLost, setConnectionMess, setConnectionInfo } = PhidgetsSlicer.actions;
export default PhidgetsSlicer.reducer;