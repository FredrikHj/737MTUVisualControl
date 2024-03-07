/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from"../store";
import { setAppUpStarted } from"../redux/appStartSlicer";

import reqPhidgetConnection from"../data/reqPhidgetConnection";
import reqFSUIPCConnection from"../data/reqFSUIPCConnection";

import { useSelector } from 'react-redux'; 
import React, { useState, useEffect } from'react';
import checkReduxStoreTree from"../data/CheckStoreState";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';
import {componentRerenderStorageChanges$} from"../data/RerenderComponentOnStorageChanges";
import { setServicesStatusContainerVisiable, setServicesStatusButtonName } from "../redux/ThrottleReadySlicer"; 

import PhidgetsServiceConnectionInfo from"../components/PhidgetsServiceConnectionInfo";
import FsuipcServiceConnectionInfo from"../components/FsuipcServiceConnectionInfo";
import ThrottleVisual from"../components/ThrottleVisual";

var MTUControlLanding = () => { 
    // Begin listening for Storetree changes
        const listenerStoreChange = initializeStore.subscribe(checkReduxStoreTree);  

    // Get updated Store state and save it 
        const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
         
        const [ isMTUConnnected, updateIsMTUConnected ] = useState<boolean>(false); 

        const [appStarted, updateAppStarted] = useState<boolean>(false);
        const [ servicesVisiable, updateServicesVisiable ] = useState<boolean>(false); 
    useEffect(() => {   
        // Load if MTU is not connected 
        if (isMTUConnnected === false) { 
                reqPhidgetConnection();
                reqFSUIPCConnection();
        } 
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        }); 
    }, [appStarted, servicesVisiable]);
    return(  
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ 
                width: "1200px",
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-around",
            }}>
                <PhidgetsServiceConnectionInfo
                    MTUService={"phidgets"}
                />
                <FsuipcServiceConnectionInfo
                    MTUService={"fsuipc"}
                />
            </Box>

            <Box sx={{marginTop: "50px"}}>
                <ThrottleVisual/>
            </Box>
        </Box>
    );
}
export default MTUControlLanding;