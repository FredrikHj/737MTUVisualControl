/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from "../store";
import { setAppUpStarted } from "../redux/appStartSlicer";

import reqMTUConnection from "../data/reqFetchMTU";

import { useSelector } from 'react-redux'; 
import React, { useState, useEffect } from 'react';
import checkReduxStoreTree from "../data/CheckStoreState";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";
import { setServicesStatusContainerVisiable, setServicesStatusButtonName } from "../redux/ThrottleReadySlicer"; 

import generalTexts from '../data/GeneralTexts'; 
import ServiceConnectionInfo from "../components/ServiceConnectionInfo";
import ThrottleVisual from "../components/ThrottleVisual";
import reqFetchMTU from "../data/reqFetchMTU";

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
            //updateIsMTUConnected(
                //reqMTUControl();
                reqFetchMTU();
            //);
            /* updateAppStarted(true);
            // Begin to listen for Store state´s changes and initilize listener
            listenerStoreChange();
            setTimeout(() => {initializeStore.dispatch(setAppUpStarted(true));},500);
            */
        }
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        }); 
    }, [appStarted, servicesVisiable]);
    /* var serviceHideShow = (e: any) => {
        var targetButtonId = e.target.id;
        console.log('targetButtonId :', targetButtonId);
        
        if(targetButtonId === "hidden"){
            updateServicesVisiable(true);
            initializeStore.dispatch(setServicesStatusContainerVisiable(true));
            initializeStore.dispatch(setServicesStatusButtonName("visible"));
        }
        if(targetButtonId === "visible"){
            updateServicesVisiable(false);
            initializeStore.dispatch(setServicesStatusContainerVisiable(false));
            initializeStore.dispatch(setServicesStatusButtonName("hidden"));
        }
    } */
    return(  
        <>
                <>
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
                            
                                {/*
                            <ServiceConnectionInfo MTUService={generalTexts.services["fsuipc"]}/>
                                 <Button sx={{ 
                                    display: currentStoreState.throttleReady["servicesConnected"] === false ? "none" : "block",
                                    borderRadius: "20px",
                                    marginTop: "51px",
                                    height: "60px",
                                }} id={currentStoreState.throttleReady.servicesStatus["containerButtonName"]} key={"serviceHideShow"}
                                    onClick={(e) => serviceHideShow(e)} variant="contained"> 
                                    <Box 
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}>
                                        <Box id={currentStoreState.throttleReady.servicesStatus["containerButtonName"]}>Services Information</Box>
                                        <Box id={currentStoreState.throttleReady.servicesStatus["containerButtonName"]}>{currentStoreState.throttleReady.servicesStatus.containerButtonName}</Box>
                                    </Box> 
                                </Button>
                            <ServiceConnectionInfo MTUService={generalTexts.services["phidgets"]}/>
                        </Box>

                        <Box sx={{marginTop: "50px"}}>
                            <ThrottleVisual/>
                        </Box>
                        */}
                        </Box>
                    </Box>
                </>
            
       </>
    );
}
export default MTUControlLanding;