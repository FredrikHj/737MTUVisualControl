/* ================================================== Landing Page ==================================================
Import  modules */
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from'react';
import TabsChoose from"./_components/LayoutParts/TabsViewsHeadPage";
import InitilazingBackendCon from"./_data/HandleConCom/InitilazingBackendCon";
import MtuValueUpdateInitiation from"./_data/MtuValueUpdateInitiation";
import MTUServerConnectionInfo from"./_components/SubContents/MTUServer/MTUServerConInfo";
import FsuipcServiceConnectionInfo from"./_components/SubContents/FSUIPC/FsuipcServiceConnection";
import PhidgetsServiceConnectionInfo from"./_components/SubContents/Phidgets/Phidgets_ServicePartComponent";
import {componentRerenderStorageChanges$} from"./_data/RerenderComponentOnStorageChanges";
 
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
        isMtuServerConnected === false && InitilazingBackendCon(); 
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
                <MTUServerConnectionInfo/>
            </Box>
            <Box sx={{
                marginTop: "30px",
                display: "flex", 
                flexDirection: "row", 
                justifyContents: "space-around",
                padding: "5px",
            }}>
                <PhidgetsServiceConnectionInfo/>
                <FsuipcServiceConnectionInfo/>
            </Box>
            <Root>
                <Divider textAlign="center"></Divider>
            </Root>
            <TabsChoose/>
        </Box>
    );
}
export default MTUControlLanding;