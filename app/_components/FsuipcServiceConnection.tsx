/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../_data/RerenderComponentOnStorageChanges";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';

import FSUIPCInfoContainer from "../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../_data/Phidgets/PhidgetsInfoContainer";
import LoadFsuipcService from '../_data/FSUIPC/LoadFSUIPCConInfo';
import LoadingIndicator from "../_data/LoadingIndicator/LoadingIndicators";

var FsuipcServiceConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);

    const [ fsuipcServiceLoading, updateFsuipcServiceLoading ] = useState<boolean>(false); 
    const [ isFsuipcStarted, updateIsFsuipcStarted ] = useState<boolean>(false);
    const [ isFsuipcConnected, updateIsFsuipcConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnectedc"]);
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
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center", 
                    }}>
                        <Box sx={{
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
                                        marginTop: "-4px",
                                        borderRadius: "20px",
                                        width: "150px",
                                        height: "2.6vh",
                                        color: "black",
                                        backgroundColor: [
                                            ( /* Both MTU server and Phidgets are Connected */
                                                isMtuServerConnected === true && isFsuipcConnected === true
                                                    ? "green" : ""
                                            ),( /* None of MTU server or Phidgets are Connected */
                                                isMtuServerConnected === false && isFsuipcConnected === false
                                                    ? "red" : ""
                                            ),(/* MTU server is connected but Phidgets is not */
                                                isMtuServerConnected === true && isFsuipcConnected === false
                                                    ? "red" : ""
                                            )
                                        ],
                                        textAlign: "center", 
                                        fontSize: "20px", 
                                        letterSpacing: "2,5px",
                                        paddingTop: "3px", 
                                    }}>
                                        {[
                                            ( /* Both MTU server and Phidgets are Connected */
                                                isMtuServerConnected === true && isFsuipcConnected === true &&
                                                currentStoreState.serviceFSUIPC["fsuipcConnectionMess"]
                                                
                                            ),( /* None of MTU server or Phidgets are Connected */
                                                isMtuServerConnected === false && isFsuipcConnected === false &&
                                                currentStoreState.serviceFSUIPC["fsuipcConnectionMess"]

                                            ), (/* MTU server is connected but Phidgets is not */
                                                isMtuServerConnected === true && isFsuipcConnected === false &&
                                                    currentStoreState.serviceFSUIPC["fsuipcConnectionMess"]
                                            )
                                        ]}
                                    </Box>
                                    :   
                                        currentStoreState.serviceFSUIPC["websocketNotFound"] === true && isFsuipcStarted === false && 
                                            <LoadingIndicator
                                                keyStr={MTUService}
                                                spinnerType={"lds-spinner"}
                                                boxStyling={{
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
                                    boxStyling={{
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