import { Box, Button, Checkbox, Container, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import hljs from 'highlight.js';
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ImageResize from "quill-image-resize";
import { useNavigate, useParams } from "react-router-dom";
import ImageDialog from "../components/ImageDialog";
import { useRecoilState } from "recoil";
import { baseURL, userState } from "../atoms";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import FileDialog from "../components/FileDialog";


ReactQuill.Quill.debug(false)
let BlockEmbed = ReactQuill.Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.src);
    return node;
  }
  
  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

ReactQuill.Quill.register(ImageBlot);
ReactQuill.Quill.register('modules/ImageResize',ImageResize);
ReactQuill.Quill.register('modules/imageDropAndPaste',QuillImageDropAndPaste);

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['roboto','Noto-Sans-KR','Gulim'];
ReactQuill.Quill.register(Font,true);
const Size = ReactQuill.Quill.import('attributors/style/size');
Size.whitelist = ['9px','10px','11px','12px','14px','18px','24px','36px','40px'];
ReactQuill.Quill.register(Size,true);


export default function PostWriteEditPage(props){
    // is this in edit mode?
    // where did this come from? : postID, category?
    // 
    const {editMode} = props;
    const {postid,catname} = useParams();
    const [content,setContent] = useState('');
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [categories,setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [catError, setCatError] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState(false);
    const [writeLoading, setWriteLoading] = useState(false);
    const [writeError, setWriteError] = useState(false);
    const [files,setFiles] = useState([]); // 일단 objectID만 들어간다고
    const [isPrivate,setIsPrivate] = useState(false);
    const [open,setOpen] = useState(false);
    const [fileOpen,setFileOpen] = useState(false);
    const navigate = useNavigate();
    const [index,setIndex]=useState(0);
    const quillRef = useRef();
    const [user] = useRecoilState(userState);

    useEffect(()=>{
        async function getAllCategories(){
            try{
                const URL = "/category"
                const data = await axios.get(URL);
                if(data.status !== 200){
                    setCatError(true);
                    return;
                }
                setCategories(data.data.data);
                setCatLoading(false);
            }catch(err){
                setCatError(true);
            }
        }
        async function getTargetPost(){
            try{
                setPostLoading(true);
                const URL = `/post/${postid}`
                const data = await axios.get(URL);
                if(data.status !== 200){
                    setPostError(true);
                    setPostLoading(false);
                    return;
                }
                const post = data.data.data;
                setTitle(post.title);
                setCategory(post.category.title);
                setIsPrivate(post.isPrivate);
                setFiles(post.files);
                quillRef.current.getEditor().root.innerHTML=post.content;
                setPostLoading(false);
            }catch(err){
                setPostError(true);
                setPostLoading(false);
            }
        }
        getAllCategories();
        if(editMode){
            getTargetPost();
        }
        if(catname){
            setCategory(catname);
        }
    },[user,editMode,postid,catname]) // get Categories;


    const sendPost = async ()=>{
        try{
            setWriteLoading(true);
            const endpoint = "/post";
            const response = await axios.post(endpoint,{
                title:title,
                content:quillRef.current.getEditor().root.innerHTML,
                category:category,
                isPrivate:isPrivate,
                files:files.map(file=>file._id)
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            setWriteLoading(false);
            navigate('/post/'+response.data.data.createdID);
        }catch(err){
            setWriteError(true);
            setWriteLoading(false);
        }
    }

    const updatePost = async ()=>{
        try{
            setWriteLoading(true);
            const response = await axios.put(`/post/${postid}`,{
                title:title,
                content:quillRef.current.getEditor().root.innerHTML,
                category:category,
                isPrivate:isPrivate,
                files:files.map(file=>file._id)
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            console.log(response);
            if(response.data.data.modifiedCount > 0){
                setWriteLoading(false);
                navigate('/post/'+postid);
            }else{
                setWriteError(true);
                setWriteLoading(false);
            }
        }catch(err){
            setWriteError(true);
            setWriteLoading(false);
        }
    }
    const imageUploader = async (imageDataURL, type, imageData)=>{
        try{
            const formdata = new FormData();
            formdata.append('type','file');
            formdata.append('name','image');
            formdata.append('image',imageData.toBlob());
            const response = await axios.post('/files/images',formdata,{
                'Content-Type':'multipart/form-data'
            });
            const editor = quillRef.current.getEditor();
            response.data.data.forEach(resfile =>{
                let index = (editor.getSelection() || {}).index;
                if(index===undefined||index<0)index=editor.getLength();
                const getpath = baseURL + '/' + resfile.filepath;
                editor.insertEmbed(index ,'image',{
                  alt:resfile.filepath,
                  src:getpath
                });
              })
        }catch(err){
            console.error(err);
        }
    }

    const removeFile = (event)=>{
        // event.currentTarget.id : delete target filemgmt id
        setFiles(files.filter((file)=>{
            return file._id !== event.currentTarget.id;
        }));
    }

    const modules = useMemo(
        () => ({
            syntax:{
                highlight:text=>hljs.highlightAuto(text).value
            },
          toolbar: {
            container: [
                [{'font':['roboto','Noto-Sans-KR','Gulim']}],
              [{ 'size' :  ['9px','10px','11px','12px','14px','18px','24px','36px','40px']} , { color: ['red','blue','black'] }],
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
              [{'color':[]},{'background':[]}],
              ["image", "video"],
            ],
            handlers: {
              image: ()=>{setOpen(true)},
            },
          },
          ImageResize:{
            parchment: ImageBlot
          },
          imageDropAndPaste:{
            handler: imageUploader,
          },
        }),
        []
      );

        /* const imageRemove = (alt)=>{
            let editor = quillRef.current.getEditor();
            const imageBlots = editor.scroll.descendants(ReactQuill.Quill.import('formats/image'));
            if(imageBlots){
                imageBlots.forEach(imageBlot => {
                    console.log(imageBlot.domNode.src);
                    if(imageBlot.domNode.alt===alt){
                        editor.deleteText(imageBlot.offset(editor.scroll),1);
                    }
                });
            }
        } */


    return (
        <Container>
            <ImageDialog open={open} setOpen={setOpen} quillref={quillRef}/>
            <FileDialog open={fileOpen} setOpen={setFileOpen} files={files} setFiles={setFiles}/>
            <Grid container direction="column" spacing="10">
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel>
                            게시판
                        </InputLabel>
                        <Select value={category} label="게시판" onChange={(e)=>{setCategory(e.target.value)}}>
                    
                    {categories.length > 0 && categories.map(category=>(
                        <MenuItem key={category.title} value={category.title}>{category.title}</MenuItem>
                    ))}
                </Select>


                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title} label="제목" placeholder="제목" fullWidth/>
                    
                </Grid>
                <Grid item>
                    비밀글: <Checkbox checked={isPrivate} onChange={(e)=>{setIsPrivate(e.target.checked);}} />
                </Grid>
                <Grid item>
                    <ReactQuill 
                    theme="snow" 
                    value={content} 
                    modules={modules}
                    onChange={setContent}
                    placeholder="내용을 입력하세요."
                    ref={quillRef}
                    />
                </Grid>
            </Grid>
            {files && files.map(file=>(
                <Typography id={file._id} onClick={removeFile} key={file.filepath}>{file._id}:{file.filepath}, {file.filesize}bytes</Typography>
            ))}
            {!editMode ? <Button onClick={sendPost}>글 작성</Button> :
                <Button onClick={updatePost}>글 수정</Button>    
            }  
            <Button onClick={()=>{navigate(-1)}}>취소</Button>
            <Button onClick={()=>{setFileOpen(true)}}>첨부파일 업로드</Button>
        </Container>
    )


}