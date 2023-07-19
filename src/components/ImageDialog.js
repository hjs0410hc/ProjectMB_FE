import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../atoms';

export default function ImageDialog(props) {
    const {open,setOpen,quillref} = props;
    const [uploadError,setUploadError]=React.useState(false);
    const [uploadLoading,setUploadLoading]=React.useState(false);
    const [uploadedImages,setUploadedImages] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };


  const uploadImages = async (files)=>{
    try{
      setUploadLoading(true);
      const formdata = new FormData();
      
      var fileList = Array.from(files);
      formdata.append('type','file');
      formdata.append('name','image');
      fileList.forEach((file)=>{
          formdata.append('image',file);
      })
      const response = await axios.post('/files/images',formdata,{
        'Content-Type':'multipart/form-data'
      });
      const resfilelist = response.data.data;
      setUploadedImages([...uploadedImages,...resfilelist]);
      setUploadLoading(false);
    }catch(err){
      setUploadError(true);
      setUploadLoading(false);
    }


  }
  const onChangeFiles = async (event)=>{
    uploadImages(event.target.files);
  }
  const addImagestoEditor = ()=>{
    const editor = quillref.current.getEditor();
    uploadedImages.forEach(resfile =>{
      let index = (editor.getSelection() || {}).index;
      if(index===undefined||index<0)index=editor.getLength();
      const getpath = baseURL + '/' + resfile.filepath;
      editor.insertEmbed(index ,'image',{
        alt:resfile.filepath,
        src:getpath
      });
      editor.insertText(index+1,'\n');
      editor.setSelection(index+2,1);
    })
    handleClose();
  }

  const removeImage = (event)=>{
    const targetFile = event.currentTarget.id;
    setUploadedImages(uploadedImages.filter(image=>{
      return targetFile!==image.filepath;
    }));
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이미지 업로드"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이미지 추가<br />
            <input type='file' accept='image/*' onChange={onChangeFiles} multiple/>
          </DialogContentText>
          <Grid container direction='column' spacing='10px'>
            {uploadedImages && uploadedImages.map((image,index)=>(
            <Grid item key={index}>
                <Typography>{index+1}</Typography>
                <img id={image.filepath} src={baseURL+'/'+image.filepath} alt={image.filepath} style={{maxWidth:'30%'}} onClick={removeImage} />
            </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={addImagestoEditor}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}