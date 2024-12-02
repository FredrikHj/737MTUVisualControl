/* ================================================== Header ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';
import {MTUServerConnectionStatus} from"./MTUServerConnection";

var AppHeader = (props: any) =>{
    const { MTUService } = props;
  
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
            flexDirection: "row", 
        }}>
            <Box sx={{
                border: "1px solid red",
                width: "30%",
     
            }}>
                Logga
            </Box>
            <Box sx={{
                border: "1px solid red",
                width: "40%",
                display: "flex", 
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <MTUServerConnectionStatus/>
            </Box>
            <Box sx={{
                border: "1px solid red",
                width: "30%",
            }}>
                
            </Box>
        </Box>
    );
}
export default AppHeader;