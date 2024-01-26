import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";

interface State {
    name: string,
    fsuipcConnectionLoading: boolean,
    connected: boolean,
    conBottonShowable: boolean,
    labelConButton: string,
    stateName: string,
    errorOccured: object,
    connectionInfo: object,
}

const initialState: State = {
    name: "FSUIPC",
    fsuipcConnectionLoading: false,
    connected: false,
    conBottonShowable: true,
    labelConButton: generalTexts.conButton["connect"],
    stateName: generalTexts.conStates.fsuipc.webService["notStarted"],
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
        setConBottonShowable: (state: State, action: PayloadAction<boolean>) => {
            state.conBottonShowable = action.payload;
        },
        setLabelConButton: (state: State, action: PayloadAction<string>) => {
            state.labelConButton = action.payload;
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

export const { setConnected,setConBottonShowable, setLabelConButton, setStateName, setErrorOccured, setConnectionInfo } = FSUIPCSlicer.actions;
export default FSUIPCSlicer.reducer;