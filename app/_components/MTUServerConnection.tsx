/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import LinkOffRoundedIcon from '@mui/icons-material/LinkOffRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import {componentRerenderStorageChanges$} from "../_data/RerenderComponentOnStorageChanges";
import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import serverConfig from "../_data/ServerConfig";
import ServerErrorRetrying from "../_data/ServerErrorRetrying";
import FSUIPCInfoContainer from "../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../_data/Phidgets/PhidgetsInfoContainer";
import LoadingIndicator from "../_data/LoadingIndicator/LoadingIndicators";

//import mtuViewerInitiation from"../data/MtuViewerInitiation";
//Get store States
var storeStates: any = initializeStore.getState();
var currentPageData = storeStates["mtuServer"];
console.log('currentPageData :', currentPageData);

// MTUServerConnectionStatus ---------------------------------------------------------------------------------------
export var MTUServerConnectionStatus = () =>{
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ MTUService, updateMTUService] = useState<string>("")
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);   
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    const [ isPhidgetsServerConnected, updateIsPhidgetsServerConnected ] = useState<boolean>(false);   
    const [ isPhidgetsServerError, updateIsPhidgetsServerError ] = useState<boolean>(false); 

    const [ isFsuipcServerConnected, updateIsFsuipcServerConnected ] = useState<boolean>(false);   
    const [ isFsuipcServerError, updateIsFsuipcServerError ] = useState<boolean>(false); 
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateCurrrentStoreState(getNewStoreValues["mtuServer"]);
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues.mtuServer["mtuServerError"]);

                updateIsPhidgetsServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsPhidgetsServerError(getNewStoreValues.mtuServer["mtuServerError"]);
                
                updateIsFsuipcServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsFsuipcServerError(getNewStoreValues.mtuServer["mtuServerError"]);

                //getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, isMtuServerConnected, isMtuServerError ]);
    console.log('currentStoreState :', currentStoreState);
    return(
        <Box sx={{
            width: "600px",
            marginTop: "7px",
            display: "flex", 
            flexDirection: "row",
        }}>  
            <Box sx={{
                height: "30px",
                fontWeight: "bold",
                fontSize: "18px", 
                letterSpacing: "20px", 

            }}>
                {currentStoreState["name"].toUpperCase()}
            </Box>
            <Box>{ " - "}</Box>
            <Box sx={{
                fontWeight: "bold",
                fontSize: "18px", 
                display: "flex",
                color: "white",
                flexDirection: "row", 
            }}>
                {/*  Show a Loading Spinner if currentStoreState is null  */}
                <Box sx={{
                    marginLeft: "10px", 
                    marginTop: "-4px",
                    borderRadius: "20px",
                    width: isMtuServerConnected === true ? "140px" : "190px",
                    height: "2.6vh",
                    color: "white",
                    backgroundColor: 
                   /*  iF mtuServern is active make the background in green or if not in red */
                        isMtuServerConnected === true ? "green" : "red",                                        
                    textAlign: "center", 
                    fontSize: "20px", 
                    letterSpacing: "2,5px",
                    paddingTop: "3px",
                }}>
                    <Box sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        width: isMtuServerConnected === true ? "120px": "170px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        {currentStoreState["mtuServerConnectionMess"]}
                        
                        {(isMtuServerConnected === false)
                            ?   <LinkOffRoundedIcon fontSize="small" color="primary"/>
                            :   <LinkRoundedIcon fontSize="small" color="white"/>
                            
                        }
                    </Box>
                </Box> 
            </Box>
            <Box sx={{
                marginLeft: "-400px",
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
            }} key={currentStoreState["name"]}>
                <ServerErrorRetrying
                    showingConditions={isMtuServerConnected === false && isMtuServerError === true }
                    serviceName={currentStoreState["name"]}
                    textMess={
                        currentStoreState !== null && currentStoreState["mtuServerErrorMess"]
                    }
                />
            </Box>
        </Box>
    );
}

// MTUServerConnectionInfo ----------------------------------------------------------------------------------------
export var MTUServerConnectionInfo = () =>{ 
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log('getNewStoreValues :', getNewStoreValues);
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues.mtuServer["mtuServerError"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues["mtuServer"]);
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{textAlign: "", fontSize: "30px"}} colSpan={3}>{currentStoreState["name"]}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>     
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{
                                borderBottom: "none",
                            }}> 
                                Connect to:    
                            </TableCell>

                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                                {/* iF mtuServern is connected show the correct values */}
                                    {isMtuServerConnected === true ? `${currentStoreState["serverHost"]} - ID: ${currentStoreState["serverConId"]}`  : "None Server"}
                            </TableCell> 

                            <TableCell sx={{
                                borderBottom: "none",
                            }}> 
                            </TableCell>

                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                                Port Number:
                            </TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                                {/* iF mtuServern is connected show the correct values */}
                                    {isMtuServerConnected === true ? currentStoreState["serverPort"] : "Port is Missing"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Box>
    );
}