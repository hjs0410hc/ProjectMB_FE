import { Box, Button, FormControl, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = (props) => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [success,setSuccess] = useState(false);
    const onFormSubmit = async (e)=>{
        e.preventDefault(true);
        try{
            const response = await axios.post('/auth/signup',
            {
                username:username,
                email:email,
                password:password
            },{
                'Content-Type':'application/json'
            })
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
    }
    if(!success){
        return (
            <Box>
                <Typography>유저 생성</Typography>
                <form onSubmit={onFormSubmit}>
                    <FormControl>
                        <TextField type='text' placeholder='유저명' label="유저명" required value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        <TextField type='email' placeholder='이메일' label="이메일" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <TextField type='password' placeholder='비밀번호' label="비밀번호" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <Button type='submit'>OK</Button>
                    </FormControl>
                </form>
            </Box>
        )
    }
    if(success){
        return(
            <Box>
                <Typography>{username}님 환영합니다.</Typography>
                <Typography>이제 로그인 해주세요.</Typography>
                <Link href="/signin">로그인하러가기</Link>
            </Box>
        )
    }
    
    
};

export default SignUpPage;