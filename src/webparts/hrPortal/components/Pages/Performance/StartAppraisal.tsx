import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from '../Department/Department.module.scss'; 

import Input from '../../controls/Input';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SelectQuarter from '../../controls/SelectQuarter';

const StartAppraisal = () =>{

    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const [Quarter, setQuarter] = useState('')
    const [Datee, setDatee] = useState('');

  
    const Submit = (e) =>{
        Axios.post("http://localhost:3001/api/addJobRole", {
            quarter: Quarter,
            datee: Datee,
        });
        e.preventDefault()
        swal({
            title: "Saved!",
            text: "Job Role Added",
            icon: "success",
            timer: 2000,
        });
        
     };
  
    return(
        <div className={styles.addEmployeeForm}> 

            <div className={styles.addForm}>

                <form onSubmit={Submit} className={classes.root} autoComplete="off">
                     <Grid container>
                                 <Grid item xs={12}
                                    style={{ margin: '0 0 15px 0px', fontSize: '14px', fontWeight: 'bolder'}}> 
                                    <SelectQuarter style={{ width: '100%'}}
                                    name="quarter"
                                    label="Quarter"
                                    required
                                    fullWidth
                                    onChange={(e)=>{setQuarter(e.target.value)}}
                                     />
                                 </Grid>
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="Date"    
                                         type='date'
                                         required
                                         fullWidth
                                         onChange={(e)=>{setDatee(e.target.value);}}
                                     />
                                 </Grid>
                                 
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Start
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>

        </div>
    );

};
export default StartAppraisal; 