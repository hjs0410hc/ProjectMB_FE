import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import CategorySelect from '../components/CategorySelect';
import CreateCategoryDialog from '../components/CreateCategoryDialog';

const AdminPage = (props) => {
    // 카테고리 생성 및 편집하기
    const [user] = useRecoilState(userState);
    const [categories,setCategories] = useState([]);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        async function getAllCategories(){
            try{
                const response = await axios.get(`/category`);
                setCategories(response.data.data);
            }catch(err){
                console.error(err);
            }
        }
        getAllCategories();
    },[])

    async function refetchCategories(){
        try{
            const response = await axios.get(`/category`);
            setCategories(response.data.data);
        }catch(err){
            console.error(err);
        }
    }
    if(!user || (user && !user.isAdmin)){
        return (
            <Box>
                <Typography>로그인되어 있지 않거나 관리자 계정이 아닙니다.</Typography>
            </Box>
        )
    }
    return(
        <Box>
            <CreateCategoryDialog open={open} setOpen={setOpen} refetchCategories={refetchCategories}/>
            <Typography>관리자 사이트</Typography>
            {categories && categories.map((category)=>(
                <CategorySelect key={category._id} category={category} refetchCategories={refetchCategories} />
            ))}
            <Button onClick={()=>{setOpen(true);}}>카테고리 생성</Button>
        </Box>
    )
    
    
};

export default AdminPage;