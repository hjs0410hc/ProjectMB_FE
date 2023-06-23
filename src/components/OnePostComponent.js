import { Avatar, Box, Button, Chip, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import parse from 'html-react-parser';

const OnePostComponent = (props) => {
    const {postdata} = props;
    const datestr = new Date(postdata.createdAt).toISOString().substring(0,19).replace('T',' ').replace('Z','');
    // postdata.title
    // postdata.author.username
    // datestr
    // postdata.category.title
    /* <div className="ql-present ql-container ql-snow ql-editor">
                        {parse(postdata.content)}
                    </div> */
    


    return (
        <Box>
            <Grid container direction="column" spacing="10">
                <Grid item container spacing="10">
                    <Grid item>
                        <Chip label={postdata.category.title} variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{padding:'3px'}}>{postdata.title}</Typography>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={6}>
                        <Avatar />{postdata.author.username}
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:'right'}}>
                        작성 시간 : {datestr}
                    </Grid>
                </Grid>
                <Grid item>
                    <div className="ql-present ql-container ql-snow ql-editor">
                        {parse(postdata.content)}
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
    
    
    
};

export default OnePostComponent;