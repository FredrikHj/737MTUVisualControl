import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";

interface State {
    servicesConnected: boolean,
    componentThrottleVisualLoaded: boolean,
    servicesStatus: {
        containerVisiable: any,
        containerButtonName: string,
    }
}

const initialState: State = {
    servicesConnected: false,
    componentThrottleVisualLoaded: false,
    servicesStatus: {
        containerVisiable: false,
        containerButtonName: "hidden",
    },
};

export const ThrottleReadySlicer = createSlice({ 
    name: "ThrottleReadySlicer",
    initialState,
    reducers: {
        setServicesConnected: (state: State, action: PayloadAction<boolean>) => {
            state.servicesConnected = action.payload;
        },
        setComponentThrottleVisualLoaded: (state: State, action: PayloadAction<boolean>) => {
            state.componentThrottleVisualLoaded = action.payload;
        },
        setServicesStatusContainerVisiable: (state: State, action: PayloadAction<boolean>) => {
            state.servicesStatus["containerVisiable"] = action.payload;
        },
        setServicesStatusButtonName: (state: State, action: PayloadAction<string>) => {
            state.servicesStatus["containerButtonName"] = action.payload;
        },
    },
});

export const { setServicesConnected, setComponentThrottleVisualLoaded, setServicesStatusContainerVisiable, setServicesStatusButtonName } = ThrottleReadySlicer.actions;
export default ThrottleReadySlicer.reducer;