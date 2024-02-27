import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    connected: boolean,
    connectionMess: string,
    conLost: boolean,
    conLostMess: string,
    websocketNotFound: boolean,
    websocketNotFoundMess: string,
    connectionInfo: object,
}

const initialState: State = {
    name: "FSUIPC",
    connectionLoading: false,
    connected: false,
    connectionMess: "Connected",
    conLost: false,
    conLostMess: "Connection Lost - Retrying!",
    websocketNotFound: false,
    websocketNotFoundMess: "Websocket Not Found - Retrying",
    connectionInfo: {
        dataReceived: false,
        receivedData: {},
    },  
};

export const FSUIPCSlicer = createSlice({
    name: "FSUIPCSlicer",
    initialState,
    reducers: {
        fsuipcConnectionLoading: (state: State, action: PayloadAction<boolean>) => {
            state.connectionLoading = action.payload;
        },     
        setIsfsuipcConnected: (state: State, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setfsuipcConLost: (state: State, action: PayloadAction<boolean>) => {
            state.conLost = action.payload;
        },
        setwWebsocketNotFound: (state: State, action: PayloadAction<boolean>) => {
            state.websocketNotFound = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },            
    },
});

export const { fsuipcConnectionLoading, setIsfsuipcConnected, setfsuipcConLost, setwWebsocketNotFound, setConnectionInfo } = FSUIPCSlicer.actions;
export default FSUIPCSlicer.reducer;