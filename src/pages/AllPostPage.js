import { Button, Card, CircularProgress, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListofPostLists from '../components/ListofPostsList';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';
import PageHelper from '../components/PageHelper';
import queryString from 'query-string';

const AllPostPage = (props) => {
    const [posts,setPosts] = useState(null);
    const [error,setError] = useState(false);
    const [user,setUser] = useRecoilState(userState);
    const [count,setCount] = useState(0);
    const [mode,setMode] = useState(0); // 0 is list, 1 is Large
    const {catname} = useParams();
    const location = useLocation();
    const query = queryString.parse(location.search);

    useEffect(()=>{
        async function getAllPosts(){
            try{
                const data = await axios.get(`/post${location.search}`);
                setPosts(data.data.data);
                setCount(data.data.count);
            }catch(err){
                setError(true);
            }
        }
        async function getCatPosts(){
            try{
                console.log(`/category/${catname}${location.search}`)
                const data = await axios.get(`/category/${catname}${location.search}`);
                if(data.status !== 200){
                    setError(true);
                    return;
                }
                setPosts(data.data.data.posts);
            }catch(err){
                setError(true);
            }
        }
        if(!catname){
            getAllPosts();
        }else{
            getCatPosts();
        }
        console.log(location.pagenum);
    },[catname,user])
    return(
        <React.Fragment>
            <Typography>
                전체 글 목록
            </Typography>
            <Button onClick={()=>{setMode(0)}}>ListMode</Button>
            <Button onClick={()=>{setMode(1)}}>LargeMode</Button>
            {!posts && !error && <CircularProgress />}
            {error && 
            <Card>
                <Typography>오류 발생.</Typography>
            </Card>}
            {posts && <ListofPostLists posts={posts} mode={mode} />}
            
            <Link href="post/write"><Button>글 쓰기</Button></Link>
            {PageHelper(query.pagenum?query.pagenum:1,query.limit?query.limit:10,count)}
        </React.Fragment>
    )
    
    
};

export default AllPostPage;