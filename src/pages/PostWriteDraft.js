import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {Quill} from 'react-quill';
import { useNavigate } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import "highlight.js/styles/atom-one-dark.css";
import katex from 'katex';
import "katex/dist/katex.min.css";
import ImageDialog from '../components/ImageDialog';
import {ImageActions} from '@xeger/quill-image-actions';
import {ImageFormats} from '@xeger/quill-image-formats';

window.katex= katex;
Quill.register('modules/imageActions',ImageActions);
Quill.register('modules/imageFormats',ImageFormats);

hljs.configure({
    language:['javascript','python','cpp','html']
})

const DraftPage = (props) => {
    const [title,setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [writeloading, setWriteloading] = useState(false);
    const [error, setError] = useState(false);
    const [writeerror, setWriteerror] = useState(false);
    const [categories,setCategories] = useState([]);
    const [dat,setDat] = useState('');
    const [selCat,setSelCat] = useState('일반');
    const [diagopen,setDiagopen] = useState(false);
    const [images,setImages] = useState(false);
    const [files,setFiles] = useState([]);
    const [previews,setPreviews] = useState([]);
    const quillref = useRef();
    const navigate = useNavigate();

    const imageHandler = ()=>{
        setDiagopen(true);
    }
    const formats = ['align','float'];
    const modules = useMemo(
        () => ({
            syntax:{
                highlight:text=>hljs.highlightAuto(text).value
            },
            imageActions:{},
            imageFormats:{},
          toolbar: {
            container: [
              [{ size: ["small", false, "large", "huge"] }, { color: [] }],
              ["bold", "italic", "underline", "strike"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
              ],
              [{ script: "sub" }, { script: "super" }],
              ['link','blockquote','code-block','formula'],
              [{'font':['Noto Sans KR','Roboto','굴림']}],
              [{'color':[]},{'background':[]}],
              ["image", "video"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        }),
        []
      );

    const onClickBt = (e)=>{
        setWriteloading(true);
        postdata();
    }
    const onChangeTF = (e)=>{
        setTitle(e.target.value);
    }
    useEffect(()=>{
        async function getAllCategories(){
            try{
                const URL = "http://localhost:3000/category/"
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

    const postdata = async ()=>{
        try{
            const URL = "/post";
            const result = await axios.post(URL,{
                title:title,
                content:dat,
                category:selCat,
                files:[]
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setWriteloading(false);
            navigate('/post/'+result.data.data.createdID);
        }catch(err){
            setWriteerror(true);
        }
    }


    const deletefiles = (event)=>{
        setFiles(files.filter((_,i)=>{
            return (""+i)!==event.target.id;
        }))
        setPreviews(previews.filter((_,i)=>(
            (""+i) !== event.target.id
        )))

      }



/* 
    if(error){
        return(
            <Typography>error occured.</Typography>
        )
    }
    if(loading){
            return (<Typography>loading ....</Typography>)
    } */

    return (
        <Box>
            <ImageDialog open={diagopen} setOpen={setDiagopen} quillref={quillref}
            files={files} setFiles={setFiles} previews={previews} setPreviews={setPreviews} 
            deletefiles={deletefiles} />
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
            <ReactQuill theme="snow" value={dat} onChange={setDat} 
            formats={formats}
            modules={modules}
            placeholder='내용을 입력하세요.'
            ref={quillref}
            />
            <Button onClick={onClickBt}>POST</Button>
            <Box>
                {files && files.map((file,index)=>(
                    <Typography key={file.name} id={index} onClick={deletefiles}>{file.name}</Typography>
                ))}
            </Box>
            {writeloading && !writeerror && <Typography> 전송 중 ...</Typography>}
            {writeerror && <Typography> 전송 실패함</Typography>}
        </Box>
    )
};

export default DraftPage;