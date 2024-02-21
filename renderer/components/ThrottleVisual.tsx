/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import checkReduxStoreTree from "../data/CheckStoreState";
import {componentRerenderStorageChanges$} from "../data/RerenderComponentOnStorageChanges";
import {FSUIPCInstance$} from "../data/WebsocketInstances";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';
import { setServicesConnected } from "../redux/ThrottleReadySlicer";
 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//import InitilizedMTUFunction from "../data/Phidgets/PhidgetsControl/InitilizeMTUFunction";

//valueSpdBrakeUpdate();
var ThrottleVisual = () =>{
    const [visualStarted, updateVisualStarted] = useState<boolean>(false);

    // Get updated Store state and save it 
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);
    const [ fsuipcInstance, updateFsuipcInstance ] = useState<any>({}); 

    useEffect(() => {  
        // Update and rerender when the Storetree has new values
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            getNewStoreValues && updateCurrrentStoreState(getNewStoreValues);
            //
            console.log('visualStarted :', visualStarted);
            if(visualStarted === false && getNewStoreValues.serviceFSUIPC["connected"] === true && getNewStoreValues.servicePHIDGETS["connected"] === true){
               // initializeStore.dispatch(setServicesConnected(true));
                
                // Load if app is not started 
                    updateVisualStarted(true);
                
                // Initilazed the MTU and wait for the connection for all the included services
                    InitilizedMTUFunction();
            }
        }); 
        FSUIPCInstance$.subscribe((FSUIPCInstanceObj: object) => {
            console.log(FSUIPCInstanceObj);
            FSUIPCInstanceObj && updateFsuipcInstance(FSUIPCInstanceObj);
        }); 
    }, []);
    var runThrottleFunctions = (e: any) => {
       var targetFunctionName: any = e.target.name; 
       var targetFunctionPoss: any = e.target.value; 
       var targetFunction: string = `${targetFunctionName}_${targetFunctionPoss}`; 
       console.log('fsuipcInstance :', fsuipcInstance);

      // InitilizeThrottleController[targetFunctionName](fsuipcInstance);
    }
    console.log('currentStoreState :', currentStoreState);
    return(  
        <>
            <Box sx={{border: "1px solid red", width: "1000px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>   
                {/* Speedbrake */}                        
                <Box className="spdOuter-wrapper" id="spd">
                    Speedbrake
                    <Box className="spdPercentage">{/* {currentStoreState.Throttle737SpeedBrake["currentPoss"]} */}</Box>
                </Box>
                {/* Throttle 1 / Reverser */}
                <Box sx={{display: "flex", flexDirection: "column"}} id="thrl1/rev">
                    <Box className="thrL1Outer-wrapper">
                        Throttle 1 
                        <Box className="thrL1Percentage">{/* {currentStoreState.Throttle737TH1_Rev.th["currentPoss"]} */}</Box>
                    </Box>
                    <Box sx={{marginTop: "10px"}} className="rev1Outer-wrapper">
                        Reverser 
                        <Box className="rev1Percentage">{/* {currentStoreState.Throttle737TH1_Rev.rev["currentPoss"]} */}</Box>
                    </Box>
                </Box>

                {/* Throttle 2 / Reverser */}
                <Box sx={{width: "100px"}} id="thrL2/rev">
                    <Box className="thrL2Outer-wrapper">
                        Throttle 2 
                        <Box className="thrL2Percentage">{/* {currentStoreState.Throttle737TH2_Rev.th["currentPoss"]} */}</Box>
                    </Box>
                    <Box sx={{marginTop: "10px"}} className="rev2Outer-wrapper">
                        Reverser 
                        <Box className="rev2Percentage">{/* {currentStoreState.Throttle737TH1_Rev.rev["currentPoss"]} */}</Box>
                    </Box>
                </Box>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Flaps</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="flap1" control={<Radio />} label="1" />
                        <FormControlLabel value="flap2" control={<Radio />} label="2" />
                        <FormControlLabel value="flap5" control={<Radio />} label="5" />
                        <FormControlLabel value="flap10" control={<Radio />} label="10" />
                        <FormControlLabel value="flap15" control={<Radio />} label="15" />
                        <FormControlLabel value="flap25" control={<Radio />} label="25" />
                        <FormControlLabel value="flap30" control={<Radio />} label="30" />
                        <FormControlLabel value="flap40" control={<Radio />} label="40" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    );
}
export default ThrottleVisual;