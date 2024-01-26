import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";
import { CSSOthersObjectForCSSObject } from '@mui/styled-engine';

interface State {
    name: string,
    phidgetsConnectionLoading: boolean,
    connected: boolean,
    conBottonShowable: boolean,
    labelConButton: string,
    stateName: string,
    errorOccured: object,
    connectionInfo: object,
}

const initialState: State = {
    name: "Phidgets",
    phidgetsConnectionLoading: false,
    connected: false,
    conBottonShowable: true,
    labelConButton: generalTexts.conButton["connect"],
    stateName: generalTexts.conStates.phidgets.webService["notStarted"],
    errorOccured: {
        isError: false,
    },
    connectionInfo: {
        dataReceived: false,
        receivedData: {},
    },
};

export const PhidgetsSlicer = createSlice({
    name: "PhidgetsSlicer",
    initialState,
    reducers: {
        setConnected: (state: State, action: PayloadAction<boolean>) => {
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

export const { setConnected, setConBottonShowable, setLabelConButton, setStateName, setErrorOccured, setConnectionInfo } = PhidgetsSlicer.actions;
export default PhidgetsSlicer.reducer;