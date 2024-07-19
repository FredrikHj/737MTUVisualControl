import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    isPhidgetsConnected: boolean,
    phidgetsConnectionMess: string,
    connectionInfo: object,
}

const initialState: State = {
    name: "Phidgets",
    connectionLoading: false,
    isPhidgetsConnected: false,
    phidgetsConnectionMess: "",
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
            state.isPhidgetsConnected = action.payload;
        },
        setPhidgetsConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.phidgetsConnectionMess = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },        
    },
});

export const { phidgetsConnectionLoading, setIsPhidgetsConnected, setPhidgetsConLost, setPhidgetsConnectionMess, setConnectionInfo } = PhidgetsSlicer.actions;
export default PhidgetsSlicer.reducer;