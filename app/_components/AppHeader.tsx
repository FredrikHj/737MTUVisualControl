/* ================================================== Header ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';
import {MTUServerConnectionStatus} from"./MTUServerConnection";
import {ServicePhidgetsConStatus} from"./ServicePhidgetsConStatus";

var AppHeader = () =>{
  
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
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
        }}>
            <Box sx={{
                width: "100%",
                display: "flex", 
                flexDirection: "row", 
            }}>
                <Box sx={{
                    border: "1px solid red",
                    width: "20%",
                }}>
                    Logga
                </Box>
                <Box sx={{
                    border: "1px solid red",
                    width: "60%",
                    textAlign: "center",
                }}>
                     <Box sx={{fontSize: "40px", letterSpacing: "20px"}}>
                        FS MTU Overview
                    </Box>
                </Box>
                <Box sx={{
                    border: "1px solid red",
                    width: "20%",
                }}>
                </Box>
            </Box>
            <Box sx={{
                marginTop: "10px",
                width: "100%",
                display: "flex", 
                flexDirection: "row", 
            }}>
                <Box sx={{
                    border: "1px solid red",
                    width: "50%",
                    display: "flex", 
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                    <MTUServerConnectionStatus/>
                </Box>
                <Box sx={{
                    border: "1px solid red",
                    width: "60%",
                    display: "flex", 
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <Box>
                        <ServicePhidgetsConStatus/>
                    </Box>
                    <Box>
                        csad
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default AppHeader;