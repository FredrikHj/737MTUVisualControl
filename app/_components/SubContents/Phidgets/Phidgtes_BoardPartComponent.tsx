/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";

var Phidgets_BoardPart = () =>{
    //Get store States
        var reduxStorePlaceMTUServer = "conStatusMTUServer";
        var reduxStorePlaceService = "conStatusServicePHIDGETS";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlaceService];

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
                updateCurrrentStoreState(getNewStoreValues[reduxStorePlaceService]);
                    
                console.log(Object.keys(getNewStoreValues).length !== 0);
                updateIsMtuServerConnected(getNewStoreValues[reduxStorePlaceMTUServer]["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues[reduxStorePlaceMTUServer]["mtuServerError"]);

                updateIsPhidgetsConnected(getNewStoreValues[reduxStorePlaceService]["isPhidgetsConnected"]);
                updateIsPhidgetsServerError(getNewStoreValues[reduxStorePlaceService]["phidgetsServerError"]);
                updateIsPhidgetsConLost(getNewStoreValues[reduxStorePlaceService]["phidgetsConLost"]);
                //getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, phidgetsServiceLoading, isMtuServerConnected, isPhidgetsConnected, isPhidgetsServerError, isPhidgetsConLost ]);
    
    console.log('currentStoreState :', currentStoreState);

    return(
        <Box sx={{
            width: "100%",
            flexDirection: "column", 
            fontWeight: "bold",
        }}>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "1px solid grey",
                                textAlign: "center",
                                fontSize: "20px"
                            }}> 
                                Name    
                            </TableCell>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "1px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }}> 
                                State    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "1px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }}>
                                Name    
                            </TableCell>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "1px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }}> 
                                State    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "3px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }}> 
                                Name    
                            </TableCell>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "3px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }}> 
                                State    
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Phidgets_BoardPart;