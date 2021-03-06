import * as React from 'react';
import  { useState } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import  styles from './Login.module.scss';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Input from '../../controls/Input';
import Axios from 'axios';
import {  useHistory } from 'react-router-dom';

const logo = require('../../../assets/white.png');

const useStyles = makeStyles({
        textColor:{
        color:'white'
    },
    inputField:{
      marginTop:'15px',
    '&.label':{color:'white'}
    }
})
    
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f7c332',
    },
  },
});

const Login = () => {
  const classes = useStyles();

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [fetchedUsername, setfetchedUsername] = useState('');
  const [LoginStatus, setLoginStatus] = useState(false)
  const [error, setError] = useState('');

  const endPoint = "https://hrportalserver.herokuapp.com/";

  const handleSubmit = (e) =>{
    Axios.post(`${endPoint}api/checkUser/`, {
        username: username,
    }).then((response)=>{
      if(response.data[0].name){
        setfetchedUsername(response.data[0].name)
        //console.log(response)
      }
      else{setError(response.data)}
    });
    e.preventDefault();
 };

 const history = useHistory();

  const handleLogin = (e) =>{
    Axios.post(`${endPoint}api/login/`, {
        username: username, 
        password: password,
    }).then((response)=>{
      if(response.data.auth){
        localStorage.setItem("token", response.data.token)
        history.push("/dashboard/");
       // console.log(response)
      }
      else{setError(response.data.message)}
    });
    e.preventDefault();
  } ;
 

    return(
        <ThemeProvider theme={theme}>
        <div className={styles.loginScreen}>
      {!fetchedUsername ? 

          <div className={styles.loginWrapper}>
            <div className={styles.logo}> <img src={String(logo)}/></div>
            <div className={styles.lotus}>
              <p>Lotus Beta Analytics</p> 
              <span> Nigeria Limited</span>
            </div>
            <div className={styles.formTitle}>
              <p>HR Portal</p> 
            </div>
           
              <div className={styles.signIn}>
              <p>Sign in</p> 
            </div> 
              <form onSubmit={handleSubmit} >
                <div>
                  <Grid container>
                      <Grid item xs={12}> 
                          <Input
                              fullWidth
                              className={classes.inputField}
                              color="primary"
                              name="email"
                              label="Email" 
                              onChange={(e) => { setusername(e.target.value); setError("") }}
                              placeholder="Email or Username"  
                              InputProps={{
                              className: classes.textColor
                                }} 
                              required
                          />
                      </Grid>
                      <div className={styles.divider}>{error}</div>
                      <Grid item xs={12}>
                        <Button variant="contained" fullWidth color="secondary" type='submit'> Login</Button>
                      </Grid>
                    </Grid>
                </div>
                </form>
         
          </div>
          :
          <div className={styles.loginWrapper}>
            <div className={styles.logo}> <img src={String(logo)}/></div>
            <div className={styles.lotus}>
              <p>Lotus Beta Analytics</p> 
              <span> Nigeria Limited</span>
            </div>
            <div className={styles.formTitle}>
              <p>HR Portal</p> 
            </div>
          
              <div className={styles.signIn}>
              <p>welcome {fetchedUsername}</p> 
            </div>
              <form autoComplete='off'>
                <div>
                  <Grid container>
                      <Grid item xs={12}>
                          <Input
                              type='password'
                              fullWidth
                              className={classes.inputField}
                              color="primary"
                              name="password"
                              label="Password" 
                              onChange={(e) => { setPassword(e.target.value); setError("")  }}
                              placeholder="password"  
                              InputProps={{
                              className: classes.textColor
                                }} 
                              required
                          />
                      </Grid>
                      <div className={styles.divider}>{error}</div>
                      <Grid item xs={12}>
                        <Button onClick={handleLogin} variant="contained" fullWidth color="secondary" type='submit'> Login</Button>
                      </Grid>
                    </Grid>
                </div>
                </form>
         
          </div>
          }
        </div>
     
     </ThemeProvider>  
    );
};
export default Login;