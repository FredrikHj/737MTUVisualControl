import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';

const LoadingIndicator = (props: any) =>{
    const { keyStr, spinnerType, extraStyling, textStyling, text} = props;

    return(
        <>
            {[
                ((spinnerType === "lds-ring") &&
                    <Box key={ keyStr }>
                        {text}
                         <div className="lds-ring" style={extraStyling}><div></div><div></div><div></div><div></div></div>
                    </Box>
                ),
                ((spinnerType === "lds-spinner") &&
                    <Box key={ keyStr } sx={extraStyling}>
                        <Box sx={textStyling}>{text}</Box>
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </Box>
                )
            ]}
        </>
    );
}

export default LoadingIndicator;