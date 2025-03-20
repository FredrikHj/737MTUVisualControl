/* ================================================== TabsView1 ==================================================
Import  modules */

import React, { useState, useEffect } from'react';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

// Tabs
    import TabContext from '@mui/lab/TabContext';
    import TabList from '@mui/lab/TabList';
    import TabPanel from '@mui/lab/TabPanel';

import { Box, Divider } from '@mui/material';
import MTUServerConInfo from"../../SubContents/MTUServer/MTUServerConInfo";
import PhidgetsConInfo_Main from"../../SubContents/Phidgets/PhidgetsConInfo_MainComponent";

import {componentRerenderStorageChanges$} from"../../../_data/RerenderComponentOnStorageChanges";

import MTUServerConStatus from"../../SubContents/MTUServer/MTUServerConStatus";
import FsuipcServiceConnectionInfo from"../../SubContents/FSUIPC/FsuipcServiceConnection"
import { BARREL_OPTIMIZATION_PREFIX } from 'next/dist/shared/lib/constants';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
}));

var TabView1 = () =>{  
    return(
        <Box sx={{
            width: "100%",
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Box>
                <MTUServerConInfo/>   
            </Box>
            <Box sx={{
                marginTop: "50px",
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "30px", 
                    fontWeight: "bold", 
                    letterSpacing: "35px"
                }}>
                    <Box>   
                        <PhidgetsConInfo_Main/>      
                    </Box>
                    <Box sx={{
                        width: "33%",
                    }}>   
                        FSUIPC           
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default TabView1;