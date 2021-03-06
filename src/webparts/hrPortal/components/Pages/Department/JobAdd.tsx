import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from './Department.module.scss'; 
import SelectDept from '../../controls/SelectDepart';
import Input from '../../controls/Input';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import makeStyles from '@material-ui/core/styles/makeStyles';

const LocationAdd = () =>{

    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const [Dept, setDept] = useState('');
    const [Role, setRole] = useState('');
    const [DepartmentAPI, setDepartmentAPI] = useState([]);
    const endPoint = "https://hrportalserver.herokuapp.com/";
    
    useEffect(()=>{
        try{
            Axios.get(`${endPoint}api/departments`).then((response)=>{
                setDepartmentAPI(response.data); 
            console.log(response.data);
            });
        }
        catch{ 
            //error function here
        }
    },[]);


    const Submit = (e) =>{
        Axios.post(`${endPoint}api/addJobRole`, {
            department: Dept,
            jobRole: Role,
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
                                  style={{margin:'0 0 20px 0'}}>
                                     <SelectDept style={{ width: '100%'}}
                                         name="department"
                                         label="Department"
                                         required
                                         onChange={(e)=>{setDept(e.target.value);}}
                                         options={DepartmentAPI}
                                     />
                                 </Grid>
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="jobRole"
                                         label="Job Role"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setRole(e.target.value);}}
                                     />
                                 </Grid>
                                 
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Add Location
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>

        </div>
    );

};
export default LocationAdd;