import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { CalendarToday } from '@mui/icons-material';
import { Paper, TextareaAutosize } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import env from './Settings'

function Homepage() {
    
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [notes,setNotes] = React.useState([])
  const [events,setEvents] = React.useState([])
    const history = useHistory()
    const handleChange = (newValue) => {
        setValue(newValue);
    };

  const fetchdata = async () => {
    const {data} = await axios.get(`${env.api}/notes`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
      }    
    })
    console.log(data)
    setNotes(data)
  }
  const fetchdata2 = async () => {
    const {data2} = await axios.get(`${env.api}/events`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
    })
    console.log(data2)
    setEvents(data2)
  }
  React.useEffect(async () => {
    fetchdata()
    fetchdata2()
  },[])
  const handleDelete = async (e,id) => {
    e.preventDefault();
    console.log(id)
    const {data} = await axios.delete(`${env.api}/deletenote/${id}`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
    })
    fetchdata()

  }
  const handleDelete2 = async (e,id) => {
    e.preventDefault();
    console.log(id)
    const {data} = await axios.delete(`${env.api}/deleteevent/${id}`,{
        headers : {
            "Authorization" : window.localStorage.getItem("diary-user")
        }
    })
    fetchdata2()
  }
    return (
        <Box>
           
        <div className="container mt-4"><h1>NOTES</h1><Link to='/notes' className='btn btn-success'>ADD NOTES</Link>
          <div className='row'>
            {notes?.map((note)=>{return(
              <div className='col col-lg-4 mt-4'>
                <Link to={`/notes/${note._id}`}><Paper>{`${note.title} ______ ${new Date(note.date).getDate()}/${new Date(note.date).getMonth()+1}/${new Date(note.date).getFullYear()}`}
                {`---- ${new Date(note.date).getHours()}:${new Date(note.date).getMinutes()}hrs`}
                </Paper></Link><button className='btn btn-danger' onClick={e=>handleDelete(e,note._id)}>Delete</button>
                
            </div>
            
            )})}
          </div>
        </div>
        {/* <div className="container mt-4"><h1>EVENTS</h1><Link to='/events' className='btn btn-success'>ADD EVENTS</Link>
          <div className='row'>
            {events?.map((event)=>{return(
              <div className='col col-lg-4 mt-4'>
                <Link to={`/notes/${event._id}`}><Paper>{`${event.event} <br/>${new Date(event.date).getDate()}/${new Date(event.date).getMonth()+1}/${new Date(event.date).getFullYear()}`}
                {`---- ${new Date(event.date).getHours()}:${new Date(event.date).getMinutes()}hrs`}
                </Paper></Link><button className='btn btn-danger' onClick={e=>handleDelete2(e,event._id)}>Delete</button>
            </div>
            )})}
          </div>
        </div> */}
    </Box>
    )
}

export default Homepage;
