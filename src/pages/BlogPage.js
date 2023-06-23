import { Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import ListofCategories from '../components/ListofCategories';
import Pages from './pages';
import AllPostPage from './AllPostPage';

const BlogPage = (props) => {
    return (
        <Grid container spacing='10px' sx={{padding:'10px',minHeight:'80vh'}} direction='row' >
        <Grid item md={2} width='300px' sx={{display:{xs:'none', sm:'none',md:'block'}}} >
          <Card sx={{backgroundColor:'primary.main'}} >
            <Typography>게시판 목록</Typography>
            <ListofCategories />
          </Card>
        </Grid>
        <Grid item sx={{display:{xs:'none', sm:'none',md:'block'}}} md={1} >
          <Divider orientation='vertical' variant='middle' /> 
        </Grid>
        <Grid item xs={12} md={9}>
          <AllPostPage />
        </Grid>
      </Grid>
    )
    
    
    
};

export default BlogPage;