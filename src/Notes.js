import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, Paper, TextareaAutosize } from '@mui/material';
import Quill from 'quill';
import ReactQuill from 'react-quill'
import '../node_modules/react-quill/dist/quill.snow.css'
import './notes.css'
export default function Notes() {
    const [value, setValue] = useState(null);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [quill, setQuill] = useState()

    // const wrapperRef = useCallback((wrapper) => {
    //     if (wrapper == null) return;

    //     wrapper.innerHTML = ``
    //     const editor = document.createElement('div')
    //     wrapper.current.append(editor)
    //     var quill = new Quill(editor, {theme:'snow'})

    //     },    
    // [])
  return (
      <div className='container mt-4 d-flex justify-content-center align-items-center flex-column'>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
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
        '& > :not(style)': {
          m: 1,
        //   width: 600,
        //   height: 600,
        },
          }}>
              <Paper>
                  <ReactQuill onChange={e => { setQuill(e); console.log(quill) }}/>
              </Paper>
          </Box>
          
          {/* <TextField
                id="filled-textarea"
                label="Title"
                placeholder="Placeholder"
                value={title}
              multiline
              onChange={e => setTitle(e.target.value)}
                maxRows={4}
                minWidth={"100px"}
                variant="outlined"
          />  */}
          
          {/* <TextareaAutosize   
      aria-label="minimum height"
                value={content}
              onChange={e => setContent(e.target.value)}
                rows={3}
                placeholder="Write your note here"
                style={{  height:100,width:"100%", resize:'horizontal', overflowY:"scroll" }}
                /> */}
    </div>
  );
}