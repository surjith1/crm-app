import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='top-header'>
    <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        CRM APPLICATION
      </Typography>
      <Link to="/registration">
      <Button color="inherit">Registration</Button></Link>
      <Link to="/login">
      <Button color="inherit">Login</Button></Link>
    </Toolbar>
  </AppBar>
    </div>
  )
}

export default Header
