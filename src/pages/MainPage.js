import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { textState } from '../atoms';

const MainPage = (props) => {

    return (
        <Box>
            <Container>
                <Grid container direction="column">
                    <Grid item>
                        <Card sx={{padding:'10px',textAlign:'center'}}>
                            <Typography variant="h3">웹 개발은 어렵습니다.</Typography>
                            <br />
                            <br />
                            <Typography>혼자서 한다면 말입니다.</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
    
    
    
};

export default MainPage;