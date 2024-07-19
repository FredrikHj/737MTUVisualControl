/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";

import { Box, TableContainer } from '@mui/material';

import FSUIPCInfoContainer from "../data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../data/Phidgets/PhidgetsInfoContainer";
import Throttle737RunningSlicer from '../redux/Throttle737SpeedBrakeSlicer';
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
var PhidgetsServiceConnectionInfo = (props: any) =>{
    const { MTUService } = props;

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);

    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            if(Object.keys(getNewStoreValues).length !== 0){
                console.log(Object.keys(getNewStoreValues).length !== 0);
                updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
                updateIsPhidgetsConnected(getNewStoreValues.servicePHIDGETS["isPhidgetsConnected"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, phidgetsServiceLoading, isMtuServerConnected, isPhidgetsConnected ]);

    return(
        <>
            {currentStoreState !== null &&
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
                                        marginTop: "-2px",
                                        marginLeft: "10px", 
                                        borderRadius: "20px",
                                        width: "150px",
                                        height: "4vh",
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
                                                currentStoreState.servicePHIDGETS["phidgetsConnectionMess"]
                                                
                                            ),( /* None of MTU server or Phidgets are Connected */
                                                isMtuServerConnected === false && isPhidgetsConnected === false &&
                                                currentStoreState.servicePHIDGETS["phidgetsConnectionMess"]

                                            ), (/* MTU server is connected but Phidgets is not */
                                                isMtuServerConnected === true && isPhidgetsConnected === false &&
                                                    currentStoreState.servicePHIDGETS["phidgetsConnectionMess"]
                                            )
                                        ]} 
                                    </Box>
                                    : 
                                    currentStoreState.servicePHIDGETS["backendFound"] === true &&  isPhidgetsConnected === false && 
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
                                currentStoreState.servicePHIDGETS["backendFound"] === true && isPhidgetsConnected === false && 
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
                        <Box
                        sx={{
                            display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TableContainer sx={{width: "400px"}} key={"phidgets"}>
                                <PhidgetsInfoContainer
                                    serviceKey={MTUService.split().length !== 0 && MTUService}
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