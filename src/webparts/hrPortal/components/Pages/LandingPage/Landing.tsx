import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import  styles from './Landing.module.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import swal from 'sweetalert'
import Axios from 'axios';
import {  useHistory } from 'react-router-dom';

const logo = require('../../../assets/white.png');
    
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

const Landing = () => {

const [username, setusername] = useState('');
const endPoint = "https://hrportalserver.herokuapp.com/";

 const history = useHistory();
 useEffect(() => {
   setusername( JSON.parse(localStorage.getItem("staff")));
 }, [])


  const start = (e) =>{
    e.preventDefault();
    Axios.get(`${endPoint}checkUser/`,{
      headers: {
          "user" : localStorage.getItem("staff"),
        },
      })
      .then((response)=>{
      // console.log(response.data)
        if(response.data.length > 0){
          history.push('/dashboard/')
        }
        else{
          swal({
            title: "Unauthorized",
            text: "you are not authorized to use this portal, contact the portal admin",
            icon: "error",
        });
    }
  })

}
    return(
        <ThemeProvider theme={theme}>
        <div className={styles.loginScreen}>
     
          <div className={styles.loginWrapper}>
            <div className={styles.logo}> <img src={String(logo)}/></div>
            <div className={styles.lotus}>
              <p>Lotus Beta Analytics</p> 
              <span> Nigeria Limited</span>
            </div>
            <div className={styles.formTitle}> 
              <p>Welcome!</p> 
            </div>
          
              <div className={styles.signIn}>
            </div>
              <form >
                  <Grid item xs={12} style={{color: 'white', fontWeight: 'bold', justifyContent: 'center'}}>
                   <div style={{ margin: '0 auto', width: '100%', fontSize: '16px', marginBottom: '20px'}}>{username}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={start} variant="contained" fullWidth color="secondary" type='submit'> Launch Portal</Button>
                  </Grid>
              </form>
         
          </div>
        </div>
     
     </ThemeProvider>  
    );
};
export default Landing;