import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControl, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateCategoryDialog(props) {
    const {open,setOpen,refetchCategories} = props;
    const [title,setTitle] = React.useState('');
    const [desc,setDesc] = React.useState('');
    const [isPrivate,setIsPrivate] = React.useState(false);
    const handleClose =()=>{
        setOpen(false);
    }
    const createCategory = async ()=>{
      try{
        const response = await axios.post('/category',
        {
          title:title,
          description:desc,
          isPrivate:isPrivate
        },{
          "Content-Type":"application/json"
        });
        refetchCategories();
        setTitle('');
        setDesc('');
        setIsPrivate(false);
        handleClose();

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
          카테고리 추가
        </DialogTitle>
        <DialogContent>
            <FormControl>
              <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} label="이름" required />
              <TextField value={desc} onChange={(e)=>{setDesc(e.target.value)}} label="설명" required />
              비공개: <Checkbox checked={isPrivate} onChange={(e)=>{setIsPrivate(e.target.checked)}}/>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={createCategory}>추가</Button>


        </DialogActions>
      </Dialog>
    </div>
  );
}