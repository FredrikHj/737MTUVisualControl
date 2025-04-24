/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";
import PhidgetsModalRow from './PhidgetsModal_TableBodyRow';
import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Button } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";
import { log } from 'console';
import { styled } from '@mui/material/styles';

var PhidgetsModal = (props: any) =>{
    var { currentBoardObj, closeModal } = props;
    console.log('props', props);
    console.log('currentBoardObj :', currentBoardObj);
    
    return(
        <Box sx={{
            width: "80%",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor:' #fefefe',
            marginLeft: '9%', /* 15% from the top and centered */
            marginTop: '5%', /* 15% from the top and centered */
            padding: '20px',
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center", 
            }}>
                <Box sx={{
                    fontSize: "50px",
                    marginBottom: "20px",
                    marginLeft: "330px",
                }}>
                    Board Information
                </Box>
                <button style={{
                    border: "none",
                    backgroundColor: 'white',
                    marginTop: "15px",
                    marginLeft: "250px",
                    height: "5vh",
                }} onClick={ closeModal }>
                    <Box sx={{
                        fontSize: "25px",
                    }}>
                        X
                    </Box>
                </button>
            </Box>
            <Box sx={{
                height: "65vh",
                overflowY: "scroll"
            }}>
                <TableContainer>
                    {Object.keys(currentBoardObj).length !== 0 &&
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
                                        {currentBoardObj.rowHeadLines[0]} 
                                    </TableCell>
                                    <TableCell sx={{
                                        border: "3px solid grey",
                                        textAlign:"center", 
                                        fontSize: "30px", 
                                        fontWeight: "bold", 
                                        letterSpacing: "5px"
                                    }} colSpan={3}>
                                        {currentBoardObj.rowHeadLines[1]}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: "3px solid grey",
                                        textAlign:"center", 
                                        fontSize: "30px", 
                                        fontWeight: "bold", 
                                        letterSpacing: "5px"
                                    }} colSpan={6}>
                                        {currentBoardObj.rowHeadLines[2]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {[
                                        currentBoardObj.rowHeadLines[3]["boardInfo"].map((item: any, index: any) => {
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
                                        currentBoardObj.rowHeadLines[3]["genDeviceSpec"].map((item: any, index: any) => {
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
                                        currentBoardObj.rowHeadLines[3]["conDeviceSettings"].map((item: any, index: any) => {
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
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj["pBController"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj["sBController"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["tH1Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["rev1Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["eng1Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["tH2Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["rev2Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj.centerLevers["eng2Controller"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj["flapsController"]}
                                />
                                <PhidgetsModalRow
                                    currentRowObj={currentBoardObj["digitalInputController"]}
                                />

                             </TableBody>
                        </Table>
                    }
                </TableContainer>
            </Box>
        </Box>
    );
}

export default PhidgetsModal;