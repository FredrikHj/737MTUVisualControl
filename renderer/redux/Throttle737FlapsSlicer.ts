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

export const Throttle737FlapsSlicer = createSlice({ 
    name: "Throttle737Flaps",
    initialState,
    reducers: {
        setFlapsCurrentValue: (state: State, action: PayloadAction<string>) => {
            state["currentValue"] = action.payload;
        },
        setFlapsCurrentPoss: (state: State, action: PayloadAction<number>) => {
            state["currentPoss"] = action.payload;
        }, 
    },
});

export const { setFlapsCurrentValue, setFlapsCurrentPoss } = Throttle737FlapsSlicer.actions;
export default Throttle737FlapsSlicer.reducer;