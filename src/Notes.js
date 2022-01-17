import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, Button, Paper, TextareaAutosize } from '@mui/material';
import Quill, { Delta } from 'quill';
import ReactQuill from 'react-quill'
import '../node_modules/react-quill/dist/quill.snow.css'
import './notes.css'
import axios from 'axios';
import env from './Settings'
import { DateTimePicker } from '@mui/lab';
import { useHistory } from 'react-router-dom';
export default function Notes() {
    const [value, setValue] = useState(null);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [quill, setQuill] = useState(``)
    const [quill2, setQuill2] = useState(``)
    const history = useHistory()
    // const data = new Delta()
    // const wrapperRef = useCallback(wrapper => {
    //     if (wrapper == null) return;

    //     wrapper.innerHTML = ` `
    //     const editor = document.createElement('div')
    //     console.log(wrapper.current)
    //     wrapper.append(editor)
    //     var quill1 = new Quill(editor, {theme:'snow'})
    //     setQuill(quill1)},    
    // [])
    // setQuill2()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${env.api}/addnote`, { description: quill, date: value, title },{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        })
      history.push('/')
    }
        
  return (
      <div className='container mt-4 d-flex justify-content-center align-items-center flex-column'><h1>ADD NOTE</h1>
          <TextField sx={{margin:'10px'}} id="outlined-basic" label="Title" variant="outlined" value={title} onChange={e=> setTitle(e.target.value)}/>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
                label="Select the date"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        flexDirection:'column',
        '& > :not(style)': {
          m: 1,
        //   width: 600,
        //   height: 600,
        },
          }}>
              <Paper>
                  <ReactQuill defaultValue={quill} onChange={(e) => { setQuill(e)}}/>
                  {/* <div id='editor' ref={wrapperRef}></div> */}
              </Paper>
              <Button variant={'filled'} sx={{backgroundColor:'blue',color:'white', width:'100px'}}  onClick={handleSubmit}>Submit</Button>
          </Box>
    </div>
  );
}