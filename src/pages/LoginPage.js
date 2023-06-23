import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../atoms';

const LoginPage = (props) => {
    const [id,setID] = useState(null);
    const [pw,setPW] = useState(null);
    const [err,setErr] = useState(false);
    const [loading,setLoading] = useState(false);
    const [token,setToken] = useRecoilState(tokenState);
    const navigate = useNavigate();
    const login = async (e)=>{
        e.preventDefault(true);
        try{
            setErr(false);
            setLoading(true);
            const result = await axios.post("/auth/signin",{
                "username":id,
                "password":pw
            },{
                "Content-Type":"application/json"
            });
            localStorage.setItem('nT',result.data.data.token);
            localStorage.setItem('refreshToken',result.data.data.refreshToken);
            setToken(result.data.data.token);

            setLoading(false);
            navigate(-1);
        }catch(err){
            setErr(err);
        }
    }   


    return (
        <Box>
            <form onSubmit={login}>
                <FormControl fullWidth onSubmit={login}>
                        <TextField required fullWidth label="id" placeholder="Username or email" onChange={(e)=>setID(e.target.value)}/>
                        <TextField required fullWidth label="pw" placeholder="PW" type="password" onChange={(e)=>setPW(e.target.value)}/>
                        <Button type="submit">SIGN IN</Button>
                </FormControl>
            </form>
                
                {loading && !err && <CircularProgress />}
                {err && <Typography>오류 발생. {JSON.stringify(err)}</Typography>}
                {token && <Typography>성공</Typography>}
        </Box>
    )
    
    
    
};

export default LoginPage;