import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const LoadingIndicator = (props: any) =>{
    const { keyStr, spinnerType, boxStyling, textStyling, itemStyling, text} = props;

    return(
        <>
            {spinnerType === "lds-ring" &&
                <Box key={ keyStr }>
                    {text}
                     <div className={spinnerType} style={boxStyling}><div></div><div></div><div></div><div></div></div>
                </Box>
            }{
                spinnerType === "lds-spinner" &&
                    <Box key={ keyStr } sx={boxStyling}>
                        <Box sx={textStyling}>{text}</Box>
                        <div className={spinnerType}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </Box>
            }{
                spinnerType === "conLoader" &&
                    <Box key={ keyStr } sx={boxStyling}>
                        {text} <Box sx={itemStyling}><LinearProgress /></Box>
                    </Box>
            }    
        </>
    );
}

export default LoadingIndicator;

    /* Loading indicator are comming from --> https://loading.io/css/
        {[
            ((spinnerType === "lds-ring") &&
                <Box key={ keyStr }>
                    {text}
                     <div className={spinnerType} style={boxStyling}><div></div><div></div><div></div><div></div></div>
                </Box>
            ),
            ((spinnerType === "lds-spinner") &&
                <Box key={ keyStr } sx={boxStyling}>
                    <Box sx={textStyling}>{text}</Box>
                    <div className={spinnerType}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </Box>
            ),
            ((spinnerType === "conLoader") &&
                <Box key={ keyStr } sx={boxStyling}>
                    {text} <Box sx={itemStyling}><LinearProgress /></Box>
                </Box>
            ),
        ]}*/