import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const PostWritePage = (props) => {
    const [title,setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [writeloading, setWriteloading] = useState(false);
    const [error, setError] = useState(false);
    const [writeerror, setWriteerror] = useState(false);
    const [categories,setCategories] = useState([]);
    const [selCat,setSelCat] = useState('일반');
    const se2 = useRef();
    const navigate = useNavigate();


    const onClickBt = (e)=>{
        setWriteloading(true);
        se2.current.contentWindow.postMessage({message:"HELLO"},"*");
        
    }
    const onChangeTF = (e)=>{
        setTitle(e.target.value);
    }
    useEffect(()=>{
        async function getAllCategories(){
            try{
                const URL = "/category"
                const data = await axios.get(URL);
                if(data.status !== 200){
                    setWriteerror(true);
                    return;
                }
                setCategories(data.data.data);
                setLoading(false);
            }catch(err){
                setWriteerror(true);
            }
        }
        getAllCategories();
    },[]);


    useEffect(()=>{
        async function see(e){
            if(e.data.sHTML){
                try{
                    const URL = "/post";
                    const result = await axios.post(URL,{
                        title:title,
                        content:e.data.sHTML,
                        category:selCat
                    },{
                        headers:{
                            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWU3MjkzZjdkMTU2NTE5MzU1MTQ5ZCIsImVtYWlsIjoiRkZGRkYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg0MDg3MTc3LCJleHAiOjE2ODQyNTk5Nzd9.Nw2P0UGF0DOQNYCHitxrvG9DtC7Q2zRFnl00_7XmKE0",
                            "Content-Type":"application/json"
                        }
                    })
                    setWriteloading(false);
                    navigate('/post/'+result.data.data.createdID);
                }catch(err){
                    setError(true);
                }
            }
        }
        window.addEventListener("message",see)

        return ()=>{
            window.removeEventListener('message',see);
        }
    },[title,selCat])

    if(error){
        return(
            <Typography>error occured.</Typography>
        )
    }
    if(loading){
            return (<Typography>loading ....</Typography>)
    }

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel>
                    게시판
                </InputLabel>

                <Select value={selCat} label="게시판" onChange={(e)=>{setSelCat(e.target.value)}}>
                    
                    {categories.length > 0 && categories.map(category=>(
                        <MenuItem key={category.title} value={category.title}>{category.title}</MenuItem>
                    ))}
                </Select>
                <Divider sx={{margin:"5px"}}/>
                <TextField onChange={onChangeTF} label="제목" placeholder='제목을 입력하세요.' fullWidth/>
            </FormControl>
            <Box sx={{position:'relative'}}>
                <iframe title="smarteditor2" src={`${process.env.PUBLIC_URL}/smarteditor2/dist/SmartEditor2.html`} 
                style={{border:'0',width:"100%",height:'700px',overflow:'hidden'}} ref={se2}/>
            </Box>
            <Button onClick={onClickBt}>POST</Button>
            {writeloading && !writeerror && <Typography> 전송 중 ...</Typography>}
            {writeerror && <Typography> 전송 실패함</Typography>}
        </Box>
    )

    
};

export default PostWritePage;