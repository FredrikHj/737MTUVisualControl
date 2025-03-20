/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';
import Phidgets_ServicePart from "./Phidgtes_ServicePartComponent";
import Phidgets_BoardPart from "./Phidgtes_BoardPartComponent";
import { CacheProvider } from '@emotion/react';

var PhidgetsConInfo_Main = () =>{   
    // Get updated Store state and save it  
        const [ serviceName ] = useState<string>("PHIDGETS");

    return(
        <>
            <Box sx={{
                textAlign: "center", 
                fontSize: "30px", 
                fontWeight: "bold", 
                letterSpacing: "35px"
            }}>
                {serviceName}
            </Box>
            <Table>
                <TableRow>
                    <TableCell sx={{
                        width: "2.02%",
                        textAlign: "center", 
                        fontSize: "25px",
                        borderBottom: "none",
                    }}> 
                        Server Info    
                    </TableCell>
                    <TableCell sx={{
                        width: "1.99%",
                        textAlign: "center", 
                        fontSize: "25px",
                        borderBottom: "none",
                    }}> 
                        Controllerboard Info      
                    </TableCell>
                </TableRow>
            </Table>
            <Box sx={{
                borderTop: "3px solid grey", 
                width: "100%",
                fontSize: "25px", 
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "center",
                fontWeight: "bold",
                letterSpacing: "10px"
            }}>
                <Phidgets_ServicePart/>
                <Phidgets_BoardPart/>
                
            </Box>
        </>
    );
}

export default PhidgetsConInfo_Main;