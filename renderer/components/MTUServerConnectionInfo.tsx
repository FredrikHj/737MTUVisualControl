/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';

import FSUIPCInfoContainer from "../data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../data/Phidgets/PhidgetsInfoContainer";
import Throttle737RunningSlicer from '../redux/Throttle737SpeedBrakeSlicer';
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
//import mtuViewerInitiation from"../data/MtuViewerInitiation";

import { isJsxFragment } from "typescript";
var MTUServerConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    const [ mtuServerLoading, updateMtuServerLoading ] = useState<boolean>(false); 
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["connected"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, mtuServerLoading, isMtuServerConnected ]);
    
    console.log('currentStoreState :', currentStoreState);
    return(
        <>
            {currentStoreState !== null &&
                <Box sx={{
                    width: "100%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                    <Box sx={{
                        marginTop: "10px",
                        width: "450px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center", 
                    }}>
                    <Box sx={{
                        marginTop: "36px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-around", 
                        }}>
                            <Box sx={{
                                width: "320px",
                                height: "50px", 
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
                                        width: "150px",
                                        height: "2.5vh",
                                        backgroundColor: 
                                        /* iF mtuServern is active make the background in green or if not in red*/
                                            isMtuServerConnected === true ? "green" : "red",                                        
                                        textAlign: "center", 
                                        fontSize: "12px", 
                                        letterSpacing: "2,5px",
                                        paddingTop: "3px",
                                    }}>
                                        {currentStoreState.mtuServer["mtuServerConnectionMess"]} 
                                    </Box>
                                    : 
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
                               isMtuServerConnected === false && 
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
                        } key={MTUService.split().length !== 0 && MTUService}
                    >
                       
                    </Box>
                </Box>
            }
        </>
    );
}
export default MTUServerConnectionInfo;