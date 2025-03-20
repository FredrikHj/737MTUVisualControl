/* ================================================== Header ==================================================
Import  modules */
import { initializeStore } from "../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';
import MTUServerConStatus from"../SubContents/MTUServer/MTUServerConStatus";
import PhidgetsConStatus from"../SubContents/Phidgets/PhidgetsConStatus";
import ServerErrorRetrying from "../../_data/ServerErrorRetrying";

var AppHeader = () =>{
    //Get store States
        var reduxStorePlace = "conStatusMTUServer";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlace];

    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);   
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues[reduxStorePlace]["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);
            }

        });
    });

    console.log('currentStoreState :', currentStoreState);

    return(
        <Box sx={{
            width: "100%",
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "brown",
            fontWeight: "bold",
        }}>
            <Box sx={{
                width: "100%",
                display: "flex", 
                flexDirection: "row", 
            }}>
                <Box sx={{
                    width: "15%",
                }}>
                    Logga
                </Box>
                <Box sx={{
                    width: "60%",
                    textAlign: "center",
                }}>
                     <Box sx={{fontSize: "40px", letterSpacing: "20px"}}>
                        FSMTU Overview
                    </Box>
                </Box>
                <Box sx={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems:  "center",           
                }}>
                    <MTUServerConStatus/>
                </Box>
            </Box>
            {currentPageData["isMtuServerConnected"] === true &&
                <Box sx={{
                    marginTop: "30px",
                    width: "100%",
                    display: "flex", 
                    flexDirection: "row",
                }}>
                    <Box sx={{
                        width: "50%",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems:  "center",  
                    }}>
                        <PhidgetsConStatus/>
                    </Box>
                    <Box sx={{
                        border: "1px solid red",
                        width: "60%",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}>
                    </Box>
                </Box>
            }
        </Box>
    );
}
export default AppHeader;