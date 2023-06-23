import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeletePostDialog(props) {
    const {open,setOpen,postid} = props;
    const navigate =useNavigate();

    const handleClose =()=>{
        setOpen(false);
    }
    const deletePost = async ()=>{
        try{
            const response = await axios.delete(`/post/${postid}`);
            navigate(-1);
        }catch(err){
            console.error(err);
        }
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
          글 삭제 확인
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 글을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>아니오</Button>
            <Button onClick={deletePost}>예</Button>


        </DialogActions>
      </Dialog>
    </div>
  );
}