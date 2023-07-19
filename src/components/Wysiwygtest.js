import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Wysiwygtest = (props) => {
    const [title,setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const se2 = useRef();

    const onClickBt = (e)=>{
        se2.current.contentWindow.postMessage({message:"HELLO"},"*");

    }
    const onChangeTF = (e)=>{
        setTitle(e.target.value);
    }
    useEffect(()=>{
        window.addEventListener("message",async (e)=>{
            if(e.data.sHTML){
                try{
                    const URL = "https://blog.thxx.xyz:3000/post/";
                    setLoading(true);
                    await axios.post(URL,{
                        title:title,
                        content:e.data.sHTML,
                        category:"일반"
                    },{
                        headers:{
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWU3MjkzZjdkMTU2NTE5MzU1MTQ5ZCIsImVtYWlsIjoiRkZGRkYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg0MDg3MTc3LCJleHAiOjE2ODQyNTk5Nzd9.Nw2P0UGF0DOQNYCHitxrvG9DtC7Q2zRFnl00_7XmKE0",
                            "Content-Type":"application/json"

                        }
                    })
                    setLoading(false);
                    alert("DONE");
                }catch(err){
                    setError(true);
                }
                    
                
            }
        })
    },[])

    return (
        <Box>
            <TextField onChange={onChangeTF} placeholder='제목을 입력하세요.' fullWidth/>
            <Box sx={{position:'relative'}}>
                <iframe title="smarteditor2" src={`${process.env.PUBLIC_URL}/smarteditor2/dist/SmartEditor2.html`} 
                style={{border:'0',width:"100%",height:'700px',overflow:'hidden'}} ref={se2}/>
            </Box>
            <Button onClick={onClickBt}>CLick me</Button>
        </Box>
    )

    
};

export default Wysiwygtest;