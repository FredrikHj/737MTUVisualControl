/* ================================================== Phidgets Servie Info Container ==================================================
Import  modules */
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {componentRerenderStorageChanges$} from "../RerenderComponentOnStorageChanges";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicators";

import { log } from 'console';

var PhidgetsInfoContainer = (props: any) => {
    const {serviceKey} = props;
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);

    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        });
    }, [currentStoreState]);
    console.log('currentStoreState :', currentStoreState, serviceKey);
 
    return(  
        <> 
            {/*
            {(currentStoreState !== null && Object.keys(currentStoreState).length !== 0) &&
                 <Table>
                    <TableHead> 
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", fontSize: "15px"}} colSpan={5}>
                                Phidgets Server Info:
                            </TableCell>
                        </TableRow>     
                    </TableHead>
                    <TableBody> 
                        <TableRow>
                            <TableCell sx={{ textAlign: "center"}} colSpan={2}> 
                                Server Messegnes
                            </TableCell>
                            <TableCell sx={{ textAlign: "center"}} colSpan={3}>
                                { 
                                    currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                        ?   currentStoreState[serviceKey].connectionInfo.receivedData["messegnes"]
                                        :   "No Connection!"
                                }
                            </TableCell>

                        </TableRow> 
                        <TableRow>
                            <TableCell>
                                Server Name
                            </TableCell>
                            <TableCell>
                            </TableCell> 
                            <TableCell>
                                {                                        
                                    currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                        ?   currentStoreState[serviceKey].connectionInfo.receivedData["serverLocation"]
                                        :   generalTexts.mixedTexts["noData"]
                                }
                            </TableCell>
                            <TableCell>
                                Port Nr
                            </TableCell>
                            <TableCell>
                                {                                        
                                    currentStoreState[serviceKey]["connected"] === true && currentStoreState[serviceKey].connectionInfo["dataReceived"] === true
                                        ?   currentStoreState[serviceKey].connectionInfo.receivedData["port"]
                                        :   generalTexts.mixedTexts["noData"]
                                }   
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            } */}
        </>    
    );
}
export default PhidgetsInfoContainer;