"use client"

/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from"./_reduxStore/CommonStore";
//import { useSelector } from 'react-redux'; 
import { Box, Divider } from '@mui/material';
import React, { useState, useEffect } from'react';
import TabsViewsHeadPage from"./_components/LayoutParts/TabsViewsHeadPage";
import MtuViewerInitiation from"./_data/InitiateConMtuBackend";
import MtuValueUpdateInitiation from"./_data/MtuValueUpdateInitiation";

import {componentRerenderStorageChanges$} from"./_data/RerenderComponentOnStorageChanges";
import AppHeader from"./_components/LayoutParts/AppHeader";
import LoadingIndicator from "./_data/LoadingIndicator/ServerErrorRetrying";
import { DevicesFold, Height } from "@mui/icons-material";

export default function Home() {
    //Get store States
        var reduxStorePlace = "conStatusMTUServer";
        var storeStates: any = initializeStore.getState();
        var currentPageData = storeStates[reduxStorePlace];

    // Get updated Store state and save it 
        const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(currentPageData);

    // Services
        const [ MTUServer ] = useState<string>("MTU Server");
        const [ MTUViewerStart, setMTUViewerStart ] = useState<boolean>(false);

        const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
        const [ isMtuServerError, updateIsMtuServerError ] = useState<boolean>(false); 
        
        const [ isFsuipcServerConnected, updateIsFsuipcServerConnected ] = useState<boolean>(false);
        const [ choosenTabNr, updateChoosenTabNr ] = useState<number>(1); 

    useEffect(() => {
      // Start client listning to MTU Server but only if the server is not connected
        if(MTUViewerStart === false){
            MtuViewerInitiation();
            setMTUViewerStart(true);
        }
        //isMtuServerConnected === false && isPhidgetsServerConnected === false && MtuValueUpdateInitiation();

      // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
        console.log(getNewStoreValues);
        getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        //
        if(Object.keys(getNewStoreValues).length !== 0){
            updateIsMtuServerConnected(getNewStoreValues.conStatusMTUServer["isMtuServerConnected"]);
            updateIsMtuServerError(getNewStoreValues[reduxStorePlace]["mtuServerError"]);

            updateIsFsuipcServerConnected(getNewStoreValues.conStatusServiceFSUIPC["isFsuipcConnected"]);
            updateChoosenTabNr(getNewStoreValues.appStart["setChoosenTabNr"]);

            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        }
    });
  }/* ,[ currentStoreState, isMtuServerConnected, isPhidgetsServerConnected, isFsuipcServerConnected]  */);
  console.log('MTUViewerStart :', MTUViewerStart);

    return(
        <Box sx={{
            width: "100%",
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "center",
        }}> 
            <Box sx={{
                width: "80%",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
            }}>
                <AppHeader/>
                {currentPageData["isMtuServerConnected"] === true ? <TabsViewsHeadPage/> :
                    <Box sx={{marginTop: "300px",}}>
                        {isMtuServerConnected === false && isMtuServerError === true &&
                            <LoadingIndicator
                                keyStr={currentPageData["name"]}
                                spinnerType={"conLoader"}
                                boxStyling={{ 
                                    width: "500px",
                                    height: "90px",
                                    fontSize: "50px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    display: "flex", 
                                    flexDirection: "column",
                                    justifyContent: "space-between",  
                                    alignItems: "center",
                                }}
                                itemStyling={{ width: "50px" }}
                                text={currentPageData["mtuServerErrorMess"]}
                            /> 
                        }
                    </Box>
                }
            </Box>
        </Box>
    );
}
