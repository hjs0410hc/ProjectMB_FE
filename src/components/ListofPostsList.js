import { Box, Card, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostList from './Post-list';
import PostLarge from './Post-large';


const ListofPostLists = (props) => { // 바깥에서 Posts를 가져올 것입니까?
    const {posts,mode} = props;

    return(
        <Box sx={{marginTop:'5px', border:'1px grey solid',padding:'5px'}}>
            {mode===0 && <Grid container direction='row' sx={{textAlign:'center', padding:'5px'}}>
                <Grid item xs={1}>
                    <Typography>
                        카테고리
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography>
                        제목
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        글쓴이
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        게시날짜
                    </Typography>
                </Grid>
            </Grid>}
            <Divider />
            {posts.map(elem=>(
                <React.Fragment key={elem._id}>
                    {mode === 0 ? <PostList postdata={elem}/> : <PostLarge postdata={elem}/>}
                    <Divider />
                </React.Fragment>
            ))}
        </Box>
    )
    
};

export default ListofPostLists;