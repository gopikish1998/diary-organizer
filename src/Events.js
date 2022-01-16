import React,{useState} from 'react'
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


function Events() {
    const [value, setValue] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const history=useHistory()
        const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${env.api}/addevent`, { description, date: value, event:title },{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        })
            history.push('/')
    }
    return (
        <div className='container mt-4 d-flex justify-content-center align-items-center flex-column p-3'><h1>ADD EVENT</h1>
          <TextField id="outlined-basic" sx={{margin:3,}} label="Title" variant="outlined" value={title} onChange={e=> setTitle(e.target.value)}/>
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
          <TextField id="outlined-basic" sx={{margin:3,}} label="Description" multiline maxRows={5} variant="outlined" fullWidth value={description} onChange={e=> setDescription(e.target.value)}/>
           <button className='btn btn-primary' onClick={handleSubmit}>Submit</button> 
        </div>
    )
}

export default Events
