import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
   speedBrakeLeverPoss: number,
   parkingBrakeLeverPoss: number,
   th1LeverPoss: number,
   th1RevPoss: number, 
   th2LeverPoss: number,
   th2LRevPoss: number,
   flapsLeverPoss: number,
}

const initialState: State = {
    speedBrakeLeverPoss: 0,
    parkingBrakeLeverPoss: 0,
    th1LeverPoss: 0,
    th1RevPoss: 0,
    th2LeverPoss: 0,
    th2LRevPoss: 0,
    flapsLeverPoss:0,
};

export const ThrottleUpdatingValues = createSlice({ 
    name: "ThrottleUpdatingValues",
    initialState,
    reducers: {
        setSpeedBrakeLeverPoss: (state: State, action: PayloadAction<number>) => {
            state.speedBrakeLeverPoss = action.payload;
        },
        setParkingBrakeLeverPoss: (state: State, action: PayloadAction<number>) => {
            state.parkingBrakeLeverPoss = action.payload;
        },
        setTh1LeverPoss: (state: State, action: PayloadAction<number>) => {
            state.th1LeverPoss = action.payload;
        },
        setTh1RevPoss: (state: State, action: PayloadAction<number>) => {
            state.th1RevPoss = action.payload;
        },
        setTh2LeverPoss: (state: State, action: PayloadAction<number>) => {
            state.th2LeverPoss = action.payload;
        },
        setTh2LRevPoss: (state: State, action: PayloadAction<number>) => {
            state.th2LRevPoss = action.payload;
        },
        setFlapsLeverPoss: (state: State, action: PayloadAction<number>) => {
            state.flapsLeverPoss = action.payload;
        },
    },
});

export const {
    setSpeedBrakeLeverPoss,
    setParkingBrakeLeverPoss,
    setTh1LeverPoss,
    setTh1RevPoss,
    setTh2LeverPoss,
    setTh2LRevPoss,
    setFlapsLeverPoss
} = ThrottleUpdatingValues.actions;
export default ThrottleUpdatingValues.reducer;