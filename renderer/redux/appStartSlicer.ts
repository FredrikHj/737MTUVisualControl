import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";

interface State {
    appUpStarted: boolean,
    appName: string,
    stateName: string,
    errorInfo: string,
    appParts: Array<string>,
}

const initialState: State = {
    appUpStarted: false,
    appName: "737Motorized Throttle Unit Control",
    stateName: generalTexts.conStates.fsuipc.webService["notStarted"],
    errorInfo: "No Errors",
    appParts: [
        "FSUIPC Server -",
        "Phidgets -"
    ],
}

export const AppStartSlicer = createSlice({
    name: "AppStart",
    initialState,
    reducers: {
        setAppUpStarted: (state: State, action: PayloadAction<boolean>) => {
            state.appUpStarted = action.payload;
        },
        setStateName: (state: State, action: PayloadAction<string>) => {
            state.stateName = action.payload;
        },
        setErrorInfo: (state: State, action: PayloadAction<string>) => {
            state.errorInfo = action.payload;
        },
    },
});
export const {setAppUpStarted, setStateName, setErrorInfo } = AppStartSlicer.actions;
export default AppStartSlicer.reducer;