import React,{useEffect, useState} from 'react'
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


function EventEdit(props) {
    const [value, setValue] = useState(null);
    const [title, setTitle] = useState('')
    const [event, setEvent] = useState('')
    const [date,setDate]= useState('')
    const [description, setDescription] = useState('')
    const history=useHistory()
    useEffect(async () => {
        const {data} = await axios.get(`${env.api}/event/${props.match.params.id}`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        }) 
        console.log(data)
        setEvent(data)
        setDescription(data.description)
        setDate(data.date)
        setEvent(data.event)
    }, [])  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`${env.api}/editevent/${props.match.params.id}`, { event,description, date },{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
        })
        console.log(data)
        history.push('/')
    }
    return (
        <div className='container mt-4 d-flex justify-content-center align-items-center flex-column p-3'><h1>ADD EVENT</h1>
          <TextField id="outlined-basic" sx={{margin:3,}} label="Title" variant="outlined" value={event} onChange={e=> setEvent(e.target.value)}/>
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
          <TextField id="outlined-basic" sx={{margin:3,}} label="Description" multiline maxRows={5} variant="outlined" fullWidth value={description} onChange={e=> setDescription(e.target.value)}/>
           <button className='btn btn-primary' onClick={handleSubmit}>Submit</button> 
        </div>
    )
}

export default EventEdit
