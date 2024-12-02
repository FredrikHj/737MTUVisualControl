/* ================================================== FSUIPC Servie Info Container ==================================================
Import  modules */
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Typography, fabClasses } from '@mui/material';
import { useSelector } from 'react-redux';
import {componentRerenderStorageChanges$} from "../RerenderComponentOnStorageChanges";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicators";

import { log } from 'console';

const FSUIPCInfoContainer = (props: any) => { 
    const { serviceKey } = props;
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    console.log('currentStoreState :', currentStoreState);
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            setTimeout(() => {
            }, 5000);
        }); 
    }, [currentStoreState]);
    console.log('currentStoreState :', currentStoreState, serviceKey);
  
    return(  
        <>
{/*             {(currentStoreState !== null && Object.keys(currentStoreState).length !== 0) &&
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign: "center", fontSize: "15px"}} colSpan={2}>
                                    FlightSim Info
                                </TableCell>
                                    
                                <TableCell>
                                    
                                </TableCell>

                                <TableCell sx={{textAlign: "center", fontSize: "15px"}} colSpan={2}>
                                    Service Info
                                </TableCell>
                            </TableRow>     
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell> 
                                    Connected to FlightSim?    
                                </TableCell>

                                <TableCell>
                                    {
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === true ? "Yes" : "No"
                                            :   generalTexts.mixedTexts["noData"]
                                    }
                                </TableCell> 
                                <TableCell> 
                                </TableCell>
                                <TableCell>
                                    FSUIPC WebSocket Server Version
                                </TableCell>
                                <TableCell>
                                    { 
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["FSUIPCWebSocketServerVersion"]
                                            :   generalTexts.mixedTexts["noData"]
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    FlightSim
                                </TableCell>
                                <TableCell>
                                    {                                        
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === false && currentStoreState[serviceKey].connectionInfo.receivedData.data["flightSim"] === null ? generalTexts.mixedTexts["noInfo"] : currentStoreState[serviceKey].connectionInfo.receivedData.data["flightSim"]
                                            :   generalTexts.mixedTexts["noData"]
                                    }
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    FSUIPCVersion
                                </TableCell>
                                <TableCell>
                                    {
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === false && currentStoreState[serviceKey].connectionInfo.receivedData.data["FSUIPCVersion"] === null ? generalTexts.mixedTexts["noInfo"] : currentStoreState[serviceKey].connectionInfo.receivedData.data["FSUIPCVersion"]
                                            :   generalTexts.mixedTexts["noData"]
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    FlightSimVersion Code
                                </TableCell>
                                <TableCell>
                                    {
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === false ? "Not Info" : currentStoreState[serviceKey].connectionInfo.receivedData.data["flightSimVersionCode"]
                                            :   generalTexts.mixedTexts["noData"]
                                    }                                        
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    Update is Available?
                                </TableCell>
                                <TableCell>
                                    {   
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === true && currentStoreState[serviceKey].connectionInfo.receivedData.data["newServerVersionAvailable"] === true ? "yes" : "No"
                                            :   generalTexts.mixedTexts["noData"]
                                    }                             
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    FlightSim Version
                                </TableCell>
                                <TableCell>
                                    {
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === false ? "Not Info" : currentStoreState[serviceKey].connectionInfo.receivedData.data["flightSimVersionText"] === null ? generalTexts.mixedTexts["noInfo"] : currentStoreState[serviceKey].connectionInfo.receivedData.data["flightSimVersionText"]
                                            :   generalTexts.mixedTexts["noData"]
                                    }
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    WideClient Connection?
                                </TableCell>
                                <TableCell>
                                    {
                                        currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                            ?   currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectionOpen"] === true && currentStoreState[serviceKey].connectionInfo.receivedData.data["isConnectedToWideClient"] === true ? "yes" : "No"
                                            :   generalTexts.mixedTexts["noData"]
                                    }                                           
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
 */}        </>    
    );
}
export default FSUIPCInfoContainer;