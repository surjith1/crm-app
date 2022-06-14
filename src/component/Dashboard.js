import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Dashboard = () => {
  const navigate= useNavigate();
  const [leads,setLeads]=useState([]);
  const dropdown = [
    { label: 'Admin' },
    { label: 'Manager', },
    { label: 'Employee' }
  ];
  useEffect(()=>{
    fetch("https://crm-application-server.herokuapp.com/crmdetails")
    .then((res)=> res.json())
    .then((ld)=>setLeads(ld))
  },[])
  

  return (
    <div className='dash-board'>
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
      DASHBOARD
      </Typography>
      <Button color='inherit' variant="outlined" onClick={()=>navigate("/leads")}>Lead</Button>
 <Button color='inherit'  variant="outlined" onClick={()=>{
  navigate("/login")
  localStorage.removeItem("token")
}}>Logout</Button>
    </Toolbar>
  </AppBar>
  <div className='da-top-sec'>
      <h2>Welcome to CRM</h2>
      <span>
      <span className='refresh-icon'><RefreshIcon /></span>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={dropdown}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Employee Type" />}
    />
      </span>
   
    </div>
    <Container maxWidth="lg">
    <div className="ds-item-wrap">
    <div className="ds-item one">
    <Paper elevation={3}>
       
<p>Leads</p>
<p> <DataThresholdingIcon /> </p>
   
    </Paper>
    </div>
    <div className="ds-item two">
    <Paper elevation={3}>
       
<p>Service Type</p>
<p> <DataThresholdingIcon /> </p>
   
    </Paper>
    </div>
    <div className="ds-item three">
    <Paper elevation={3}>
       
<p>Contacts</p>
<p> <DataThresholdingIcon /> </p>
   
    </Paper>
    </div>
    </div>
    <div className="today-leads">
    <div style={{ height: 400, width: '100%' }}>
    <Paper elevation={2}>
    <TableContainer component={Paper}>
    <h2>Today's Leads</h2> <hr />
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Lead Name</TableCell>
          <TableCell align="center">Company</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Phone</TableCell>
          <TableCell align="center">Lead Owner</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          leads.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.leadName}
            </TableCell>
            <TableCell align="center">{row.company}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.phone}</TableCell>
            <TableCell align="center">{row.leadOwner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Paper>
    </div>
    </div>
    </Container>
    </div>
  )
}

export default Dashboard
