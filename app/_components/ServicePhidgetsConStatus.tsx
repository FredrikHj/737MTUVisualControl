/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import FSUIPCInfoContainer from "../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../_data/ServerErrorRetrying";
import LoadingIndicator from "../_data/LoadingIndicator/LoadingIndicators";


export var ServicePhidgetsConStatus = () =>{
    //Get store States
    var storeStates: any = initializeStore.getState();
    var currentPageData = storeStates["servicePHIDGETS"];
    console.log('currentPageData :', currentPageData);
    
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);

    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    const [ isPhidgetsServerError, updateIsPhidgetsServerError ] = useState<boolean>(false); 
    const [ isPhidgetsConLost, updateIsPhidgetsConLost ] = useState<boolean>(false); 

    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            if(Object.keys(getNewStoreValues).length !== 0){
                updateCurrrentStoreState(getNewStoreValues["servicePHIDGETS"]);
                    
                console.log(Object.keys(getNewStoreValues).length !== 0);
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues.mtuServer["mtuServerError"]);

                updateIsPhidgetsConnected(getNewStoreValues.servicePHIDGETS["isPhidgetsConnected"]);
                updateIsPhidgetsServerError(getNewStoreValues.servicePHIDGETS["phidgetsServerError"]);
                updateIsPhidgetsConLost(getNewStoreValues.servicePHIDGETS["phidgetsConLost"]);
                //getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, phidgetsServiceLoading, isMtuServerConnected, isPhidgetsConnected, isPhidgetsServerError, isPhidgetsConLost ]);
    
    console.log('currentStoreState :', currentStoreState["name"]);

    return(
        <Box sx={{
            width: "500px",
            marginTop: "7px",
            display: "flex", 
            flexDirection: "column", 
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
                                        isMtuServerConnected === true && isPhidgetsConnected === true
                                            ? "green" : ""
                                    ),( /* None of MTU server or Phidgets are Connected */
                                        isMtuServerConnected === false && isPhidgetsConnected === false
                                            ? "red" : ""
                                    ),(/* MTU server is connected but Phidgets is not */
                                        isMtuServerConnected === true && isPhidgetsConnected === false
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
                                        isMtuServerConnected === true && isPhidgetsConnected === true &&
                                            currentStoreState["phidgetsConnectionMess"]
                                        
                                    ),( /* None of MTU server or Phidgets are Connected */
                                        isMtuServerConnected === false && isPhidgetsConnected === false &&
                                            currentStoreState["phidgetsConnectionMess"]

                                    ), (/* MTU server is connected but Phidgets is not */
                                        isMtuServerConnected === true && isPhidgetsConnected === false &&
                                            currentStoreState["phidgetsConnectionMess"]
                                    )
                                ]} 
                            </Box>
                            : 
                            currentStoreState["backendFound"] === true &&  isPhidgetsConnected === false && 
                                <LoadingIndicator
                                    keyStr={currentStoreState["name"]}
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
                <Box>
                    { /* Show a Loading Spinner if Backend is not Connected */
                        currentStoreState["backendFound"] === true && isPhidgetsConnected === false && 
                            <LoadingIndicator
                                keyStr={currentStoreState["name"]}
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
            {[
                (
                    isPhidgetsConnected === true && isPhidgetsServerError === false &&
                    <Box sx={{
                        marginTop: "15px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        borderRadius: "50px",
                        backgroundColor: "grey",
                    }} key={currentStoreState["name"].split().length !== 0 && currentStoreState["name"]}>
                        <Box
                            sx={{
                                display: "flex",
                                    flexDirection: "column",
                                }}
                        >
                            <TableContainer sx={{width: "400px"}} key={"phidgets"}>
                                <PhidgetsInfoContainer
                                    serviceKey={currentStoreState["name"].split().length !== 0 && currentStoreState["name"]}
                                />
                            </TableContainer>
                        </Box>
                    </Box>
                ), (
                        isMtuServerConnected === true && isPhidgetsConnected === false &&
                            <Box
                                sx={{
                                    width: "50%",
                                    marginTop: "10px",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "red",
                            }}>
                                <ServerErrorRetrying 
                                    showingConditions={isMtuServerConnected === true && isPhidgetsConnected === false}
                                    serviceName={currentStoreState["name"]}
                                    textMess={ currentStoreState !== null && isPhidgetsConLost === true 
                                        ?   currentStoreState["phidgetsConLostMess"]
                                        :   currentStoreState["phidgetsConnectionMess"] 
                                    }

                                />
                            </Box>
                )        
            ]}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{textAlign: "", fontSize: "30px"}} colSpan={3}>Connection Info</TableCell>
                            <TableCell></TableCell>
                        </TableRow>     
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{
                                borderBottom: "none",
                            }}> 
                                Connected to:    
                            </TableCell>

                            <TableCell sx={{
                                borderBottom: "none",
                            }}>
                            {/* iF mtuServern is connected show the correct values */
                                isPhidgetsConnected === true ? currentStoreState.servicePHIDGETS["phidgetsServerHost"] : "None server"}
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
                            {/* iF mtuServern is connected show the correct values */
                                isPhidgetsConnected === true ? currentStoreState.servicePHIDGETS["phidgetsServerPort"] : "No Value" }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}