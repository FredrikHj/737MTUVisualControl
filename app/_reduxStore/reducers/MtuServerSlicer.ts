import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import serverConfig from "../../_data/ServerConfig";

interface State {
    headlineName: string,
    isMtuServerConnected: boolean,
    mtuServerError: boolean,
    mtuServerMess: string,
    mtuServerErrorMess: string,
    serverConId: string,
    serverHost: string,
    serverPort: number,
}

const initialState: State = {
    headlineName: "MTU Server",
    isMtuServerConnected: false,
    mtuServerError: false,
    mtuServerMess: "",
    mtuServerErrorMess: "",
    serverConId: "",
    serverHost: serverConfig.hostname,
    serverPort: serverConfig.port,
}

export const mtuServerSlicer = createSlice({
    name: "MTUServerSlicer",
    initialState,
    reducers: {
        setIsMtuServerConnected: (state: State, action: PayloadAction<boolean>) => {
            state.isMtuServerConnected = action.payload;
        },
        setMtuServerMess: (state: State, action: PayloadAction<string>) => {
            state.mtuServerMess = action.payload;
        },
        setServerHost : (state: State, action: PayloadAction<string>) => {
            state.serverHost = action.payload;
        },
        setServerPort: (state: State, action: PayloadAction<number>) => {
            state.serverPort = action.payload;
        },
        setServerConId: (state: State, action: PayloadAction<string>) => {
            state.serverConId = action.payload;
        },
        setIsMtuServerError: (state: State, action: PayloadAction<boolean>) => {
            state.mtuServerError = action.payload;
        },
        setMtuServerErrorMess: (state: State, action: PayloadAction<string>) => {
            state.mtuServerErrorMess = action.payload;
        },
    }
});

export const { 
    setIsMtuServerConnected,
    setMtuServerMess, 
    setIsMtuServerError, 
    setMtuServerErrorMess, 
    setServerHost, 
    setServerPort,
    setServerConId,
} = mtuServerSlicer.actions;

export default mtuServerSlicer.reducer;