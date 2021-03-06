import * as React from 'react';
import  { useState } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import  styles from './Landing.module.scss';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Input from '../../controls/Input';
import Axios from 'axios';


const useStyles = makeStyles({
        textColor:{
        color:'white'
    },
    inputField:{
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


const useLoginForm = (props) => {
 
  const {welcome, } =props

  const classes = useStyles();

  const [username, setusername] = useState('');
  const [fetchedUsername, setfetchedUsername] = useState('');
  const [errors, setErrors] = useState({});

  const endPoint = "https://hrportalserver.herokuapp.com/";

  const handleSubmit = (e) =>{
    Axios.post(`${endPoint}api/login/`, {
        username: username,
    }).then((response)=>{
      if(response.data.message){
        setfetchedUsername(response.data.message)
      }
      else{setfetchedUsername(response.data[0].name)}
    });
    e.preventDefault();
  } ;


    return(
        <ThemeProvider theme={theme}>  
        
        <div className={styles.loginScreen}>
          <div className={styles.loginWrapper}>
            <div className={styles.logo}> <img src="https://lotusbetaanalytics.com/img/white.png"/></div>
              <div className={styles.lotus}>
                <p>Lotus Beta Analytics</p> 
                <span> Nigeria Limited</span>
              </div>
              <div className={styles.formTitle}>
                <p>HR Portal</p> 
              </div>

              {(fetchedUsername != "") ? (
                  <div>
                     <div className={styles.signIn}>
                        <p>Sign in</p> 
                      </div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Grid container>
                          <Grid item xs={12}>
                              <Input
                                  className={classes.inputField}
                                  color="primary"
                                  name="email"
                                  label="Email" 
                                  onChange={(e) => { setusername(e.target.value); }}
                                  placeholder="Email or Username"  
                                  InputProps={{
                                  className: classes.textColor
                                    }} 
                                    
                                  required
                              />
                          </Grid>
                          <div className={styles.divider}></div>
                          <Grid item xs={12}>
                            <Button variant="contained" fullWidth color="secondary" type='submit'> Login</Button>
                          </Grid>
                        </Grid>
                    </div>
                    </form>
                  </div>
                )
                :
                (
                  <div></div>
                
                )}

             
                        <div style= {{color:'blue', marginTop:'50px', fontSize:'17px'}}>{username}</div>
                        <div style= {{color:'blue', marginTop:'10px', fontSize:'17px'}}>{fetchedUsername}</div>
        </div>
      </div>
     </ThemeProvider>  
    );
};
export default useLoginForm;