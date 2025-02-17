/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import LinkOffRoundedIcon from '@mui/icons-material/LinkOffRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";
import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import serverConfig from "../../../_data/ServerConfig";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";

//import mtuViewerInitiation from"../data/MtuViewerInitiation";

var MTUServerConInfo = () =>{ 
    //Get store States
        var reduxStorePlace = "conStatusMTUServer";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlace];
        console.log('currentPageData :', currentPageData);
        
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
                updateIsMtuServerConnected(getNewStoreValues[reduxStorePlace]["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);
                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues[reduxStorePlace]);
            }
        });
    }, [currentStoreState, isMtuServerConnected, isMtuServerError ]);
     
    console.log('currentStoreState :', currentStoreState);
    return(
        <Box sx={{
            borderBottom: "3px solid grey", 
            width: "100%",
            fontSize: "25px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            fontWeight: "bold",
            letterSpacing: "10px", 
        }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                borderBottom: "3px solid grey",
                                textAlign:"center", 
                                fontSize: "30px", 
                                fontWeight: "bold", 
                                letterSpacing: "35px"
                            }} colSpan={10}>
                                {currentStoreState["headlineName"].split(' ')[0].toUpperCase()}
                            </TableCell>
                        </TableRow>     
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey",
                                borderBottom: "3px solid grey",
                                textAlign: "center", 
                                fontSize: "25px",
                            }}> 
                                Connect to    
                            </TableCell>
                            <TableCell sx={{
                                borderRight: "3px solid grey", 
                                borderBottom: "3px solid grey", 
                                textAlign: "center", 
                                fontSize: "25px"
                            }}>
                                Port Number                                
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
                                 {/* iF mtuServern is connected show the correct values */}
                                 Host: {isMtuServerConnected === true ? currentStoreState["serverHost"].toUpperCase()  : "None Server"}    
                            </TableCell>
                            <TableCell sx={{
                                borderRight: "3px solid grey",
                                textAlign: "center", 
                                fontSize: "20px"
                            }} rowSpan={2}>
                                {/* iF mtuServern is connected show the correct values */}
                                {isMtuServerConnected === true ? currentStoreState["serverPort"] : "Port is Missing"}
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell sx={{
                                borderLeft: "3px solid grey", 
                                borderRight: "1px solid grey", 
                                textAlign: "center", 
                                fontSize: "20px"
                            }}>
                                ID: {isMtuServerConnected === true ? currentStoreState["serverConId"] : "No Value" }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MTUServerConInfo;