import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileComponent from '../components/ProfileComponent';

const ProfilePage = (props) => {
    const [user,setUser] = useRecoilState(userState);
    const {useremail}=useParams();
    const [targetUser,setTargetUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        async function getUserInfo(){
            try{
                const response = await axios.get(`/user/${useremail}`);
                setTargetUser(response.data.data);
                setLoading(false);
            }catch(err){
                console.error(err);
            }
        }
        if(useremail){
            getUserInfo();
        }else{
            setLoading(false);
        }
    },[useremail]);
    if(loading){
        return(
            <Box>
                <CircularProgress />
            </Box>
        )
    }
    return(
        <Box>
            {targetUser ? <ProfileComponent user={targetUser}/> :  
                (user ? <ProfileComponent user={user} />:
                <Typography>로그인 정보 없음!</Typography>)}
        </Box>
    )
    
    
    
};

export default ProfilePage;