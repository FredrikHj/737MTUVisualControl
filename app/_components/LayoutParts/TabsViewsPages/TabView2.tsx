/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";
import PhidgetsModalRow from './TabsView1/PhidgetsModal_TableBodyRow';
import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Button } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";
import { log } from 'console';
import { styled } from '@mui/material/styles';

var TabView2 = () =>{
        //Get store States
        var reduxStorePlaceMTUServer = "conStatusMTUServer";
        var reduxStorePlaceService = "conStatusServicePHIDGETS";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlaceService];

        // Get updated Store state and save it  
            const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
            const [ currentControllerBoardStates ] = useState<any>(currentPageData["controllerBoard"]);

    useEffect(() => {

    }, [currentStoreState])

    return(
        <Box sx={{
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor:' #fefefe',
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center", 
            }}>
                <Box sx={{
                    fontSize: "50px",
                    marginBottom: "20px",
                }}>
                    Functions / Values Information
                </Box>
            </Box>
            <Box sx={{
                height: "65vh",
                overflowY: "scroll"
            }}>
                <TableContainer>
                    {Object.keys(currentControllerBoardStates).length !== 0 &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{
                                        border: "3px solid grey",
                                        textAlign:"center", 
                                        fontSize: "30px", 
                                        fontWeight: "bold", 
                                        letterSpacing: "10px"
                                    }} colSpan={3}>
                                        {currentControllerBoardStates.rowHeadLines.boardsValues[0]} 
                                    </TableCell>
                                    <TableCell sx={{
                                        border: "3px solid grey",
                                        textAlign:"center", 
                                        fontSize: "30px", 
                                        fontWeight: "bold", 
                                        letterSpacing: "5px"
                                    }} colSpan={2}>
                                        {currentControllerBoardStates.rowHeadLines.boardsValues[1]}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: "3px solid grey",
                                        textAlign:"center", 
                                        fontSize: "30px", 
                                        fontWeight: "bold", 
                                        letterSpacing: "5px"
                                    }} colSpan={3}>
                                        {currentControllerBoardStates.rowHeadLines.boardsValues[2]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {[
                                        currentControllerBoardStates.rowHeadLines.boardsValues[3]["boardInfo"].map((item: any, index: any) => {
                                        console.log('item :', item);
                                            return(
                                                <TableCell sx={{
                                                    borderLeft: "3px solid grey", 
                                                    borderRight: "3px solid grey", 
                                                    borderBottom: "2px solid grey", 
                                                    textAlign: "center", 
                                                    fontSize: "20px"
                                                }} key={item}>
                                                    {item}
                                                </TableCell>
                                            )
                                        }),    
                                        currentControllerBoardStates.rowHeadLines.boardsValues[3]["channelState"].map((item: any, index: any) => {
                                        console.log('item :', item);
                                            return(
                                                <TableCell sx={{
                                                    borderRight: "3px solid grey", 
                                                    borderBottom: "2px solid grey",
                                                    textAlign: "center", 
                                                    fontSize: "20px"
                                                }} key={item}>
                                                    {item}
                                                </TableCell>
                                            )
                                        }),
                                        currentControllerBoardStates.rowHeadLines.boardsValues[3]["flightSimulatorValues"].map((item: any, index: any) => {
                                            console.log('item :', item);
                                            return(
                                                <TableCell sx={{
                                                    borderLeft: "3px solid grey", 
                                                    borderRight: "3px solid grey", 
                                                    borderBottom: "2px solid grey",
                                                    textAlign: "center", 
                                                    fontSize: "20px"
                                                }} key={item}>
                                                    {item}
                                                </TableCell>
                                            )
                                        })
                                    ]}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                               {/*  <TableRow>
                                    {currentControllerBoardStates.boardsValues[3]["flightSimulatorValues"].map((item: any, index: any) => {
                                        console.log('item :', item);
                                        return(
                                            <TableCell sx={{
                                                borderLeft: "3px solid grey", 
                                                borderRight: "3px solid grey", 
                                                borderBottom: "2px solid grey",
                                                textAlign: "center", 
                                                fontSize: "20px"
                                            }} key={item}>
                                                {item}
                                            </TableCell>
                                        )
                                    })}
                                <TableRow> */}
                            </TableBody>
                        </Table>
                    }
                </TableContainer>
            </Box>
        </Box>
    );
}

export default TabView2;