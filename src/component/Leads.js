import React, { useEffect, useState } from 'react';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Leads = () => {
    const navigate= useNavigate();
    const [leads,setLeads]=useState([]);
    useEffect (()=>{
      fetch("https://crm-application-server.herokuapp.com/crmdetails")
      .then((res)=> res.json())
      .then((ld)=>setLeads(ld))
    },[])
  return (
    <div className='lead-sec'>
    <div className="lead-item-wrap">
      {
        leads.map((lead) =>{
            return <>
           
            <div className="lead-item">
            
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkF17GkzaTA0PzQjgSusQHlkBbFiA7_vswEA&usqp=CAU"
        alt="User icons"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {lead.leadName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <div className="content">
        <span className="company">{lead.company} </span>
        <p className="icon-text">
        <PhoneAndroidIcon />
        <span className="ph">{lead.phone} </span>
        </p>
        <p className="icon-text">
        <MailIcon />
        <span className="ph">{lead.email} </span>
        </p>
       
        </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
            </>
        })
      }
      </div>
      <div className="back-btn">
      <Button variant="outlined" color="primary" onClick={()=>navigate(-1)}>Back</Button>
      </div>
    </div>
  )
}

export default Leads
