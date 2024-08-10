/* ================================================== Container for Server Error - Retrying! ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "./RerenderComponentOnStorageChanges";

import { Box, TableBody, TableContainer, TableCell, TableRow} from '@mui/material';
import LoadingIndicator from "./LoadingIndicator/LoadingIndicators";

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
                    spinnerType={"lds-spinner"}
                    extraStyling={{
                        marginLeft: "-100px",
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center",
                        alignItems: "center",
                        width: "480px",
                    }}
                    textStyling={{
                        width: "60%",
                    }}
                    text={textMess}
                />
             }
        </Box>
    );
}

export default ServerErrorRetrying;