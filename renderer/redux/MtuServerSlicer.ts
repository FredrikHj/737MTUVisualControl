import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import serverConfig from "../data/ServerConfig";

interface State {
    name: string,
    isMtuServerConnected: boolean,
    mtuServerConnectionMess: string,
    mtuServerError: boolean,
    mtuServerErrorMess: string,
    errorMessCreatedByServer: string,
    serverHost: string,
    serverPort: number,
}

const initialState: State = {
    name: "MTUServer",
    isMtuServerConnected: false,
    mtuServerConnectionMess: "",
    mtuServerError: false,
    mtuServerErrorMess: "",
    errorMessCreatedByServer: "",
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
        setMtuServerConnectionMess: (state: State, action: PayloadAction<string>) => {
            state.mtuServerConnectionMess = action.payload;
        },
        setServerHost : (state: State, action: PayloadAction<string>) => {
            state.serverHost = action.payload;
        },
        setServerPort: (state: State, action: PayloadAction<number>) => {
            state.serverPort = action.payload;
        },
        setIsMtuServerError: (state: State, action: PayloadAction<boolean>) => {
            state.mtuServerError = action.payload;
        },
        setMtuServerErrorMess: (state: State, action: PayloadAction<string>) => {
            state.mtuServerErrorMess = action.payload;
        },
        setErrorMessCreatedByServer: (state: State, action: PayloadAction<string>) => {
            state.errorMessCreatedByServer = action.payload;
        },
    }
});

export const { 
                setIsMtuServerConnected,
                setMtuServerConnectionMess, 
                setIsMtuServerError, 
                setMtuServerErrorMess,
                setErrorMessCreatedByServer, 
                setServerHost, setServerPort
            } = mtuServerSlicer.actions;

export default mtuServerSlicer.reducer;