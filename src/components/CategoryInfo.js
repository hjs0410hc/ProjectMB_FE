import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const CategoryInfo = (props) => {
    const {catdata}=props;
    
    return (
        <Box>
            <Grid container direction="column" spacing="5">
                <Grid item>
                    <Typography variant="h3" >{catdata.title} 카테고리</Typography> 
                </Grid>
                <Grid item>
                    {catdata.description}
                </Grid>
            </Grid>
        </Box>
    )
    
    
};

export default CategoryInfo;