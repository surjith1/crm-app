import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Registration from './component/Registration';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Dashboard from './component/Dashboard'
import Button from '@mui/material/Button';
import Header from './component/Header'
import Leads from './component/Leads';


function App() {
  return (
    <div className="App">
   <BrowserRouter >
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/dashboard" element={
     
      <Dashboard /> 
     } />
      <Route path="/leads" element={<Leads />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}
const RequireToken=({children})=>{
  const token = localStorage.getItem('token')
  return token ? children : <Navigate replace to="/login" />;
}


const Login = () => {
  
    let navigate = useNavigate();
    const[username,setUsername]=useState("");
    const[firstname,setFirstname]=useState("");
    const[lastname,setLastname]=useState("");
    const[password,setPassword]=useState("");
    const[usertype,setUsertype]=useState("");

    
    const storeToken=(token)=> {
    
    const user={
      username: username,
      firstname:firstname,
      lastname:lastname,
      password:password,
      usertype:usertype
    }
    console.log(user);
    fetch("https://crm-application-server.herokuapp.com/crm/login", {
      method:"POST",
      body:JSON.stringify(user),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then((data)=>data.json())
    .then((auth)=>localStorage.setItem("token",auth.token))
    alert("You have successfully Loged in")
    navigate("/dashboard")
      }
      return  (
        <div>
        <Header />
      <Container maxWidth="lg">

          <Paper elevation={3}>
              <div className="registration-fm">
                  <h1>Login Form   </h1>
                  <form>
                      <div className="form-group">
                          <TextField id="username" label="Username" variant="standard" type="email" name="username" fullWidth
                             onChange={(event)=>setUsername(event.target.value)}
                              />

                      </div>
                      <div className="form-group">
                          <Grid container spacing={6}>
                              <Grid item xs={6}>
                                  <TextField id="firstname" label="First Name" variant="standard" type="text" name="firstname" fullWidth
                                  onChange={(event)=>setFirstname(event.target.value)} />
                              </Grid>
                              <Grid item xs={6}>
                                  <TextField id="lastname" label="Last Name" variant="standard" type="text" name="lastname" fullWidth
                                  onChange={(event)=>setLastname(event.target.value)} />
                              </Grid>
                          </Grid>
                      </div>
                      <div className="form-group">
                          <TextField id="password" label="Password" variant="standard" type="password" name="password" fullWidth
                          onChange={(event)=>setPassword(event.target.value)} />
                          
                      </div>
                      <div className="form-group">
                      <TextField id="usertype" label="User Type" variant="standard" type="text" name="usertype" fullWidth
                       placeholder="select any one USER,ADMIN,EMPLOYEE" 
                       onChange={(event)=>setUsertype(event.target.value)}/>
                  
                      </div>
                      <div className="form-group btn">
                          <Fab variant="extended" color="primary" type="submit" onClick={storeToken}>
                              <LoginIcon sx={{ mr: 1 }} />
                              Login
                          </Fab>
                          <Link to="/forgotpassword"> 
                          <Button variant="outlined" className='forgot-psw'>Forgot Password ?</Button></Link>
                      </div>
                      
                  </form>
              </div>
          </Paper>
      </Container>
      </div>
      )
}
const ForgotPassword = ()=> {
  const[username,setUsername]=useState("");
  const navigate = useNavigate() 

  const storeToken=(e)=> {
    e.preventDefault();

const user={
  username: username,
}
if(username !== user.username){
  alert("Already having same user")
}

else {
 navigate("/reset-password")
}
  }
  return (
    <Container maxWidth="lg">

    <Paper elevation={3}>
        <div className="registration-fm">
            <h1>Email Verification   </h1>
            <form>
                <div className="form-group">
                    <TextField id="username" label="Username" variant="standard" type="email" name="username" fullWidth
                       onChange={(event)=>setUsername(event.target.value)}
                        placeholder="Enter your Email" />

                </div>
                <div className='form-group btn'><Fab variant="extended" color="primary" type="submit"  onClick={storeToken}>
                <LoginIcon sx={{ mr: 1 }} />
                Verify Email
            </Fab>
                </div>
</form>
</div>
</Paper>
</Container>


  )
}

const ResetPassword = ()=> {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  let navigate = useNavigate();
  const user={
    username: username,
    password:password,
  }
  const resetSubmit =()=> {
    fetch("https://crm-application-server.herokuapp.com/crm/forgot-password", {
      method:"POST",
      body:JSON.stringify(user),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then((data)=>data.json())
    navigate("/login")
  }
  return(
  <Container maxWidth="lg">
  <Paper elevation={3}>
      <div className="registration-fm">
          <h1>Email Verification   </h1>
          <form>
              <div className="form-group">
                  <TextField id="username" label="Username" variant="standard" type="email" name="username" fullWidth
                     onChange={(event)=>setUsername(event.target.value)}
                      placeholder="Reset your Email" />

              </div>
              <div className="form-group">
                  <TextField id="password" label="Password" variant="standard" type="password" name="password" fullWidth
                     onChange={(event)=>setPassword(event.target.value)}
                      placeholder=" Reset your Password" />

              </div>
              <div className='form-group btn'>
              <Fab variant="extended" color="primary" type="submit" onClick={resetSubmit} >
              <LoginIcon sx={{ mr: 1 }} />
              Reset Password
          </Fab>
              </div>
</form>
</div>
</Paper>
</Container>
  )
}

export default App;
