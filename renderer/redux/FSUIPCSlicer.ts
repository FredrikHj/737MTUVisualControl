import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    fsuipcConnectionLoading: boolean,
    connected: boolean,
    stateName: string,
    errorOccured: object,
    connectionInfo: object,
}

const initialState: State = {
    name: "FSUIPC",
    fsuipcConnectionLoading: false,
    connected: false,
    stateName: "Disconnected",
    errorOccured: {
        isError: false,
    },
    connectionInfo: {
        dataReceived: false,
        receivedData: {},
    },
};

export const FSUIPCSlicer = createSlice({
    name: "FSUIPCSlicer",
    initialState,
    reducers: {
        setConnected : (state: State, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setStateName: (state: State, action: PayloadAction<string>) => {
            state.stateName = action.payload;
        },
        setErrorOccured: (state: State, action: PayloadAction<object>) => {
            state.errorOccured = action.payload;
        },
        setConnectionInfo: (state: State, action: PayloadAction<object>) => {
            state.connectionInfo = action.payload;
        },        
    },
});

export const { setConnected, setStateName, setErrorOccured, setConnectionInfo } = FSUIPCSlicer.actions;
export default FSUIPCSlicer.reducer;