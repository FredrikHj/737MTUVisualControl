/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';

import generalTexts from '../data/GeneralTexts';
import FSUIPCInfoContainer from "../data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../data/Phidgets/PhidgetsInfoContainer";
import LoadFsuipcService from '../data/FSUIPC/LoadFsuipcService';
import PhidgetsServerConnection from "../data/Phidgets/PhidgetsServerConnection";
import Throttle737RunningSlicer from '../redux/Throttle737SpeedBrakeSlicer';

var ServiceConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it 
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    const [ reduxStoreServiceObjKey] = useState(`service${MTUService.toUpperCase()}`);
    const [ currentService, updateCurrentService  ] = useState<string>(""); 
    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ fsuipcServiceLoading, updateFsuipcServiceLoading ] = useState<boolean>(false); 
    const [ isFsuipcStarted, updateIsFsuipcStarted ] = useState<boolean>(false);

    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    const [ isFsuipcConnected, updateIsFsuipcConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            updateIsPhidgetsConnected(getNewStoreValues.appStart["isPhidgetsConnected"]);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        }); 
        
        currentService === "" && updateCurrentService(MTUService);
    }, [currentStoreState, reduxStoreServiceObjKey, currentService, phidgetsServiceLoading, isPhidgetsStarted, fsuipcServiceLoading ,isFsuipcStarted ]);
    
    var startMTUServices = (e: any) => {
        var targetButton = e.target.id;
        console.log('targetButton :', targetButton);
        // Set the connectioLoading and Connect to services
        //Phidgets Boards   
        if(targetButton === generalTexts.services["phidgets"]){
            updatePhidgetsServiceLoading(true);
            PhidgetsServerConnection();
                
            setTimeout(() => { 
                updateIsPhidgetsStarted(true);
            }, 500);  
        }  
        // FSUIPC Websocket
        if(targetButton === generalTexts.services["fsuipc"]){
            // Just give the loading proccess to show
            updateFsuipcServiceLoading(true);
            LoadFsuipcService();
            updateIsFsuipcStarted(true);
        }
        
        console.log(MTUService);
        console.log(currentStoreState[reduxStoreServiceObjKey]["connected"]);
        console.log(currentStoreState[reduxStoreServiceObjKey].errorOccured["isError"]);
    }
         
    return(
        <>
                <Box sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                    <Box sx={{           
                        marginTop: "10px",
                        fontWeight: "bold",
                        fontSize: "18px", 
                        letterSpacing: "20px", 
                        textDecoration: "underline"
                    }}>
                        {MTUService.toUpperCase()} <Box sx={{backgroundColor: isPhidgetsConnected === true ? "green" : "red"}}>Connected ?</Box>
                    </Box>
                    {/* <Box sx={{
                        marginTop: "20px",
                        display: "flex", 
                        flexDirection: "row", 
                    }}>
                        {[
                            (
                                (MTUService === generalTexts.services["fsuipc"] && currentStoreState[reduxStoreServiceObjKey]["connected"] === false && currentStoreState[reduxStoreServiceObjKey]["conBottonShowable"] === true) &&
                                <Box sx={{
                                    display: currentStoreState[reduxStoreServiceObjKey]["connected"] === false ? "flex" : "none",
                                    width: "200px", 
                                    flexDirection: "row", 
                                }}>               
                                    <Button sx={{ 
                                        fontSize: "15px",
                                        borderRadius: "20px",
                                    }} id={generalTexts.services["fsuipc"]} key={generalTexts.services["fsuipc"]} onClick={startMTUServices} variant="contained"> 
                                        {currentStoreState[reduxStoreServiceObjKey]["labelConButton"]}
                                    </Button>
                                </Box>
                            ),(
                                (MTUService === generalTexts.services["phidgets"] && currentStoreState[reduxStoreServiceObjKey]["connected"] === false && currentStoreState[reduxStoreServiceObjKey]["conBottonShowable"] === true) &&
                                <Box sx={{
                                    display: currentStoreState[reduxStoreServiceObjKey]["connected"] === false ? "flex" : "none",
                                    width: "200px", 
                                    flexDirection: "row", 
                                }}>               
                                    <Button sx={{ 
                                        fontSize: "15px",
                                        borderRadius: "20px",
                                    }} id={generalTexts.services["phidgets"]} key={generalTexts.services["phidgets"]} onClick={startMTUServices} variant="contained"> 
                                        {currentStoreState[reduxStoreServiceObjKey]["labelConButton"]}
                                    </Button>
                                </Box>
                            )                            
                        ]}
                        <Box
                            sx={{
                                width: "200px",
                                height: "40px",
                                borderRadius: "20px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                letterSpacing: "4px", 
                                backgroundColor: currentStoreState[reduxStoreServiceObjKey]["connected"] === true ? "green" : "red",
                            }}
                            key={"3r2r"}
                        >
                            <Box key={ MTUService }>
                                {(MTUService) &&  
                                    [
                                        (
                                            (phidgetsServiceLoading === false || fsuipcServiceLoading === false) && 
                                            currentStoreState[reduxStoreServiceObjKey]["connected"] === false && 
                                            currentStoreState[reduxStoreServiceObjKey][`${MTUService}ConnectionLoading`] === false && 
                                            currentStoreState[reduxStoreServiceObjKey]["stateName"] 
                                        ), (
                                            (
                                                (phidgetsServiceLoading === true || fsuipcServiceLoading === true) && 
                                                currentStoreState[reduxStoreServiceObjKey]["connected"] === false && 
                                                currentStoreState[reduxStoreServiceObjKey][`${MTUService}ConnectionLoading`] === true
                                            ) && 
                                            <Box sx={{
                                                width: "150px",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                                letterSpacing: "4px",
                                            }}>
                                                {generalTexts.conStates.phidgets.webService["serviceLoading"]}
                                                <LoadingIndicator
                                                    keyStr={ MTUService }
                                                    spinnerType="lds-ring"
                                                    extraStyling={{marginBottom: "10px"}} 
                                                    text=""
                                                />
                                            </Box>
                                        ), (
                                            (
                                                (isPhidgetsStarted === true || isFsuipcStarted === true) &&  
                                                currentStoreState[reduxStoreServiceObjKey]["connected"] === true && 
                                                currentStoreState[reduxStoreServiceObjKey][`${MTUService}ConnectionLoading`] === false
                                            ) &&
                                            <Box sx={
                                                {
                                                    letterSpacing: "4px",
                                                }
                                            }>
                                                {generalTexts.conStates.phidgets.webService["started"]}
                                            </Box>
                                        ),
                                        
                                        
                                        (
                                            
                                            (
                                                currentStoreState[reduxStoreServiceObjKey]["connected"] === false &&
                                                currentStoreState[reduxStoreServiceObjKey].errorOccured["isError"] === true &&
                                                currentStoreState[reduxStoreServiceObjKey]["conBottonShowable"] === true
                                            ) && 
                                            <Box sx={
                                                {
                                                    display: "flex",  
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }
                                            }>
                                                <Box sx={{letterSpacing: "4px"}}>{currentStoreState[reduxStoreServiceObjKey].errorOccured["errorMessegnes"]}</Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    width: "200",
                                                    flexDirection: "row",
                                                    justifyContent: "space-around",
                                                    letterSpacing: "1px"
                                                }}>
                                                    <Box>
                                                        Try to Connect
                                                    </Box>      
                                                    <Box>
                                                        <LoadingIndicator
                                                            keyStr={ MTUService }
                                                            spinnerType="lds-ring"
                                                            extraStyling={{marginBottom: "10px"}} 
                                                            text=""
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ),



                                        (
                                            
                                            (
                                                currentStoreState[reduxStoreServiceObjKey]["connected"] === false &&
                                                currentStoreState[reduxStoreServiceObjKey].errorOccured["isError"] === true &&
                                                currentStoreState[reduxStoreServiceObjKey]["conBottonShowable"] === false
                                            ) && 
                                            <Box sx={
                                                {
                                                    display: "flex",  
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }
                                            }>
                                                <Box sx={{letterSpacing: "4px"}}>{currentStoreState[reduxStoreServiceObjKey].errorOccured["errorMessegnes"]}</Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    width: "200",
                                                    flexDirection: "row",
                                                    justifyContent: "space-around",
                                                    letterSpacing: "1px"
                                                }}>
                                                    <Box>
                                                        Reconnecting
                                                    </Box>      
                                                    <Box>
                                                        <LoadingIndicator
                                                            keyStr={ MTUService }
                                                            spinnerType="lds-ring"
                                                            extraStyling={{marginBottom: "10px"}} 
                                                            text=""
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    ]
                                }
                            </Box>
                        </Box>
                    </Box> */}
                    
                    <Box
                        sx={
                            {
                                marginTop: "15px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                borderRadius: "50px",
                                backgroundColor: "grey",
                            }
                        } key={MTUService}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                         }}
                        >
                            
                            <TableContainer sx={{width: "500px"}} key={generalTexts.services["fsuipc"]}>
                                <FSUIPCInfoContainer
                                    serviceKey={reduxStoreServiceObjKey}
                                />
                            </TableContainer>
                            <TableContainer sx={{width: "400px"}} key={generalTexts.services["phidgets"]}>
                                <PhidgetsInfoContainer
                                    serviceKey={reduxStoreServiceObjKey}
                                />
                            </TableContainer>
                        </Box>
                    </Box>
                </Box> 
    
        </>
    );
}
export default ServiceConnectionInfo;