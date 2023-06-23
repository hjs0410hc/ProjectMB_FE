import { Grid } from '@mui/material';
import React from 'react';

const ProfileComponent = (props) => {
    const {user} = props;
    return(
        <Grid container direction="column">
                <Grid item>
                    이름: {user.username}
                </Grid>
                <Grid item>
                    이메일: {user.email}
                </Grid>
                <Grid item>
                    isAdmin?: {user.isAdmin?"true":"false"}
                </Grid>
                <Grid item>
                    userid: {user._id}
                </Grid>
                <Grid item>
                    createdAt: {user.createdAt}
                </Grid>
        </Grid>
    )
    
    
    
};

export default ProfileComponent;