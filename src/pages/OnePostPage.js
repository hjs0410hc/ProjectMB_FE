import { Box, Button, Card, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OnePostComponent from '../components/OnePostComponent';
import { useNavigate,useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import DeletePostDialog from '../components/DeletePostDialog';
import queryString from 'query-string';
import CommentComp from '../components/CommentComp';


const OnePostPage = (props) => {
    const [post,setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [user] = useRecoilState(userState);
    const [open,setOpen]=useState(false);
    const {postid} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = queryString.parse(location.search);

    useEffect(()=>{
        async function getOnePost(){
            try{
                const URL = `/post/${postid}`;
                const data = await axios.get(URL);
                setPost(prev=>data.data.data);
                setLoading(loading=>false);
            }catch(err){
                console.error(err)
                setError(true);
            }
        }
        getOnePost();
    },[postid])
    async function refetchPost(){
        try{
            const URL = `/post/${postid}`;
            const data = await axios.get(URL);
            setPost(prev=>data.data.data);
        }catch(err){
            console.error(err)
            setError(true);
        }
    }

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
    

    const APIURL = "http://localhost:3000"

    const addCommentToPost = async (e)=>{
        e.preventDefault(true);
        try{
            await axios.post(`/comment`,{
                parType:0,
                parPost:postid,
                content:comment
            });
            refetchPost();
            setComment('');
        }catch(err){
            console.error(err);
        }
    }
    return(
        <Container>
            <DeletePostDialog open={open} setOpen={setOpen} postid={postid}/>
            <OnePostComponent postdata={post} />
            <Box>
                {post.files.length>0 && <Card sx={{marginTop:'10px',marginBottom:'10px',padding:'10px'}}>
                    첨부파일 목록
                    { post.files.map((file,index)=>{
                        return <Typography key={file.filename}><a href={`${APIURL}/files/${file.filename}`} target="_blank" rel="noreferrer">{index+1}: {file.filename}</a></Typography>
                    })}
                </Card>}
                <Grid container>
                    <Grid item xs={6}>

                    <Button onClick={()=>{navigate(query.path?query.path:-1)}}>돌아가기</Button>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:'right'}}>
                    { (user && user._id === post.author._id) && <React.Fragment>
                    
                    <Button href={`/post/${postid}/edit`}>수정</Button>
                        <Button onClick={()=>{setOpen(true)}}>삭제</Button>
                    </React.Fragment>
                    }
                    </Grid>
                </Grid>
                {user && <form onSubmit={addCommentToPost}>
                <TextField type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder='댓글 입력' fullWidth required/>
                <Button type='submit'>댓글 추가</Button></form>}
                <Grid container direction="column">
                    {post.comments && post.comments.map(comment=>(
                        <CommentComp key={comment._id} comment={comment} refetchPost={refetchPost} postid={postid} />
                    ))}
                </Grid>
            </Box>
                
        </Container>
    )
    
    
};

export default OnePostPage;