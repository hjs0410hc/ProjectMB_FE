import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';

export default function FileDialog(props) {
    const {open,setOpen,quillref, files,setFiles} = props;
    const [uploadError,setUploadError]=React.useState(false);
    const [uploadLoading,setUploadLoading]=React.useState(false);
    const [uploadedImages,setUploadedImages] = React.useState([]);
    const [uploadingFiles,setUploadingFiles] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const queueFiles = (event)=>{
    const fileList = Array.from(event.target.files);
    console.log(fileList);
    setUploadingFiles([...uploadingFiles,...fileList]);
  }

  const uploadFiles = async ()=>{
    try{
      const formdata = new FormData();
      formdata.append('type','file');
      formdata.append('name','file');
      uploadingFiles.forEach((file)=>{
        formdata.append('file',file);
      })
      const response = await axios.post('/files',formdata,{
        'Content-Type':'multipart/form-data'
      });
      const resfilelist = response.data.data;
      setFiles([...files,...resfilelist]);
      handleClose();
    }catch(err){
      console.error(err);
    }
  }

  const removeFile = (event)=>{
    setUploadingFiles(uploadingFiles.filter((value,index)=>{
      return index!==event.currentTarget.id;
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
          {"첨부파일 업로드"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            파일 추가<br />
            <input type='file' onChange={queueFiles} multiple/>
          </DialogContentText>
          <Grid container direction='column' spacing='10px'>
            {uploadingFiles && uploadingFiles.map((file,index)=>(
            <Grid item key={index}>
                <Typography id={index} onClick={removeFile}>{index+1}: {file.name}</Typography>
            </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={uploadFiles}>
            업로드
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}