import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PostList = (props) => {
    const {postdata}=props;
    const tempdate = new Date(postdata.createdAt);
    const datestr = tempdate.toISOString().substring(0,19).replace('T',' ').replace('Z','');
    const location = useLocation();
    //const datestr = ""+ tempdate.getFullYear() +"-"+ (tempdate.getMonth()+1) + "-" + tempdate.getDate() + " " + tempdate.getHours() + ":" + tempdate.getMinutes()+":"+tempdate.getSeconds();
    
    return (
        <Link to={`/post/${postdata._id}?prev=${location.pathname}`}>
        <Button fullWidth>
            <Grid container direction='row'>
                <Grid item xs={1}>
                    <Typography>
                        {postdata.category.title}
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{textAlign:'left'}}>
                        {postdata.title}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        {postdata.author.username}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        {datestr}
                    </Typography>
                </Grid>
            </Grid>
        </Button>
        </Link>
    )
    
    
};

export default PostList;