/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';

import FSUIPCInfoContainer from "../data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../data/Phidgets/PhidgetsInfoContainer";
import LoadFsuipcService from '../data/FSUIPC/';
import Throttle737RunningSlicer from '../redux/Throttle737SpeedBrakeSlicer';
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
var PhidgetsServiceConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    const [ isFsuipcConnected, updateIsFsuipcConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsPhidgetsConnected(getNewStoreValues.servicePHIDGETS["connected"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, phidgetsServiceLoading, isPhidgetsStarted ]);

    return(
        <>
            {(currentStoreState !== null) &&
                <Box sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                    <Box sx={{
                        marginTop: "10px",
                        width: "450px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-around", 
                    }}>
                        <Box sx={{
                            marginTop: "36px",
                            display: "flex", 
                            flexDirection: "row",
                            justifyContent: "space-around", 
                        }}>
                            <Box sx={{           
                                fontWeight: "bold",
                                fontSize: "18px", 
                                letterSpacing: "20px", 
                                display: "flex", 
                                flexDirection: "row", 
                            }}>
                                {MTUService.toUpperCase()}        
                            </Box>
                            <Box>{ " - "}</Box>
                            <Box sx={{
                                fontWeight: "bold",
                                fontSize: "18px", 
                                display: "flex",
                                color: "white",
                                flexDirection: "row", 
                            }}>
                                {/* Show a Loading Spinner if currentStoreState is null */
                                currentStoreState !== null ?
                                    <Box sx={{
                                        marginLeft: "10px",
                                        borderRadius: "10px",
                                        width: "180px",
                                        height: "2.5vh",
                                        backgroundColor: [
                                            ( /* Backend is Activ and Phidgets is Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === false &&
                                                isPhidgetsConnected === true &&
                                                currentStoreState.servicePHIDGETS["conLost"] === false
                                                    ? "green" : ""
                                            ),( /* Backend is activ and Phidgets is not Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === false &&
                                                isPhidgetsConnected === false &&
                                                currentStoreState.servicePHIDGETS["conLost"] === true
                                                    ? "red" : ""
                                            ),( /* Backend is not Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === true && 
                                                isPhidgetsConnected === false && 
                                                currentStoreState.servicePHIDGETS["conLost"] === false 
                                                    ? "red" : ""
                                            )    
                                        ],
                                        textAlign: "center", 
                                        fontSize: "12px", 
                                        letterSpacing: "2,5px",
                                        paddingTop: "3px",
                                    }}>
                                        {[
                                            ( /* Backend is active and Phidgets is Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === false &&
                                                isPhidgetsConnected === true &&
                                                currentStoreState.servicePHIDGETS["conLost"] === false &&
                                                    currentStoreState.servicePHIDGETS["connectionMess"]
                                                
                                            ),( /* Backend is active and Phidgets is not Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === false &&
                                                isPhidgetsConnected === false &&
                                                currentStoreState.servicePHIDGETS["conLost"] === true &&
                                                    currentStoreState.servicePHIDGETS["conLostMess"]
                                            ), ( /* Backend is not Connected */
                                                currentStoreState.servicePHIDGETS["backendNotFound"] === true && 
                                                isPhidgetsConnected === false && 
                                                currentStoreState.servicePHIDGETS["conLost"] === false &&
                                                currentStoreState.servicePHIDGETS["backendNotFoundMess"]
                                            )
                                        ]} 
                                    </Box>
                                    : 
                                        currentStoreState.servicePHIDGETS["backendNotFound"] === true &&  isPhidgetsConnected === false && 
                                            <LoadingIndicator
                                                keyStr={MTUService}
                                                spinnerType={"lds-spinner"}
                                                extraStyling={{
                                                    marginTop: "-100x",
                                                    display: "flex", 
                                                    flexDirection: "row", 
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    padding: "5px",
                                                    size: "1000rem"
                                                }}
                                                text={""}
                                            />
                                }
                            </Box>
                        </Box>
                        <Box>
                            { /* Show a Loading Spinner if Backend is not Connected */
                                currentStoreState.servicePHIDGETS["backendNotFound"] === true && isPhidgetsConnected === false && 
                                    <LoadingIndicator
                                        keyStr={MTUService}
                                        spinnerType={"lds-spinner"}
                                        extraStyling={{
                                            marginTop: "-100x",
                                            display: "flex", 
                                            flexDirection: "row", 
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "5px",
                                            size: "1000rem"
                                    }}
                                    text={""}
                                />
                            } 
                        </Box>
                    </Box>
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
                        } key={MTUService}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TableContainer sx={{width: "400px"}} key={"phidgets"}>
                                <PhidgetsInfoContainer
                                    serviceKey={MTUService}
                                />
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
}
export default PhidgetsServiceConnectionInfo;