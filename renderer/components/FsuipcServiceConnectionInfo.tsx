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
var FsuipcServiceConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    const [ fsuipcServiceLoading, updateFsuipcServiceLoading ] = useState<boolean>(false); 
    const [ isFsuipcStarted, updateIsFsuipcStarted ] = useState<boolean>(false);
    const [ isFsuipcConnected, updateIsFsuipcConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsFsuipcStarted(getNewStoreValues.serviceFSUIPC["connected"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        }); 
    }, [currentStoreState, fsuipcServiceLoading ,isFsuipcStarted ]);

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
                                        width: "190px",
                                        height: "2.5vh",
                                        backgroundColor: [
                                            ( /* Websocket is active and Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === false &&
                                                isFsuipcConnected === true &&
                                                currentStoreState.serviceFSUIPC["conLost"] === false
                                                    ? "green" : ""
                                            ),( /* Websocket is active and Phidgets is not Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === false &&
                                                isFsuipcConnected === false &&
                                                currentStoreState.serviceFSUIPC["conLost"] === true
                                                    ? "red" : ""
                                            ),( /* Websocket is not Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === true && 
                                                isFsuipcConnected === false && 
                                                currentStoreState.serviceFSUIPC["conLost"] === false 
                                                    ? "red" : ""
                                            )    
                                        ],
                                        textAlign: "center", 
                                        fontSize: "12px", 
                                        letterSpacing: "2,5px",
                                        paddingTop: "3px",
                                    }}>
                                        {[
                                            ( /* Websocket is active and Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === false &&
                                                isFsuipcConnected === true &&
                                                currentStoreState.serviceFSUIPC["conLost"] === false &&
                                                    currentStoreState.serviceFSUIPC["connectionMess"]
                                                
                                            ),( /* Websocket is active and Phidgets is not Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === false &&
                                                isFsuipcConnected === false &&
                                                currentStoreState.serviceFSUIPC["conLost"] === true &&
                                                    currentStoreState.serviceFSUIPC["conLostMess"]
                                            ), ( /* Websocket is not Connected */
                                                currentStoreState.serviceFSUIPC["websocketNotFound"] === true && 
                                                isFsuipcConnected === false && 
                                                currentStoreState.serviceFSUIPC["conLost"] === false &&
                                                currentStoreState.serviceFSUIPC["websocketNotFoundMess"]
                                            )
                                        ]}
                                    </Box>
                                    :   
                                        currentStoreState.serviceFSUIPC["websocketNotFound"] === true && isFsuipcStarted === false && 
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
                        < Box>
                        { /* Show a Loading Spinner if Backend is not Connected */
                        currentStoreState.serviceFSUIPC["websocketNotFound"] === true && isFsuipcStarted === false && 
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
                            <TableContainer sx={{width: "500px"}} key={"fsuipc"}>
                                <FSUIPCInfoContainer
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
export default FsuipcServiceConnectionInfo;