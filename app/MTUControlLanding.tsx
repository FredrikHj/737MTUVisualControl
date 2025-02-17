/* ================================================== Landing Page ==================================================
Import  modules */
import { initializeStore } from"../_reduxStore/CommonStore";
import { useSelector } from 'react-redux'; 
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from'react';
import TabsChoose from"../components/TabsChoosenPages";
import MtuViewerInitiation from"../data/MtuViewerInitiation";
import MtuValueUpdateInitiation from"../data/MtuValueUpdateInitiation";
import LoadingIndicator from "../data/LoadingIndicator/LoadingIndicators";
import MTUServerConnectionInfo from"../components/MTUServerConnectionInfo";
import FsuipcServiceConnectionInfo from"../components/FsuipcServiceConnectionInfo";
import PhidgetsServiceConnectionInfo from"../components/PhidgetsServiceConnectionInfo";
import {componentRerenderStorageChanges$} from"../data/RerenderComponentOnStorageChanges";
 
const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
var MTUControlLanding = () => { 
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
        isMtuServerConnected === false && isPhidgetsServerConnected === false && MtuValueUpdateInitiation(); 
 
        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            //
            if(Object.keys(getNewStoreValues).length !== 0){
                updateIsMtuServerConnected(getNewStoreValues.conStatusMTUServer["isMtuServerConnected"]);
                updateIsPhidgetsServerConnected(getNewStoreValues.conStatusServicePHIDGETS["isPhidgetsConnected"]);
                updateIsFsuipcServerConnected(getNewStoreValues.conStatusServiceFSUIPC["isFsuipcConnected"]);
                updateChoosenTabNr(getNewStoreValues.appStart["setChoosenTabNr"]);

                getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            }
        }); 
    }, [currentStoreState, isMtuServerConnected, isPhidgetsServerConnected, isFsuipcServerConnected]);

    return(
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box>
                <MTUServerConnectionInfo
                    MTUService={MTUServer}
                />
            </Box>
            <Box sx={{
                marginTop: "30px",
                display: "flex", 
                flexDirection: "row", 
                justifyContents: "space-around",
                padding: "5px",
            }}>
                <PhidgetsServiceConnectionInfo
                    MTUService={servicePhidgets}
                />
                <FsuipcServiceConnectionInfo
                    MTUService={serviceFsuipc}
                />
            </Box>
            <Root>
                <Divider textAlign="center"></Divider>
            </Root>
            <TabsChoose/>
        </Box>
    );
}
export default MTUControlLanding;