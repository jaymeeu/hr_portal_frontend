import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from './Department.module.scss'; 
import Input from '../../controls/Input';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import SelectLocation from '../../controls/SelectLocation';
import SelectManager from '../../controls/SelectManager';
import makeStyles from '@material-ui/core/styles/makeStyles';

const DepartmentAdd = () =>{

    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const [department, setdepartment] = useState('');
    const [location, setlocation] = useState('');
    const [locationAPI, setlocationAPI] = useState([]);
    const [manager, setmanager] = useState('');
    const [managerAPI, setmanagerAPI] = useState([]);
    const [managerCUG, setmanagerCUG] = useState('');

    const endPoint = "https://hrportalserver.herokuapp.com/";

useEffect(()=>{
    Axios.get(`${endPoint}api/location/`).then((response) => {
            setlocationAPI(response.data);
        });
    Axios.get(`${endPoint}api/employees`).then((response) => {
            setmanagerAPI(response.data);
        });
}, []);

    const Submit = (e) =>{
        Axios.post(`${endPoint}api/addDepartment`, {
            department: department,
            location: location, 
            manager: manager,
            managerCUG: managerCUG,
        });
        Axios.put(`${endPoint}update/userFromAddDept`,{
            manager: manager,
            managerCUG: managerCUG,
            });
        e.preventDefault()
        swal({
            title: "Saved!",
            text: "Department Added",
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
                                     <Input
                                         name="department"
                                         label="Department Name"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setdepartment(e.target.value);}}
                                     />
                                 </Grid>
                                 
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <SelectLocation style={{ width: '100%'}}
                                         name="location"
                                         label="Location"
                                         required
                                         onChange={(e)=>{setlocation(e.target.value); }}
                                         options={locationAPI}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                    <SelectManager style={{ width: '100%'}}
                                         name="manager"
                                         label="Manager"
                                         required
                                         onChange={(e)=>{setmanager(e.target.value);}}
                                         options={managerAPI}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="managerCUG"
                                         label="Manager CUG"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setmanagerCUG(e.target.value);}}
                                     />
                                 </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Add Department
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>

        </div>
    );

};
export default DepartmentAdd;