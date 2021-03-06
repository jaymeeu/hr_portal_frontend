import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from './Department.module.scss'; 
import Input from '../../controls/Input';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import {useParams} from 'react-router';
import SelectManager from '../../controls/SelectManager';
import makeStyles from '@material-ui/core/styles/makeStyles';
const one = require('../../../assets/1.jpg');
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';

const DepartmentEdit = () =>{

    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();
    const [adminData, setadminData]= useState([]);
    const [departData, setdepartData] = useState([]);
    const [manager, setmanager] = useState('');
    const [managerAPI, setmanagerAPI] = useState([]);
    const [managerCUG, setmanagerCUG] = useState('');
    
    const endPoint = "https://hrportalserver.herokuapp.com/";

    const { sn } = useParams<Record<string, string | undefined>>()
    
useEffect(()=>{
    Axios.get(`${endPoint}admin`, {
        headers: {
            "user" : localStorage.getItem("staff"),
        },
    })
    .then((response)=>{
        setadminData(response.data);
    });
    Axios.get(`${endPoint}api/department/${sn}`).then((response) => {
        setdepartData(response.data);
    });
    Axios.get(`${endPoint}api/employees`).then((response) => {
        setmanagerAPI(response.data);
    });
}, []);

    const updateDepart = (e) =>{
        Axios.put(`${endPoint}update/dept`,{
            sn: sn,
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
            text: "Department updated",
            icon: "success",
            timer: 2000,
        });  
     };
  
    return(

        <div className={styles.sideBar}>
        { adminData.map((detail)=>{
           return <div key={detail.sn}>
          
       <div className={styles.sideBarLinks}>                
           <div className={styles.profile}>
               <div className={styles.pics}>
                   <img src={detail.passport}/>
               </div> 
               <span>{detail.name}</span>
           </div>
             <Nav styles = {navStyles} groups={navLinkGroups}/>  
      </div>
   
    <div className={styles.main}>
       
    <div className={styles.container}>

        <div className={styles.addEmployeeForm}>

            <div className={styles.addForm}>

        {departData.map((depart)=>{
            return <div key= {depart.sn}>
                 <form onSubmit={updateDepart} className={classes.root} autoComplete="off">
                     <Grid container>
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="department"
                                         label="Department Name"
                                         fullWidth
                                         value= {depart.departmentName}
                                       />
                                 </Grid>
                                 
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="location"
                                         label="Location"
                                         fullWidth
                                         value= {depart.location}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                    <SelectManager style={{ width: '100%'}}
                                         name="manager"
                                         label="Manager"
                                         placeholder= {depart.manager}
                                         onChange={(e)=>{setmanager(e.target.value);}}
                                         options={managerAPI}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="managerCUG"
                                         label="Manager CUG"
                                         fullWidth
                                         required
                                         onChange={(e)=>{setmanagerCUG(e.target.value);}}
                                     />
                                 </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Update Department
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>
        })}
               

            </div>

        </div>
        </div>
        </div>
        </div>
            })}
        </div>
    );

};
export default DepartmentEdit;