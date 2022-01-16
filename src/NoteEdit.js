import React, { useCallback, useEffect, useState } from 'react';
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
function NoteEdit(props) {
    const [date, setDate] = useState(null);
    const [note, setNote] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [quill, setQuill] = useState(``)
    const [quill2, setQuill2] = useState(``)
    useEffect(async () => {
        const {data} = await axios.get(`${env.api}/note/${props.match.params.id}`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        }) 
    console.log(data)
        setNote(data)
        setDescription(data.description)
        setDate(data.date)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`${env.api}/editnote/${props.match.params.id}`, { description, date },{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        })
        console.log(data)
    }
    return (
      <div className='container mt-4 d-flex justify-content-center align-items-center flex-column'>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
                label="Select the date"
                value={date}
                onChange={(newValue) => {
                setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <Box sx={{
                display: 'flex',
              flexDirection:'column',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
        //   width: 600,
        //   height: 600,
        },
          }}>
              <Paper>
                    <ReactQuill value={description} onChange={(e) => { setDescription(e); setQuill(e); console.log(description)}}/>
                  {/* <div id='editor' ref={wrapperRef}></div> */}
              </Paper>
              <Button onClick={handleSubmit}>Submit</Button>
          </Box>
    </div>
  );
}

export default NoteEdit
