import { Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';


const DrawerofCategories = (props) => {
    const {anchor,open,setOpen} = props;
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [user] = useRecoilState(userState);
    useEffect(()=>{
        async function getAllCategories(){
            const data = await axios.get('/category');
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

    const handleClose = ()=>{
        setOpen(false);
    }
    return(
        <Drawer
      anchor={anchor}
      open={open}
      onClose={handleClose}
    >
        <Container>

        <Typography>카테고리 목록</Typography>
        <List>
            {categories&&categories.map(category=>(

            <ListItem key={category.title}>
            <ListItemButton href={`/category/${category.title}/`}>
                <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
                <ListItemText>
                    {category.title}
                </ListItemText>
            </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Container>
    </Drawer>
    )
    
    
    
};

export default DrawerofCategories;