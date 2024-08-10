/* ================================================== Service Container ==================================================
Import  modules */
import { initializeStore } from "../store";

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import checkReduxStoreTree from "../data/CheckStoreState";
import {
    componentRerenderStorageChanges$,
    updateSpeedBrakeLeverPossValue$
} from "../data/RerenderComponentOnStorageChanges";
import {FSUIPCInstance$} from "../data/FSUIPC/FSUIPCListener";

import { Box, Button, Grid, Paper, styled, Table, TableHead, TableBody, TableContainer, Typography } from '@mui/material';
 
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {mtuValueUpdateFunction} from"../data/MtuValueUpdateInitiation";
import { Sd } from "@mui/icons-material";

var ThrottleVisual = () =>{   
    // Get updated Store state and save it 
    const [ currentStoreState, updateCurrrentStoreState ] = useState<any>(null);

    const [ trimWheelLeft, updateTrimWheelLeft ] = useState<number>(0);
    const [ speedBrakeLeverPoss, updateSpeedBrakeLeverPoss ] = useState<number>(0);
    const [ parkingBrakeLeverPoss, updateParkingBrakePoss ] = useState<number>(0);
    
    const [ th1RevPoss, updateTh1RevPoss ] = useState<number>(0);
    const [ th1LeverPoss, updateTh1LeverPoss ] = useState<number>(0);
    const [ start1LeverPoss, updateStart1LeverPoss ] = useState<number>(0);

    const [ th2LRevPoss, updateTh2RevPoss ] = useState<number>(0);
    const [ th2LeverPoss, updateTh2LeverPoss ] = useState<number>(0);
    const [ start2LeverPoss, updateStart2LeverPoss ] = useState<number>(0);
    
    const [ flapsLeverPoss, updateFlapsLeverPoss ] = useState<number>(0);
    const [ stabTrim1, updateStabTrim1 ] = useState<number>(0);
    const [ stabTrim2, updateStabTrim2 ] = useState<number>(0);


    const [ trimWheelRight, updateTrimWheelRight ] = useState<number>(0);

    useEffect(() => {
        
        componentRerenderStorageChanges$.subscribe((getNewStoreValues: any) => {
            console.log(getNewStoreValues);
            updateCurrrentStoreState(getNewStoreValues);
        });
        updateSpeedBrakeLeverPossValue$.subscribe((getUpdatedValue: number) => {
            console.log('getUpdatedValue :', getUpdatedValue);
            updateSpeedBrakeLeverPoss(getUpdatedValue);

        });
        // Update and rerender when the Storetree has new values
    }, [speedBrakeLeverPoss]);
    
    console.log('speedBrakeLeverPoss :', speedBrakeLeverPoss);
    return(  
        <>
            <Box sx={{
                
                width: "700px",
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-around", 
                alignItems: "center"
            }}>
                <Box sx={{
                    
                    width: "100px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    Trim Wheel
                    <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${trimWheelLeft}`}</Box>
                </Box>
                <Box sx={{
                    width: "100px", 
                    height: "20vh",
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    <Box>
                        Speedbrake
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${speedBrakeLeverPoss}`}</Box>

                    </Box>
                    <Box>
                        Parkingbrake
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${parkingBrakeLeverPoss}`}</Box>
                    </Box>
                </Box>
                {/* ------------------------------------------------------------------------------------------- */}
                <Box sx={{
                    width: "100px",
                    height: "30vh",
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    <Box>
                        Th1Rev
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${th1RevPoss}`}</Box>
                    </Box>
                    <Box>
                        Th1Lever
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${th1LeverPoss}`}</Box>
                    </Box>
                    <Box>
                        StartLever1
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${start1LeverPoss}`}</Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100px",
                    height: "30vh",
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    <Box>
                        Th2Rev
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${th2LRevPoss}`}</Box>
                    </Box>
                    <Box>
                        Th2Lever
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${th2LeverPoss}`}</Box>
                    </Box>
                    <Box>
                        StartLever2
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${start2LeverPoss}`}</Box>
                    </Box>
                </Box>

                <Box sx={{
                    height: "20vh",
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    <Box>
                        Flaps
                        <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${flapsLeverPoss}`}</Box>
                    </Box>
                    <Box sx={{
                        width: "180px", 
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-around", 
                        alignItems: "center"
                    }}>
                        <Box>
                            Stab Trim 1
                            <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${stabTrim1}`}</Box>
                        </Box>
                        <Box>
                            Stab Trim 2
                            <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${stabTrim2}`}</Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    
                    width: "100px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-around", 
                    alignItems: "center"
                }}>
                    Trim Wheel
                    <Box className="spdPercentage">{currentStoreState === null ? 0 : `Poss: ${trimWheelRight}`}</Box>

                </Box>
            </Box>
        </>
    );
}
export default ThrottleVisual;