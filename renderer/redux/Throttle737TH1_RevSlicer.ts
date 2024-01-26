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

export const Throttle737TH1_RevSlicer = createSlice({ 
    name: "Throttle737TH1_Rev",
    initialState,
    reducers: {
        setTH1CurrentValue: (state: State, action: PayloadAction<string>) => {
            state.th["currentValue"] = action.payload;
        },
        setTH1CurrentPoss: (state: State, action: PayloadAction<number>) => {
            state.th["currentPoss"] = action.payload;
        },
        setRev1CurrentValue: (state: State, action: PayloadAction<string>) => {
            state.rev["currentValue"] = action.payload;
        },
        setRev1CurrentPoss: (state: State, action: PayloadAction<number>) => {
            state.rev["currentPoss"] = action.payload;
        }, 
    },
});

export const { setTH1CurrentValue, setTH1CurrentPoss, setRev1CurrentValue, setRev1CurrentPoss} = Throttle737TH1_RevSlicer.actions;
export default Throttle737TH1_RevSlicer.reducer;