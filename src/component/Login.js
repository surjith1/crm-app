import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material/Button';

const Login = () => {
  
    let navigate = useNavigate();
    const[username,setUsername]=useState("");
    const[firstname,setFirstname]=useState("");
    const[lastname,setLastname]=useState("");
    const[password,setPassword]=useState("");
    const[usertype,setUsertype]=useState("");

    const validate = yup.object({
        username: yup.string().required("Enter Email")
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                "Pattern not matched 🤔"
            ),
        firstname: yup.string().required("Enter First Name"),
        lastname: yup.string().required("Enter Last Name"),
        password: yup.string().required("Password should be enter").min(4, "password atleast enter 4 characters").max(12, "password should not exceed 8 character"),
        usertype: yup.string().required("Choose any one Of the Type")
    });


    const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
        initialValues: {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            usertype: ''
        }, validationSchema: validate,
        onSubmit: (values) => {
            console.log("Form values", values);
              //registerUser(values);
              storeToken();
              
            
        }
    })
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
    navigate("/dashboard")
    
      }
      return  <>
      <Container maxWidth="lg">

          <Paper elevation={3}>
              <div className="registration-fm">
                  <h1>Login Form   </h1>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <TextField id="username" label="Username" variant="standard" type="email" name="username" fullWidth
                              onBlur={handleBlur} onChange={handleChange}
                              value={values.username} error={errors.username && touched.username}
                              helperText={errors.username && touched.username ? errors.username : ""} />

                      </div>
                      <div className="form-group">
                          <Grid container spacing={6}>
                              <Grid item xs={6}>
                                  <TextField id="firstname" label="First Name" variant="standard" type="text" name="firstname" fullWidth
                                      onBlur={handleBlur} onChange={handleChange}
                                      value={values.firstname} error={errors.firstname && touched.firstname}
                                      helperText={errors.firstname && touched.firstname ? errors.firstname : ""} />
                              </Grid>
                              <Grid item xs={6}>
                                  <TextField id="lastname" label="Last Name" variant="standard" type="text" name="lastname" fullWidth
                                      onBlur={handleBlur} onChange={handleChange}
                                      value={values.lastname} error={errors.lastname && touched.lastname}
                                      helperText={errors.lastname && touched.lastname ? errors.lastname : ""} />
                              </Grid>
                          </Grid>
                      </div>
                      <div className="form-group">
                          <TextField id="password" label="Password" variant="standard" type="password" name="password" fullWidth
                              onBlur={handleBlur} onChange={handleChange}
                              value={values.password} error={errors.password && touched.password}
                              helperText={errors.password && touched.password ? errors.password : ""} />
                          
                      </div>
                      <div className="form-group">
                      <TextField id="usertype" label="User Type" variant="standard" type="text" name="usertype" fullWidth
                      
                      onBlur={handleBlur} onChange={handleChange}
                      value={values.usertype} error={errors.usertype && touched.usertype}
                      helperText={errors.usertype && touched.usertype ? errors.usertype : ""} placeholder="select any one USER,ADMIN,EMPLOYEE" />
                  
                      </div>
                      <div className="form-group btn">
                          <Fab variant="extended" color="primary" type="submit">
                              <LoginIcon sx={{ mr: 1 }} />
                              Login
                          </Fab>
                          <Button variant="outlined" className='forgot-psw'><Link to="/forgot-password"> Forgot Password ? </Link></Button>
                      </div>
                      <div className='form-group'>

                      </div>
                  </form>
              </div>
          </Paper>
      </Container>
  </>
}

export default Login
