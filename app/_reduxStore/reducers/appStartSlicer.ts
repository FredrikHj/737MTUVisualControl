import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FSUIPCInfoContainer from '../../_data/FSUIPC/FSUIPCInfoContainer';

interface State {
    appUpStarted: boolean,
    appName: string,
    stateName: string,
    choosenTabNr: number,

}

const initialState: State = {
    appUpStarted: false,
    appName: "737Motorized Throttle Unit Control",
    stateName: "notStarted",
    choosenTabNr: 1,
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
        setChoosenTabNr: (state: State, action: PayloadAction<number>) => {
            state.choosenTabNr = action.payload;
        },
    },
});
export const {setAppUpStarted, setStateName, setChoosenTabNr } = AppStartSlicer.actions;
export default AppStartSlicer.reducer;