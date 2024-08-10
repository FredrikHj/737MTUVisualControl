/* ================================================== TabsChoose Coomponents ==================================================
Import  modules */

import React, { useState, useEffect } from'react';
import Tab from '@mui/material/Tab';

// Tabs
    import TabContext from '@mui/lab/TabContext';
    import TabList from '@mui/lab/TabList';
    import TabPanel from '@mui/lab/TabPanel';

import { Box, Divider } from '@mui/material';

import {componentRerenderStorageChanges$} from"../data/RerenderComponentOnStorageChanges";
import ThrottleVisual from"../components/ThrottleValuesVisual";

var TabsChoosenPages = () => { 
    // Get updated Store state and save it 
        const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);

    const [tabNr, setTabNBr] = React.useState('1');

    // Services
        const [ MTUServer ] = useState<string>("MTU Server");
        const [ servicePhidgets ] = useState<string>("phidgets");
        const [ serviceFsuipc ] = useState<string>("fsuipc");

    const [ isMtuServerConnected, updateIsMtuServerConnected ] = useState<boolean>(false);
    const [ isPhidgetsServerConnected, updateIsPhidgetsServerConnected ] = useState<boolean>(false);
    const [ isFsuipcServerConnected, updateIsFsuipcServerConnected ] = useState<boolean>(false);
 
    useEffect(() => {

        // Update and rerender when the Store tree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {

        }); 
    }, []);
    const tabChanges = (event: React.SyntheticEvent, newValue: string) => {
        setTabNBr(newValue);
      };
    
    return(
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabNr}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'  }}>
            <TabList
                onChange={tabChanges} 
                aria-label="lab API tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                centered
                
            >

                    <Tab label="Controller Units" value="1" />
                    <Tab label="FlightSimulator <---> Phidgets" value="2" />
                    <Tab label="Values Possitions" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1">
                Item One
            </TabPanel>
            <TabPanel value="2">
                Item Two
            </TabPanel>
            <TabPanel value="3">
            <Box sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {
                        <Box sx={{marginTop: "50px"}}>
                            <ThrottleVisual/>
                        </Box>
                    }         
                </Box>
            </TabPanel>
        </TabContext>
      </Box>
    );
}
export default TabsChoosenPages;