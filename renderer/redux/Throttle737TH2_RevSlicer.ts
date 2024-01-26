import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generalTexts from "../data/GeneralTexts";

interface State {
    th: {
        currentValue: string,
        currentPoss: number,
        historiesValues: Array<string>,
    },
    rev: {
        currentValue: string,
        currentPoss: number,
        historiesValues: Array<string>,
    }
}

const initialState: State = {
    th: {
        currentValue: "",
        currentPoss: 0,
        historiesValues: [],
    },
    rev: {
        currentValue: "",
        currentPoss: 0,
        historiesValues: [],
    }
};

export const Throttle737TH2_RevSlicer = createSlice({ 
    name: "Throttle737TH2_Rev",
    initialState,
    reducers: {
        setTH2CurrentValue: (state: State, action: PayloadAction<string>) => {
            state.th["currentValue"] = action.payload;
        },
        setTH2CurrentPoss: (state: State, action: PayloadAction<number>) => {
            state.th["currentPoss"] = action.payload;
        },
        setRev2CurrentValue: (state: State, action: PayloadAction<string>) => {
            state.rev["currentValue"] = action.payload;
        },
        setRev2CurrentPoss: (state: State, action: PayloadAction<number>) => {
            state.rev["currentPoss"] = action.payload;
        }, 
    },
});

export const { setTH2CurrentValue, setTH2CurrentPoss, setRev2CurrentValue, setRev2CurrentPoss} = Throttle737TH2_RevSlicer.actions;
export default Throttle737TH2_RevSlicer.reducer;