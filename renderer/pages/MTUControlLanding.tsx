/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from"../store";
import { useSelector } from 'react-redux'; 
import React, { useState, useEffect } from'react';
import ThrottleVisual from"../components/ThrottleVisual";
import checkReduxStoreTree from"../data/CheckStoreState";
import mtuViewerInitiation from"../data/MtuViewerInitiation";
//import reqPhidgetConnection from"../data/reqPhidgetConnection";
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
import MTUServerConnectionInfo from"../components/MTUServerConnectionInfo";
import FsuipcServiceConnectionInfo from"../components/FsuipcServiceConnectionInfo";
import PhidgetsServiceConnectionInfo from"../components/PhidgetsServiceConnectionInfo";
import {componentRerenderStorageChanges$} from"../data/RerenderComponentOnStorageChanges";
import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';
import { BorderClear } from "@mui/icons-material";
import { flattenDiagnosticMessageText } from "typescript";
mtuViewerInitiation();

var MTUControlLanding = () => { 
    // Begin listening for Storetree changes
        const listenerStoreChange = initializeStore.subscribe(checkReduxStoreTree);  

    // Services
    const [ MTUServer ] = useState<string>("MTU Server");
    const [ servicePhidgets ] = useState<string>("phidgets");
    const [ serviceFsuipc ] = useState<string>("fsuipc");

        
    // Get updated Store state and save it 
        const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
         
        const [ isMTUConnnected, updateIsMTUConnected ] = useState<boolean>(false); 

        //const [appStarted, updateAppStarted] = useState<boolean>(true);
        const [ servicesVisiable, updateServicesVisiable ] = useState<boolean>(false); 
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues); 
        
            setTimeout(() => {
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }, 2000);
        
        }); 
    }, [servicesVisiable, currentStoreState]);
    // Load if MTU is not connected 
        let startMTU = () => {
            //mtuViewerInitiation();
            //reqPhidgetConnection();
            //reqFSUIPCConnection();
            //updateAppStarted(true);
        }
    return(  
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box>
                <MTUServerConnectionInfo
                    MTUService={MTUServer}
                />
            </Box>
            <Box sx={{
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                size: "1000rem"
            }}>
                <PhidgetsServiceConnectionInfo
                    MTUService={servicePhidgets}
                />
                <FsuipcServiceConnectionInfo
                    MTUService={serviceFsuipc}
                />
            </Box>
            
            { /*  <Box sx={{marginTop: "50px"}}>
                    <ThrottleVisual/>
                </Box>
            */}           
        </Box>
    );
}
export default MTUControlLanding;