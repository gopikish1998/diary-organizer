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

function Appbar() {
  const [token,setToken] = React.useState()
    const pages = ['Home', 'Events', 'Notes'];
    const settings = ['Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const history = useHistory()
    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    // history.push(`/${page}`)
  };
  React.useEffect(() => {
    setToken(window.localStorage.getItem('diary-user'))
    token ? <></> : history.push('/login')
    
  })
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
       
  };
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('called')
    window.localStorage.removeItem('diary-user');
    history.push('/login')
  }
    return (
         <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={e => { handleCloseNavMenu();history.push('/')}}>
                <Typography textAlign="center" >Home</Typography>
              </MenuItem>
              {token?<MenuItem onClick={e=>{handleCloseNavMenu();history.push('/notes')}}>
                <Typography textAlign="center" >Notes</Typography>
              </MenuItem>:<MenuItem >
                <Typography textAlign="center" ></Typography>
              </MenuItem>}
              {token?<MenuItem onClick={e=>{handleCloseNavMenu();history.push('/events')}}>
                <Typography textAlign="center" >Events</Typography>
              </MenuItem>:<MenuItem >
                <Typography textAlign="center" ></Typography>
              </MenuItem>}
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            ORGANIZE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                
                onClick={e=>{history.push('/')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
      
                onClick={e=>{history.push('/notes')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Notes
              </Button>
              <Button
      
                onClick={e=>{history.push('/events')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Events
              </Button>
     
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {token?<Avatar/>:<></>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem >
                    <Button onClick={handleLogout} textAlign="center">Logout</Button>
                </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
        </AppBar>
    )
}

export default Appbar
