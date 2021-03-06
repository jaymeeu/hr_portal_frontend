import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './Employees.module.scss'; 
import Header from '../../Header';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Input from '../../controls/Input';
import Axios from 'axios';
import {useParams} from 'react-router';
import SelectLocation from '../../controls/SelectLocation';
import SelectDept from '../../controls/SelectDepart';
import SelectRole from '../../controls/SelectRole';
import swal from 'sweetalert';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';
import Popup from "../../Popup";
import AssignAsset from "./AssignAsset";
import {useHistory}  from 'react-router-dom';


const EmployeeEdit = () =>{
    const history = useHistory();
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();
    const [userData, setuserData] = useState([]);
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [CUG, setCUG] = useState('');
    const [level, setLevel] = useState('');
    const [locationAPI, setlocationAPI] = useState([]);
    const [DepartmentAPI, setDepartmentAPI] = useState([]);
    const [RoleAPI, setRoleAPI] = useState([]);
    const [adminData, setadminData]= useState([]);
    const [openPopup, setopenPopup] = useState(false);
    
    const endPoint = "https://hrportalserver.herokuapp.com/";

    const { id } = useParams<Record<string, string | undefined>>()
    useEffect(()=>{
        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{ 
            // console.log(response.data)
            setadminData(response.data);              
        });
        Axios.get(`${endPoint}api/location/`).then((response) => {
            setlocationAPI(response.data);
        });
        Axios.get(`${endPoint}api/departments`).then((response)=>{
              setDepartmentAPI(response.data);
              });

        Axios.get(`${endPoint}api/employee/${id}`).then((response) => {
            setuserData(response.data);
            //console.log(response.data)
            setRole(response.data[0].JobRole);
            setLocation(response.data[0].Location);
            setDepartment(response.data[0].Department);
            setLevel(response.data[0].Level);
            setCUG(response.data[0].CUGNumber);
            setStatus(response.data[0].Status)
        });

        Axios.get(`${endPoint}api/jobrole`).then((response) => {
            setRoleAPI(response.data);
        });
        
    }, []);
   
    const cancelClick = (e) => {history.push("/employees")}

    const updateUser = (e) => {
        e.preventDefault();
        Axios.put(`${endPoint}update/user`,{
        staffID: id,
        role: role,
        location: location,
        department: department,
        level: level,
        cug: CUG,
        status: status,
        }).then((response)=>{
            if(response){
                swal({
                    title: "Saved!",
                    text: "User Data Updated",
                    icon: "success",
                    timer: 2000,
                    }); 
            }
            else{
                swal({
                    title: "Error!",
                    text: "An Error Occur",
                    icon: "Danger",
                    timer: 2000,
                    });
            }

        });

    }

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
            
                <div className={styles.search}>
                    <Header tag="Edit Staff Information"/>
                </div>
            
                <div className={styles.content}>
                {userData.map((userDetail)=>{
                        return <div key={userDetail.StaffID}>
                    
                   <div className={styles.info}>
                       <div className={styles.picture}>
                           <div className={styles.dp}> <img src={userDetail.Passport}/></div> 
                           <div className={styles.dpinfo}> 
                                <div><span>{userDetail.FirstName +" "}{userDetail.LastName}</span></div>
                                <div><span>{userDetail.Department}</span></div>
                                <div><span>{userDetail.JobRole}</span></div>
                           </div> 
                       </div>
                   </div>

                        <div className={styles.performanceChart}>
                    <form className={classes.root} autoComplete="off" onSubmit={updateUser}>
                    
                        <Grid container>
                            <div>

                                <Grid container>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Staff-ID</span>
                                        <Input
                                            name="staffID"
                                            
                                            disabled
                                            fullWidth
                                            value= {userDetail.StaffID}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>First name</span>
                                        <Input
                                            name="firstname"
                                            disabled
                                            fullWidth
                                            value= {userDetail.FirstName} 
                                           // onChange={(e)=>{setfirstname(e.target.value);}}
                                           />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Middle name</span>
                                        <Input
                                            name="middlename"
                                            disabled
                                            fullWidth
                                            value= {userDetail.MiddleName}
                                          //  onChange={(e)=>{setmiddlename(e.target.value);}}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Last name</span>
                                        <Input
                                            name="lastname"
                                            disabled
                                            fullWidth
                                            value= {userDetail.LastName}
                                            //onChange={(e)=>{setlastname(e.target.value);}}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Official Email</span>
                                        <Input
                                            name="email"
                                            disabled
                                            fullWidth
                                            value= {userDetail.OfficialEmail}
                                           // onChange={(e)=>{setemail(e.target.value);}}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                       <SelectLocation style={{ width: '100%'}}
                                         name="location"
                                         label="Location"
                                         
                                         onChange={(e)=>{setLocation(e.target.value);}}
                                         options={locationAPI}
                                     />
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                          
                                         <SelectDept style={{ width: '100%'}}
                                         name="department"
                                         label="Department"
                                         
                                         onChange={(e)=>{setDepartment(e.target.value)}}
                                         options={DepartmentAPI}
                                     />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Level</span>
                                        <Input
                                            name="level"
                                            
                                            fullWidth
                                            defaultValue= {userDetail.Level}
                                            onChange={(e) => { setLevel(e.target.value); }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>CUG</span>
                                        <Input
                                            name="cug"
                                            
                                            fullWidth
                                            defaultValue= {userDetail.CUGNumber}
                                            onChange={(e) => { setCUG(e.target.value); }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                          
                                         <SelectRole style={{ width: '100%'}}
                                         name="role"
                                         label="Role"
                                         
                                         onChange={(e)=>{setRole(e.target.value);}}
                                         options={RoleAPI}
                                     />
                                    </Grid>
                                    <Grid item xs={5}
                                        style={{ margin: '0 0 15px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                        <span>Status</span>
                                        <Input
                                            name="status"
                                            defaultValue= {userDetail.Status}
                                            fullWidth
                                            onChange={(e) => { setStatus(e.target.value); }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px' }}>
                                         <span style={{color:'white'}}>asset</span>
                                         <Button
                                             fullWidth
                                             style={{ background: 'green', color: 'white', textTransform:'none' }}
                                             onClick={()=>setopenPopup(true)}>
                                             Add Assets
                                        </Button>
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px' }}>
                                         <Button
                                            type="submit"
                                             fullWidth
                                             style={{ background: '#f8c333', color: 'white', textTransform:'none' }}>
                                             Update Info
                                        </Button>
                                    </Grid>
                                    <Grid item xs={5}
                                         style={{ margin: '0 0 15px 20px' }}>
                                         <Button
                                             fullWidth
                                             onClick = {cancelClick} 
                                             style={{ background: 'red', color: 'white', textTransform:'none' }}>
                                             Cancel
                                        </Button>
                                    </Grid>

                                </Grid>

                            </div>
                        </Grid>
                    </form>
                    
                    </div>
                    </div>
                    })};
                   </div>
                   </div>
                   </div>
                   </div>
            })}
                <Popup 
                openPopup={openPopup}
                setopenPopup = {setopenPopup}
                head="Add Staff"
                >  
                <AssignAsset/>
                </Popup>
                   </div>
          
        
    );
};
export default EmployeeEdit;