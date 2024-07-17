import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    name: string,
    connectionLoading: boolean,
    connected: boolean,
    mtuServerConnectionMess: string,
    conLost: boolean,
    conLostMess: string,
    backendFound: boolean,
    backendNotFoundMess: string,
}

const initialState: State = {
    name: "MTUServer",
    connectionLoading: false,
    connected: false,
    mtuServerConnectionMess: "",
    conLost: false,
    conLostMess: "Connection Lost - Retrying!",
    backendFound: false,
    backendNotFoundMess: "Backend Not Found - Retrying",
};

export const mtuServerSlicer = createSlice({
    name: "MTUServerSlicer",
    initialState,
    reducers: {
        setMtuServerConnectionLoading: (state: State, action: PayloadAction<boolean>) => {
            state.connectionLoading = action.payload;
        },     
        setIsMtuServerConnected: (state: State, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setMtuServerConLost: (state: State, action: PayloadAction<boolean>) => {
            state.conLost = action.payload;
        },
        setMtuServerConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.mtuServerConnectionMess = action.payload;
        },
    }
});

export const { setMtuServerConnectionLoading, setIsMtuServerConnected, setMtuServerConLost, setMtuServerConnectionMess } = mtuServerSlicer.actions;
export default mtuServerSlicer.reducer;