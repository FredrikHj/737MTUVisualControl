"use client"

/* ================================================== Landing Page ==================================================
Import  modules */
//import { initializeStore } from"../_reduxStore/CommonStore";
//import { useSelector } from 'react-redux'; 
import { Box, Divider } from '@mui/material';
import React, { useState, useEffect } from'react';
import TabsChoose from"./_components/TabsChoosenPages";
import MtuViewerInitiation from"./_data/MtuViewerInitiation";
import MtuValueUpdateInitiation from"./_data/MtuValueUpdateInitiation";

import {componentRerenderStorageChanges$} from"./_data/RerenderComponentOnStorageChanges";
import AppHeader from"./_components/AppHeader";

export default function Home() {
    // Get updated Store state and save it 
        const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);

    // Services
        const [ MTUServer ] = useState<string>("MTU Server");
        const [ servicePhidgets ] = useState<string>("phidgets");
        const [ serviceFsuipc ] = useState<string>("fsuipc");

        const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
        const [ isPhidgetsServerConnected, updateIsPhidgetsServerConnected ] = useState<boolean>(false);
        const [ isFsuipcServerConnected, updateIsFsuipcServerConnected ] = useState<boolean>(false);
        const [ choosenTabNr, updateChoosenTabNr ] = useState<number>(1); 

    useEffect(() => {
      // Start client listning to MTU Server but only if the server is not connected
        isMtuServerConnected === false && MtuViewerInitiation(); 
        //isMtuServerConnected === false && isPhidgetsServerConnected === false && MtuValueUpdateInitiation();

      // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
        console.log(getNewStoreValues);
        getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        //
        if(Object.keys(getNewStoreValues).length !== 0){
            updateIsMtuServerConnected(getNewStoreValues.mtuServer["isMtuServerConnected"]);
            updateIsPhidgetsServerConnected(getNewStoreValues.servicePHIDGETS["isPhidgetsConnected"]);
            updateIsFsuipcServerConnected(getNewStoreValues.serviceFSUIPC["isFsuipcConnected"]);
            updateChoosenTabNr(getNewStoreValues.appStart["setChoosenTabNr"]);

            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
        }
    });
  }/* ,[ currentStoreState, isMtuServerConnected, isPhidgetsServerConnected, isFsuipcServerConnected]  */);

    return(
        <Box sx={{
            width: "100%",
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "center",
        }}> 
            <Box sx={{
                width: "75%",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
            }}>
                <AppHeader/>
                <TabsChoose/>
            </Box>
        </Box>
    );
}
