/* ================================================== TabsChoose Coomponents ==================================================
Import  modules */

import React, { useState, useEffect } from'react';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

// Tabs
    import TabContext from '@mui/lab/TabContext';
    import TabList from '@mui/lab/TabList';
    import TabPanel from '@mui/lab/TabPanel';

import { Box, Divider } from '@mui/material';

import {componentRerenderStorageChanges$} from"../_data/RerenderComponentOnStorageChanges";
import ThrottleVisual from"../_components/ThrottleValuesVisual";

import {MTUServerConnectionInfo} from"./MTUServerConnection";
import FsuipcServiceConnectionInfo from"./FsuipcServiceConnection"
import PhidgetsServiceConnectionInfo from"./ServicePhidgetsConStatus";

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
}));

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
        <Box sx={{
            marginTop: "25px",
            width: '100%',
        }}>
            <TabContext value={tabNr}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'  }}>
                <TabList
                    onChange={tabChanges} 
                    aria-label="lab API tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                    
                >
                    <Tab label="Connection Information" value="1" />
                    <Tab label="FlightSimulator <---> Phidgets" value="2" />
                    <Tab label="Values Possitions" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Box sx={{
                    border: "1px solid red",
                    width: "100%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    padding: "5px",
                }}>
                    <Box>
                        <MTUServerConnectionInfo/>
                    </Box>
                        <hr/>
                    <Box sx={{
                        marginTop: "50px",
                        width: "100%",
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between",
                    }}>
               {/*          <Box>
                            <PhidgetsServiceConnectionInfo
                                MTUService={servicePhidgets}
                            />
                        </Box>
                        <Box>
                            <FsuipcServiceConnectionInfo
                                MTUService={serviceFsuipc}
                            />
                        </Box>   */} 
                    </Box>
                        
                    <Box sx={{
                        width: "46%",
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContents: "center",
                        alignItems: "center",
                        padding: "5px",
                    }}>
                    <Box>
                        Services
                    </Box>
                    <Box sx={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContents: "center",
                        alignItems: "center",
                        padding: "5px",
                    }}>
                       
                    </Box>
                </Box>
                    <Box>
                    </Box>
                </Box>

            
                <Root>
                    <Divider textAlign="center"></Divider>
                </Root>
            
 
                
                
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