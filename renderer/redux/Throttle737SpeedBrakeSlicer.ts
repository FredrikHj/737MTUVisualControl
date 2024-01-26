import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";

interface State {
    currentValue: string,
    currentPoss: number,
    historiesValues: Array<string>,
}

const initialState: State = {
    currentValue: "",
    currentPoss: 0,
    historiesValues: [],
};

export const Throttle737SpeedBrakeSlicer = createSlice({ 
    name: "Throttle737SpeedBraker",
    initialState,
    reducers: {
        setSpdBCurrentValue: (state: State, action: PayloadAction<string>) => {
            state["currentValue"] = action.payload;
        },
        setSpdBCurrentPoss: (state: State, action: PayloadAction<number>) => {
            state["currentPoss"] = action.payload;
        }, 
    },
});

export const { setSpdBCurrentValue, setSpdBCurrentPoss } = Throttle737SpeedBrakeSlicer.actions;
export default Throttle737SpeedBrakeSlicer.reducer;