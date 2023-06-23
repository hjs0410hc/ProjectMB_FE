import React from 'react';
import CustomedAppBar from './CustomedAppBar';
import { Box, Divider, Typography } from '@mui/material';

const Layout = (props) => {
    const {children}=props;
    return (
        <React.Fragment>

            <CustomedAppBar />
            <Box sx={{padding:'20px'}}>

                {children}
            </Box>
            <Divider  sx={{borderBottomWidth:2}} />
            <Box sx={{textAlign:'center'}}>
                <Typography>Copyright 2023 ⓒ THXX.XYZ</Typography>
            </Box>
        </React.Fragment>
    )
    
    
};

export default Layout;