import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FSUIPCInfoContainer from '../data/FSUIPC/FSUIPCInfoContainer';

interface State {
    appUpStarted: boolean,
    appName: string,
    stateName: string,
    isPhidgetsConnected: boolean,
    isFsuipcConnected: boolean,
}

const initialState: State = {
    appUpStarted: false,
    appName: "737Motorized Throttle Unit Control",
    stateName: "notStarted",
    isPhidgetsConnected: false,
    isFsuipcConnected: false,
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
        setIsPhidgetsConnected: (state: State, action: PayloadAction<boolean>) => {
            state.isPhidgetsConnected = action.payload;
        },
        setIsFsuipcConnected: (state: State, action: PayloadAction<boolean>) => {
            state.isFsuipcConnected = action.payload;
        },
        
    },
});
export const {setAppUpStarted, setStateName, setIsPhidgetsConnected, setIsFsuipcConnected } = AppStartSlicer.actions;
export default AppStartSlicer.reducer;