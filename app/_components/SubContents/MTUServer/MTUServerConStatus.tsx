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

var MTUServerConStatus = () => {
    //Get store States
        var reduxStorePlace = "conStatusMTUServer";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlace];
        console.log('currentPageData :', currentPageData);
        
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ MTUService, updateMTUService] = useState<string>("")
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);   
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    const [ isPhidgetsServerConnected, updateIsPhidgetsServerConnected ] = useState<boolean>(false);   
    const [ isPhidgetsServerError, updateIsPhidgetsServerError ] = useState<boolean>(false); 

    const [ isFsuipcServerConnected, updateIsFsuipcServerConnected ] = useState<boolean>(false);   
    const [ isFsuipcServerError, updateIsFsuipcServerError ] = useState<boolean>(false); 
    
    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(Object.keys(getNewStoreValues).length !== 0);
            if(Object.keys(getNewStoreValues).length !== 0){
                updateCurrrentStoreState(getNewStoreValues[reduxStorePlace]);
                updateIsMtuServerConnected(getNewStoreValues[reduxStorePlace]["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);

                updateIsPhidgetsServerConnected(getNewStoreValues[reduxStorePlace]["isMtuServerConnected"]);
                updateIsPhidgetsServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);
                
                //updateIsFsuipcServerConnected(getNewStoreValues[reduxStorePlace]["isMtuServerConnected"]);
                //updateIsFsuipcServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);

                //getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, isMtuServerConnected, isMtuServerError ]);
    console.log('isMtuServerConnected :', isMtuServerConnected);
    return(
        <Box sx={{
            width: "320px",
            marginTop: "7px",
            display: "flex", 
            flexDirection: "row",
        }}>  
            <Box sx={{
                height: "30px",
                fontWeight: "bold",
                fontSize: "25px", 
                letterSpacing: "10px", 

            }}>{/*  */}
                {currentStoreState["headlineName"].split(' ')[1].toUpperCase()}
            </Box>
            <Box>{ " - "}</Box>

            <Box sx={{
                fontWeight: "bold",
                fontSize: "18px", 
                display: "flex",
                color: "white",
                flexDirection: "row", 
            }}>
                <Box sx={{
                    marginLeft: "10px", 
                    marginTop: "-2px",
                    borderRadius: "20px",
                    width: isMtuServerConnected === true ? "140px" : "190px",
                    height: "2.6vh",
                    color: "white",
                    backgroundColor: 
                   /*  iF mtuServern is active make the background in green or if not in red */
                        isMtuServerConnected === true ? "green" : "red",                                        
                    textAlign: "center", 
                    fontSize: "20px", 
                    letterSpacing: "2,5px",
                    paddingTop: "3px",
                }}>
                    <Box sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        {currentStoreState["mtuServerMess"]}
                        
                        {(isMtuServerConnected === false)
                            ?   <LinkOffRoundedIcon fontSize="small" color="primary"/>
                            :   <LinkRoundedIcon fontSize="small" color="white"/>
                            
                        }
                    </Box>
                </Box> 
            </Box>
            
            <Box sx={{
                marginLeft: "-320px",
                marginTop: "25px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
            }} key={currentStoreState["name"]}>
            </Box>
        </Box>
    );
}
export default MTUServerConStatus;