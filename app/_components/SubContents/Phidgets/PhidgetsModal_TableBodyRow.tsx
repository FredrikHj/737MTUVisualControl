/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Button } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";
import { log } from 'console';

var PhidgetsModalRow = (props: any) =>{
    var { currentRowObj } = props;
    console.log('props', props);
    
    var [isBoardConnected, updateIsBoardConnected] = useState(false);
    useEffect(() => {
        isBoardConnected === false &&
           updateIsBoardConnected(currentRowObj["isConnected"]);
    }, [isBoardConnected])
    return(
        <>
            <TableRow>
                {/* Cell 1*/} 
                <TableCell sx={{
                    borderLeft: "3px solid grey", 
                    borderTop: "1px solid grey", 
                    borderRight: "3px solid grey", 
                    borderBottom: "1px solid grey",
                    textAlign: "center",
                    fontSize: "20px"
                }}> 
                    {currentRowObj["boardName"]}
                </TableCell>
                {/* Cell 2*/} 
                <TableCell sx={{
                    border: "1px solid grey",
                    textAlign: "center", 
                    fontSize: "20px",
                    color: "white",
                    backgroundColor: 
                    /*  If isBoardConnected is active make the background in green or if not in red */
                    isBoardConnected === true ? "green" : "red",      
                }}>
                    {currentRowObj["conMess"]}    
                </TableCell>
                {/* Cell 3*/} 
                <TableCell sx={{
                    border: "1px solid grey",
                    textAlign: "center", 
                    fontSize: "20px"
            }}> 
                    {isBoardConnected === true 
                        ? currentRowObj["intoDevice"]
                        : 'N / V'
                    }     
                </TableCell>
                {/* Cell 4*/} 
                <TableCell sx={{
                    border: "1px solid grey",
                    textAlign: "center", 
                    fontSize: "20px"
               }}> 
                    {isBoardConnected === true 
                        ? currentRowObj["deviceSerialNr"]
                        : 'N / V'
                    }      
                </TableCell>
                {/* Cell 5*/} 
                <TableCell sx={{
                    border: "1px solid grey",
                    textAlign: "center", 
                    fontSize: "20px"
                }}> 
                    {isBoardConnected === true 
                        ? currentRowObj["deviceHubPort"]
                        : 'N / V'
                    }    
                </TableCell>
                {/* Cell 6*/} 
                <TableCell sx={{
                    border: "1px solid grey",
                    textAlign: "center", 
                    fontSize: "20px"
                }}> 
                    {isBoardConnected === true 
                        ? currentRowObj["deviceChannel"]
                        : 'N / V'
                    }    
                </TableCell>
            </TableRow>
        </>
    );
}

export default PhidgetsModalRow;