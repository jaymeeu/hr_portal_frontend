import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from './Employees.module.scss'; 
import Input from '../../controls/Input';
import {useState} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';


const EmployeeAdd = () =>{
    const [staffID, setstaffID] = useState('');
    const [firstname, setfirstname] = useState('');
    const [middlename, setmiddlename] = useState('');
    const [lastname, setlastname] = useState('');
    const [Pemail, setPemail] = useState('');
    const [email, setemail] = useState('');
    
    const endPoint = "https://hrportalserver.herokuapp.com/";

    const Submit = (e) =>{
        e.preventDefault();
        Axios.post(`${endPoint}api/addstaff`, {
            staffID: staffID,
            firstname: firstname, 
            middlename: middlename,
            lastname: lastname,
            email: email,
            Pemail: Pemail
        })
        .then((response)=>{
            if(response.data.message == "StaffID Already Exist"){
                swal({
                    title: "Note!",
                    text: "StaffID Already Exist",
                    icon: "warning",
                    timer: 2000,
                });
            }
            else if(response.data.message == "User Already Exist"){
                swal({
                    title: "Note!",
                    text: "User Already Exist",
                    icon: "warning",
                    timer: 2000,
                });
            }

            else if(response.data.message == "saved"){
                swal({
                    title: "Saved!",
                    text: "Staff Added",
                    icon: "success",
                    timer: 2000,
                });
            }
        });
     };
  
    return(
        <div className={styles.addEmployeeForm}>

            <div className={styles.addForm}>

                <form onSubmit={Submit} autoComplete='off'>
                     <Grid container>
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="staffID"
                                         label="Staff ID"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setstaffID(e.target.value);}}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="firstname"
                                         label="Firstname"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setfirstname(e.target.value);}}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input                                       
                                         name="middlename"
                                         label="Middlename"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setmiddlename(e.target.value);}}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input
                                         name="lastname"
                                         label="Lastname"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setlastname(e.target.value);}}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input                                        
                                         name="officialEmail"
                                         label="Official Email"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setemail(e.target.value);}}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <Input                                        
                                         name="Pemail"
                                         label="Personal Email(Gmail)"
                                         required
                                         fullWidth
                                         onChange={(e)=>{setPemail(e.target.value);}}
                                     />
                                 </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Add Staff
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>

        </div>
    );

};
export default EmployeeAdd;