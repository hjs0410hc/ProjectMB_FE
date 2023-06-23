import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import axios from 'axios';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

const CommentComp = (props) => {
    const {comment, postid,refetchPost} = props;
    const [user] = useRecoilState(userState);
    const [newcomm,setNewcomm] = useState('');
    const [editing, setEditing] = useState(false);
    const [writing, setWriting] = useState(false);
    const [content, setContent] = useState(comment.content)
    const [isPrivate, setIsPrivate] = useState(comment.isPrivate)
    const datestr = new Date(comment.createdAt).toISOString().substring(0,19).replace('T',' ').replace('Z','');

    const addCommentToComment = async (e)=>{
        e.preventDefault(true);
        try{
            await axios.post(`/comment`,{
                parType:1,
                parPost:postid,
                parComm:comment._id,
                content:newcomm
            });
            refetchPost();
            setWriting(false);
        }catch(err){
            console.error(err);
        }
    }
    const revertChanges = ()=>{
        setContent(comment.content);
        setIsPrivate(comment.isPrivate);
        setEditing(false);
    }
    const updateComment = async ()=>{
        if(content === ''){
            throw new Error("tried to mock");
        }
        try{
            await axios.put(`/comment/${comment._id}`,{
                content:content,
                isPrivate:isPrivate
            },{
                "Content-Type":"application/json"
            })
            refetchPost();
            setEditing(false);
        }catch(err){
            console.error(err);
        }
    }
    const deleteComment = async ()=>{
        try{
            await axios.delete(`/comment/${comment._id}`);
            refetchPost();
            setEditing(false);
        }catch(err){
            console.error(err);
        }
    }
    return(
        <Grid item container direction="column">
            <Grid item container spacing="10">
                <Grid item xs={2}>
                    <Typography>{comment.author.username}</Typography>
                </Grid>
                <Divider flexItem orientation='vertical'  />
                <Grid item xs={7}>
                    {editing ?  <TextField value={content} onChange={(e)=>{setContent(e.target.value)}} placeholder="댓글 내용을 입력" required/> :
                    <Typography>{comment.content}</Typography>}
                </Grid>
                <Grid item xs={2}>
                    {datestr}
                </Grid>
            </Grid>
            <Grid item textAlign='right'>
                {user && !writing && !comment.isDeleted && <Button onClick={()=>{setWriting(true)}}>대댓글 작성</Button>}
                {user && (user.isAdmin || comment.author._id === user._id ) && <React.Fragment>
                    {!editing && !comment.isDeleted && <Button onClick={()=>{setEditing(true)}}>수정</Button>}
                    {editing && <Button onClick={deleteComment}>삭제</Button>}
                    {editing && <Button onClick={revertChanges}>취소</Button>}
                    {editing && <Button onClick={updateComment}>완료</Button>}
                    </React.Fragment>}
            </Grid>
            {writing &&
            <Grid item>
                <form onClick={addCommentToComment}>
                    <TextField value={newcomm} onChange={(e)=>{setNewcomm(e.target.value)}} placeholder="댓글 내용을 입력" required/>
                    <Button type='submit'>OK</Button>
                </form>
            </Grid>}
            {comment.comments && comment.comments.map(comment=>(
                <Box key={comment._id} sx={{padding:'10px'}}>
                <ArrowCircleUpOutlinedIcon />
                <CommentComp  comment={comment} refetchPost={refetchPost} postid={postid}/>

                </Box>
            ))}
        </Grid>
    )
    
    
    
};

export default CommentComp;