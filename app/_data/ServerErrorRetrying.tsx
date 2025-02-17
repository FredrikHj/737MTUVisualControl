/* ================================================== Container for Server Error - Retrying! ==================================================
Import  modules */
import { initializeStore } from "../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "./RerenderComponentOnStorageChanges";

import { Box, TableBody, TableContainer, TableCell, TableRow} from '@mui/material';
import LoadingIndicator from "./LoadingIndicator/ServerErrorRetrying";

import serverConfig from "./ServerConfig";

var ServerErrorRetrying = (props: any) => {
    const { showingConditions, serviceName, textMess } = props;
  
    // Get updated Store state and save it  
    useEffect(() => {
        // Update and rerender when the Store tree has new values
    }, []);
     
    return(
        <Box>
            {showingConditions &&
                <LoadingIndicator
                    keyStr={serviceName}
                    spinnerType={"conLoader"}
                    boxStyling={{ 
                        width: "275px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-between",  
                        alignItems: "center",
                    }}
                    itemStyling={{ width: "50px" }}
                    text={textMess}
                />
             }
        </Box>
    );
}

export default ServerErrorRetrying;