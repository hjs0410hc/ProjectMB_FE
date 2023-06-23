import { Box, Card, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

const URL = "/category";

const ListofCategories = (props) => {
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [user] = useRecoilState(userState);
    useEffect(()=>{
        async function getAllCategories(){
            const data = await axios.get(URL);
            if(data.status !== 200){
                setError(true);
                return;
            }
            setCategories(data.data.data);
            setLoading(false);
            
        }
        setLoading(true);
        getAllCategories();
    },[user])
    if(loading){
        return (
            <Card>
                <Typography>로딩 중...</Typography>
                <CircularProgress />
            </Card>
        )
    }
    if(error){
        return(
            <Card>
                <Typography>오류 발생.</Typography>
            </Card>
        )
    }

    return(
        <Card sx={{margin:'5px'}}>
            {categories.map(elem=>(
                <Category key={elem._id} catdata={elem} />
            ))}
        </Card>
    )
    
};

export default ListofCategories;