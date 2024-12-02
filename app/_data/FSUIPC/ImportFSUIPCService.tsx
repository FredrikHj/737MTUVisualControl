/* ================================================== Import FSUIPCService ==================================================
Import  modules */
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import checkReduxStoreTree from "../CheckStoreState";
import FSUIPCInfoContainer from './FSUIPCInfoContainer';
import { loadFsuipcService } from "./";

import { log } from 'console';

const ImportFSUIPCService = ()=>{
    const storeListenerAppStart: any = checkReduxStoreTree("appStart");
    const storeListenerServiceFSUIPC: any = checkReduxStoreTree("serviceFSUIPC");

    useEffect(() => {

    },[storeListenerServiceFSUIPC]);

 
    
    return (
      <Box
        sx={{
          marginTop: "15px",
          border: "1px solid red",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50px",
          backgroundColor: "grey",
        }}
         key={ "fsuipc" }
      >
        
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <Box sx={{
              width: "300px"
            }}>
              
            </Box>




            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
             >
             <FSUIPCInfoContainer/>
            </Box>
          </Box>
        
      </Box>
    );
}
export default ImportFSUIPCService;