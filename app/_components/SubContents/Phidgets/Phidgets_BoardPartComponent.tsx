/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../../../_reduxStore/CommonStore";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {componentRerenderStorageChanges$} from "../../../_data/RerenderComponentOnStorageChanges";
import PhidgetsModal from "../../LayoutParts/TabsViewsPages/TabsView1/PhidgetsModal_BoardPartInfoWindow";
import '../../LayoutParts/TabsViewsPages/TabsView1/CssPhidgetsModal_BoardPartInfoWindow.css'; 

import { Box, Table, TableHead, TableBody, TableContainer, TableCell, TableRow, Button } from '@mui/material';

import FSUIPCInfoContainer from "../../../_data/FSUIPC/FSUIPCInfoContainer";
import PhidgetsInfoContainer from "../../../_data/Phidgets/PhidgetsInfoContainer";
import ServerErrorRetrying from "../../../_data/ServerErrorRetrying";
import LoadingIndicator from "../../../_data/LoadingIndicator/ServerErrorRetrying";

var Phidgets_BoardPart = () =>{
    //Get store States
        var reduxStorePlaceMTUServer = "conStatusMTUServer";
        var reduxStorePlaceService = "conStatusServicePHIDGETS";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlaceService];

    console.log('currentPageData :', currentPageData);
    
    // Get updated Store state and save it  
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);
    const [ currentControllerBoardStates ] = useState<any>(currentPageData["controllerBoard"]);
    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);

    const [ phidgetsServiceLoading, updatePhidgetsServiceLoading ] = useState<boolean>(false); 
    const [ isPhidgetsStarted, updateIsPhidgetsStarted ] = useState<boolean>(false); 
    const [ isPhidgetsConnected, updateIsPhidgetsConnected ] = useState<boolean>(false);
    const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 

    const [ isPhidgetsServerError, updateIsPhidgetsServerError ] = useState<boolean>(false); 
    const [ isPhidgetsConLost, updateIsPhidgetsConLost ] = useState<boolean>(false); 
    const [ isIsPhidgetsModalOpen, updateIsPhidgetsModalOpen ] = useState<boolean>(true); 
    
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
    }, [
            currentStoreState, 
            phidgetsServiceLoading, 
            isMtuServerConnected, 
            isPhidgetsConnected, 
            isPhidgetsServerError, 
            isPhidgetsConLost,
            isIsPhidgetsModalOpen
        ]
    );
    
    console.log('currentStoreState :', currentStoreState);
    console.log('currentControllerBoardStates :', currentControllerBoardStates);
var phidgetsModal = () => {
    console.log("inne");
    
    isIsPhidgetsModalOpen === false ? updateIsPhidgetsModalOpen(true) : updateIsPhidgetsModalOpen(false);
}
    return(
        <Box sx={{
            paddingTop: "50px",
            width: "100%",
            flexDirection: "column", 
            fontWeight: "bold",
            borderRight: "3px solid grey",
            borderBottom: "3px solid grey",
            textAlign: "center",

        }}>
            <Button sx={{
                fontSize: "30px",
                letterSpacing: "20px", 
                fontWeight: "bold",
            }} onClick={phidgetsModal}>
                 Device Informations
            </Button>    
            <Box sx={{
                display: isIsPhidgetsModalOpen === true ? 'block' : 'none', /* Hidden by default */
                position: 'fixed', /* Stay in place */
                zIndexndex: 1, /* Sit on top */
                left: 0,
                top: 0,
                width: '100%', /* Full width */
                height: '100%', /* Full height */
                overflow: 'auto', /* Enable scroll if needed */
                backgroundColor:' rgba(0,0,0,0.4)', /* Black w/ opacity */
            }}>
                {isIsPhidgetsModalOpen === true &&
                     <PhidgetsModal
                        currentBoardObj={currentControllerBoardStates}
                        closeModal={phidgetsModal}
                    />}
            </Box>
        </Box>
    );
}

export default Phidgets_BoardPart;