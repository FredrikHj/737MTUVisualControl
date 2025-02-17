/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";

import LinkOffRoundedIcon from '@mui/icons-material/LinkOffRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";

var ServicePhidgetsConStatus = () =>{
    //Get store States
        var reduxStorePlaceMTUServer = "conStatusMTUServer";
        var reduxStorePlaceService = "conStatusServicePHIDGETS";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlaceService];

    console.log('currentPageData :', currentPageData);
    
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);

    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    const [ isPhidgetsServerError, updateIsPhidgetsServerError ] = useState<boolean>(false); 
    const [ isPhidgetsConLost, updateIsPhidgetsConLost ] = useState<boolean>(false); 

    useEffect(() => {
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            if(Object.keys(getNewStoreValues).length !== 0){
                updateCurrrentStoreState(getNewStoreValues[reduxStorePlaceService]);
                    
                console.log(Object.keys(getNewStoreValues).length !== 0);
                updateIsMtuServerConnected(getNewStoreValues[reduxStorePlaceMTUServer]["isMtuServerConnected"]);
                updateIsMtuServerError(getNewStoreValues[reduxStorePlaceMTUServer]["mtuServerError"]);

                updateIsPhidgetsConnected(getNewStoreValues[reduxStorePlaceService]["isPhidgetsConnected"]);
                updateIsPhidgetsServerError(getNewStoreValues[reduxStorePlaceService]["phidgetsServerError"]);
                updateIsPhidgetsConLost(getNewStoreValues[reduxStorePlaceService]["phidgetsConLost"]);
                //getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        });
    }, [currentStoreState, phidgetsServiceLoading, isMtuServerConnected, isPhidgetsConnected, isPhidgetsServerError, isPhidgetsConLost ]);
    
    console.log('currentStoreState :', currentStoreState);

    return(
        <Box sx={{
            marginLeft: isPhidgetsConnected === true ? "-375px" : "-30px",
            display: "flex", 
            flexDirection: "row",
            justifyContent: "space-around", 
            }}>
                <Box sx={{           
                    height: "30px",
                    fontWeight: "bold",
                    fontSize: "25px", 
                    letterSpacing: "10px", 
                }}>
                    {currentStoreState["headlineName"].toUpperCase()}
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
                    width: isPhidgetsConnected === true ? "140px" : "190px",
                    height: "2.6vh",
                    color: "white",
                    backgroundColor: 
                    /*  iF mtuServern is active make the background in green or if not in red */
                        isPhidgetsConnected === true ? "green" : "red",                                        
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
                        {currentStoreState["phidgetsServerMess"]}
                        
                        {(isPhidgetsConnected === false)
                            ?   <LinkOffRoundedIcon fontSize="small" color="primary"/>
                            :   <LinkRoundedIcon fontSize="small" color="white"/>
                            
                        }
                    </Box>
                </Box> 
            </Box>
            <Box sx={{
                marginLeft: "-400px",
                marginTop: "25px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
            }} key={currentStoreState["name"]}>
                 {isPhidgetsConnected === false && isPhidgetsServerError === true &&
                        <LoadingIndicator
                            keyStr={currentPageData["name"]}
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
                            text={currentPageData["phidgetsServerErrorMess"]}
                        /> 
                    }            
            </Box>
        </Box>
    );
}

export default ServicePhidgetsConStatus;

/*
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
                        color: "black",
                        backgroundColor: [
                            ( Both MTU server and Phidgets are Connected
                            isMtuServerConnected === true && isPhidgetsConnected === true
                            ? "green" : ""
                    ),(  None of MTU server or Phidgets are Connected
                        isMtuServerConnected === false && isPhidgetsConnected === false
                            ? "red" : ""
                    ),( MTU server is connected but Phidgets is not 
                        isMtuServerConnected === true && isPhidgetsConnected === false
                            ? "red" : ""
                    )
                ],
                textAlign: "center", 
                fontSize: "20px", 
                letterSpacing: "2,5px",
                paddingTop: "3px",
            }}>
                {[
                    ( Both MTU server and Phidgets are Connected
                        isMtuServerConnected === true && isPhidgetsConnected === true &&
                            currentStoreState["phidgetsConnectionMess"]
                        
                    ),(  None of MTU server or Phidgets are Connected
                        isMtuServerConnected === false && isPhidgetsConnected === false &&
                            currentStoreState["phidgetsConnectionMess"]

                    ), ( MTU server is connected but Phidgets is not 
                        isMtuServerConnected === true && isPhidgetsConnected === false &&
                            currentStoreState["phidgetsConnectionMess"]
                    )
                ]} 
            </Box>

        </Box>
        <Box>
      
    </Box>
*/