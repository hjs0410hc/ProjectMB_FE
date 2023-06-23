import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

const PostLarge = (props) => {
    const {postdata}=props;
    const tempdate = new Date(postdata.createdAt);
    const datestr = tempdate.toISOString().substring(0,19).replace('T',' ').replace('Z','');
    const location = useLocation();
    //const datestr = ""+ tempdate.getFullYear() +"-"+ (tempdate.getMonth()+1) + "-" + tempdate.getDate() + " " + tempdate.getHours() + ":" + tempdate.getMinutes()+":"+tempdate.getSeconds();
    
    return (
        <Link to={`/post/${postdata._id}?prev=${location.pathname}`}>
        <Button fullWidth>
            <Grid container direction="column">
                <Grid item container direction="row">
                    <Grid item xs={1}>
                        {postdata.category.title}
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>{postdata.title}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {postdata.author.username}
                    </Grid>
                </Grid>
                <Grid item sx={{maxHeight:'200px',overflow:'clip'}}>
                    {parse(postdata.content)}
                </Grid>
                <Grid item sx={{textAlign:'left'}}>
                    {datestr}
                </Grid>
            </Grid>
        </Button>
        </Link>
    )
    
    
};

export default PostLarge;