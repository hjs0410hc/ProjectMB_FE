import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import axios from 'axios';


const CategorySelect = (props) => {
    const {category,refetchCategories} = props;
    const [editing,setEditing] = useState(false);
    const [title,setTitle] = useState(category.title);
    const [desc,setDesc] = useState(category.description);
    const [isPrivate,setIsPrivate] = useState(category.isPrivate);

    const editModeInit =()=>{
        setEditing(true);
    }
    const updateCategory = async ()=>{
        try{
            const response = await axios.put(`/category/${category.title}`,
            {
                title:title,
                description:desc,
                isPrivate:isPrivate
            },{
                "Content-Type":"    application/json"
            })
            setEditing(false);
            refetchCategories();
        }catch(err){
            setEditing(false);
            console.error(err);
        }
    }
    const deleteCategory = async ()=>{
        try{
            const response = await axios.delete(`/category/${category.title}`)
            setEditing(false);
            refetchCategories();
        }catch(err){
            setEditing(false);
            console.error(err);
        }
    }
    const revertChanges = ()=>{
        setTitle(category.title);
        setDesc(category.description);
        setIsPrivate(category.isPrivate);
        setEditing(false);
    }
    return (
        <Accordion>
            {!editing && <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography>{category.title}</Typography>
            </AccordionSummary>}
            <AccordionDetails>
                
                {editing && <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}}
                placeholder="카테고리 이름" label="카테고리 이름"/>}<br />
                {editing ? 
                <TextField value={desc} onChange={(e)=>{setDesc(e.target.value)}}
                placeholder="카테고리 설명" label="카테고리 설명"/>
                
                : 
                <Typography>{category.description}</Typography>}
                비공개: <Checkbox disabled={!editing} checked={isPrivate} onChange={(e)=>{setIsPrivate(e.target.checked)}}/>
                {!editing && <Button onClick={()=>{setEditing(true)}}>수정</Button>}
                {editing && <Button onClick={revertChanges}>취소</Button>}
                {editing && <Button onClick={updateCategory}>확인</Button>}
                {editing && <Button onClick={deleteCategory}>삭제</Button>}
                
            </AccordionDetails>
        </Accordion>
    )
    
    
};

export default CategorySelect;