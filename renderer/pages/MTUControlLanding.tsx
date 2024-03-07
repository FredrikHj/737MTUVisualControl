/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from"../store";
import { useSelector } from 'react-redux'; 
import React, { useState, useEffect } from'react';
import ThrottleVisual from"../components/ThrottleVisual";
import checkReduxStoreTree from"../data/CheckStoreState";
import reqFSUIPCConnection from"../data/FSUIPC/reqFSUIPCConnection";
import reqPhidgetConnection from"../data/reqPhidgetConnection";
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
import FsuipcServiceConnectionInfo from"../components/FsuipcServiceConnectionInfo";
import PhidgetsServiceConnectionInfo from"../components/PhidgetsServiceConnectionInfo";
import {componentRerenderStorageChanges$} from"../data/RerenderComponentOnStorageChanges";
import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';

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
                updateIsMTUConnected(true);
        } 
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
        
            setTimeout(() => {
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
              }, 2000);
        
        }); 
    }, [appStarted, servicesVisiable]);
    return(  
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"
        }}>
            {(currentStoreState !== null) ?
                <>
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
                </>
                
                : 
                    /* Show a Loading Spinner while the app is starting */
                    <LoadingIndicator
                        keyStr={"Loading"}
                        spinnerType={"lds-spinner"}
                        extraStyling={{
                            marginTop: "100vh",
                            display: "flex", 
                            flexDirection: "row", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px",
                            size: "1000rem"
                    }}
                        text={"Loading"}
                    />
            }
        </Box>
    );
}
export default MTUControlLanding;