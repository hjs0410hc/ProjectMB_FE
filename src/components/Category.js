import { Box, Link, Typography } from '@mui/material';
import React from 'react';

const Category = (props) => {
    const {catdata}=props;
    
    return (
        <Box>
            <Link href={`/category/${catdata.title}/`}><Typography>{catdata.title}</Typography></Link>
        </Box>
    )
    
    
};

export default Category;