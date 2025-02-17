import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    headlineStatus: string,
    headlineInfoContaioner: string,
    connectionLoading: boolean,
    isFsuipcConnected: boolean,
    fsuipcConnectionMess: string,
    websocketNotFound: boolean,
    websocketNotFoundMess: string,
    connectionInfo: object,
}

const initialState: State = {
    headlineStatus: "FSUIPC",
    headlineInfoContaioner: "FSUIPC Websocket",
    connectionLoading: false,
    isFsuipcConnected: false,
    fsuipcConnectionMess: "",
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
            state.isFsuipcConnected = action.payload;
        },
        setFsuipcConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.fsuipcConnectionMess = action.payload;
        },
        setwWebsocketNotFound: (state: State, action: PayloadAction<boolean>) => {
            state.websocketNotFound = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },            
    },
});

export const { fsuipcConnectionLoading, setIsfsuipcConnected, setFsuipcConnectionMess, setfsuipcConLost, setwWebsocketNotFound, setConnectionInfo } = FSUIPCSlicer.actions;
export default FSUIPCSlicer.reducer;