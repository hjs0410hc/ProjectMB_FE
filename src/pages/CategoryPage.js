import { Button, Card, CircularProgress, Container, Grid, Link, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListofPostLists from '../components/ListofPostsList';
import { useLocation, useParams } from 'react-router-dom';
import CategoryInfo from '../components/CategoryInfo';
import queryString from 'query-string';
import PageHelper from '../components/PageHelper';
import { tokenState, userState } from '../atoms';
import { useRecoilState } from 'recoil';

const CategoryPage = (props) => {
    const [posts,setPosts] = useState(null);
    const [count,setCount] = useState(0);
    const [categoryData,setCategoryData] = useState(null);
    const [error,setError] = useState(false);
    const {catname} = useParams();
    const [mode,setMode] = useState(0);
    const [user,setUser] = useRecoilState(userState);
    const location = useLocation();
    const query = queryString.parse(location.search); // pagenum,limit
    const [token] = useRecoilState(tokenState);

    useEffect(()=>{
        async function getAllPosts(){
            try{
                const data = await axios.get('/post');
                if(data.status !== 200){
                    setError(true);
                    return;
                }
                setPosts(data.data.data);
                setCount(data.data.count);
            }catch(err){
                setError(true);
            }
        }
        async function getCatPosts(){
            try{
                const data = await axios.get(`/category/${catname}${location.search}`)
                if(data.status !== 200){
                    setError(true);
                    return;
                }
                setCategoryData(data.data.data.category);
                setCount(data.data.data.count);
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
    },[catname,location.search])

    return(
        <Container>
            {categoryData ? <CategoryInfo catdata={categoryData}/> : <Typography variant="h3">전체 글 보기</Typography>}
            {!posts && !error && <CircularProgress />}
            {error && 
            <Card>
                <Typography>오류 발생.</Typography>
            </Card>}
            
            <Button onClick={()=>{setMode(0)}}>ListMode</Button>
            <Button onClick={()=>{setMode(1)}}>LargeMode</Button>
            {posts && <ListofPostLists posts={posts} mode={mode}/>}
            {PageHelper(query.pagenum?query.pagenum:1,query.limit?query.limit:10,count)}
            {user && user.isAdmin && <Link href="write"><Button>글 쓰기</Button></Link>}
        </Container>
    )
};

export default CategoryPage;