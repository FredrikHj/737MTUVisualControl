/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import FSUIPCInfoContainer from "../data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../data/Phidgets/PhidgetsInfoContainer";
import Throttle737RunningSlicer from '../redux/Throttle737SpeedBrakeSlicer';
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
import serverConfig from "../data/ServerConfig";

//import mtuViewerInitiation from"../data/MtuViewerInitiation";

import { isJsxFragment } from "typescript";
import { Border } from "devextreme-react/cjs/bar-gauge";
var MTUServerConnectionInfo = (props: any) =>{
    const { MTUService } = props;
  
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            console.log('getNewStoreValues :', getNewStoreValues);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues.mtuServer["mtuServerError"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, isMtuServerConnected, isMtuServerError ]);
     
    console.log('currentStoreState :', currentStoreState);
    return(
        <Box sx={{
            width: "100%",
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center"
        }}>
            <Box sx={{
                marginTop: "10px",
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
                        {/* Show a Loading Spinner if currentStoreState is null */}
                            <Box sx={{
                                marginTop: "-4px",
                                marginLeft: "10px", 
                                borderRadius: "20px",
                                width: "150px",
                                height: "4vh",
                                color: "black",
                                backgroundColor: 
                                /* iF mtuServern is active make the background in green or if not in red*/
                                    isMtuServerConnected === true ? "green" : "red",                                        
                                textAlign: "center", 
                                fontSize: "20px", 
                                letterSpacing: "2,5px",
                                paddingTop: "3px",
                            }}>
                                {currentStoreState !== null && currentStoreState.mtuServer["mtuServerConnectionMess"]} 
                            </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={
                    {
                        width: "50%",
                        marginTop: "-15px",
                        marginBottom: "15px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "red",
                    }
                } key={MTUService.split().length !== 0 && MTUService}
            >
                <Box>
                    {isMtuServerConnected === false && isMtuServerError === true 
                        &&
                            <LoadingIndicator
                                keyStr={MTUService}
                                spinnerType={"lds-spinner"}
                                extraStyling={{
                                    marginLeft: "-100px",
                                    display: "flex", 
                                    flexDirection: "row", 
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "480px",
                                }}
                                textStyling={{
                                    width: "60%",
                                }}
                                text={"Server Error - Retrying!"}
                            />
                    }
                </Box>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{textAlign: "", fontSize: "30px"}} colSpan={3}>Server Connection Info</TableCell>
                            <TableCell></TableCell>
                        </TableRow>     
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{
                                borderBottom: "none",
                            }}> 
                                Connected to Host    
                            </TableCell>

                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                               {/* iF mtuServern is connected show the correct values */
                                    isMtuServerConnected === true ? serverConfig.hostname : "No"}
                            </TableCell> 

                            <TableCell sx={{
                                borderBottom: "none",
                            }}> 
                            </TableCell>

                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                                Port Number
                            </TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                               {/* iF mtuServern is connected show the correct values */
                                    isMtuServerConnected === true ? serverConfig.port : "No Value"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default MTUServerConnectionInfo;