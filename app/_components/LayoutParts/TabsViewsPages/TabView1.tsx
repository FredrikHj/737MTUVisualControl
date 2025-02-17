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
import ServicePhidgetsConInfo from"../../SubContents/Phidgets/ServicePhidgetsConInfo";

import {componentRerenderStorageChanges$} from"../../../_data/RerenderComponentOnStorageChanges";

import MTUServerConStatus from"../../SubContents/MTUServer/MTUServerConStatus";
import FsuipcServiceConnectionInfo from"../../SubContents/FSUIPC/FsuipcServiceConnection"

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
        <>
            <Box sx={{
                width: "33%",
            }}>   
                <MTUServerConInfo/>               
            </Box>
            <Box sx={{
                width: "33%",
            }}>   
                <ServicePhidgetsConInfo/>               
            </Box>
            <Box sx={{
                width: "33%",
            }}>   
                FSUIPC           
            </Box>
        </>
    );
}
export default TabView1;