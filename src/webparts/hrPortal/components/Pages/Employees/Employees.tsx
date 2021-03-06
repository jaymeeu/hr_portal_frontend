import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './Employees.module.scss';
import Header from '../../Header';
import Axios from 'axios';
import EmployeeTable from './EmployeeTable';
import EmployeeAdd from "./EmployeeAdd";
import Popup from "../../Popup";
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import {useHistory}  from 'react-router-dom';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Employees = () =>{

    const endPoint = "https://hrportalserver.herokuapp.com/";

    const history = useHistory();
      
    const [usersData, setusersData] = useState([]);
    const [usersDataComplete, setusersDataComplete] = useState([]);
    const [openPopup, setopenPopup] = useState(false);
    const [adminData, setadminData] = useState([]);
    const [showComplete, setshowComplete] = useState(false);

    useEffect(()=>{
        Axios.get(`${endPoint}api/employeesComplete`).then((response) => {
            setusersDataComplete(response.data);   
        });
        Axios.get(`${endPoint}api/employees`).then((response) => {
            setusersData(response.data);
        });

        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{ 
            
            setadminData(response.data);              
        });
    }, []);

    const showComplet = () => {setshowComplete(!showComplete)}

    //delete user by StaffID
    const deleteUser =(StaffID)=>{
        return Axios.delete(`${endPoint}api/delete/employee/${StaffID}`);
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
            
                <div className={styles.search}>
                    <Header tag="List of Staff"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.tableH}>
                    <div><h4 style={{fontWeight:'bolder', marginBottom:'10px'}}>List of Staff</h4></div>
                    <div style={{ fontSize: '10px', marginBottom:'10px'}}>
                       <div style ={{float:'left'}}> 
                        <Button onClick={()=>setopenPopup(true)}  size="small" variant="contained" style={{ marginRight: '10px', backgroundColor: "#572594", color: "white", textTransform:"none"}}>
                            Add staff
                        </Button>
                        <Button onClick={showComplet} size="small" variant="contained" style={{ backgroundColor: "#f8c333", color: "white" , textTransform:"none"}}>
                          {showComplete ? "Show All" : "Staff with complete profile"}  
                        </Button>
                        </div>
                        <div style ={{float:'right'}}>
                        
                        
                        </div>
                    </div>
                    </div>
                    <div className={styles.staffTable}> 

                        { //material   datatable
                        !showComplete ? 
                            <EmployeeTable
                                //table data
                                 data={usersData}
                               // icons = {tableIcons}
                                actions={[
                                    {
                                        icon: VisibilityIcon,
                                        tooltip: 'view User',
                                        onClick: (event, rowData) => {
                                            event.preventDefault(); 
                                            history.push("/view/"+rowData.StaffID); 
                                        } 
                                    },
                                    {
                                        icon: EditIcon ,
                                        tooltip: 'edit User',
                                        onClick: (event, rowData) => {
                                            event.preventDefault();
                                            history.push("/edit/"+rowData.StaffID);
                                        }
                                    },
                                    {
                                        icon: DeleteForeverIcon,
                                        tooltip: 'delete User',
                                        onClick: (event, rowData) =>{
                                            event.preventDefault();
                                            Swal.fire({ 
                                                title: 'Are you sure?',
                                                text: "Once deleted, you woundn't be able to recover!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!',
                                                allowOutsideClick: false
                                              })
                                              .then((result) => {
                                                if (result.value) {
                                                    deleteUser(rowData.StaffID);
                                                  Swal.fire({
                                                    title: 'Deleted',
                                                    text: "Employee deleted!", 
                                                    icon: "success",
                                                    timer: 1500,
                                                  });
                                                } 
                                              });
                                            
                                        }
                                        
                                    },
                                   
                                ]}
                            />
                            :
                            <EmployeeTable
                                //table data
                                    data={usersDataComplete}

                                // icons = {tableIcons}
                                actions={[
                                    {
                                        icon: 'visibility',
                                        tooltip: 'view User',
                                        onClick: (event, rowData) => {
                                            history.push("/view/"+rowData.StaffID); 
                                        } 
                                    },
                                    {
                                        icon: 'edit' ,
                                        tooltip: 'edit User',
                                        onClick: (event, rowData) => {
                                            history.push("/edit/"+rowData.StaffID);
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'delete User',
                                        onClick: (event, rowData) =>{
                                            
                                            Swal.fire({ 
                                                title: 'Are you sure?',
                                                text: "Once deleted, you woundn't be able to recover!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!',
                                                allowOutsideClick: false
                                                })
                                                .then((result) => {
                                                if (result.value) {
                                                    deleteUser(rowData.StaffID);
                                                    Swal.fire({
                                                    title: 'Deleted',
                                                    text: "Employee deleted!", 
                                                    icon: "success",
                                                    timer: 1500,
                                                    });
                                                } 
                                                });
                                            
                                        }
                                        
                                    },
                                    
                                ]}
                            />
                                
                        }
                    </div>
            
                </div>
                <Popup 
                openPopup={openPopup}
                setopenPopup = {setopenPopup}
                head="Add Staff"
                > 
                <EmployeeAdd/>
                </Popup>
            </div>
        </div>
        </div>
            })}
        </div>
       
    );

};

export default Employees; 