import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './Department.module.scss'; 
import Header from '../../Header';
import Axios from 'axios';
import MaterialTable from "material-table";
import LocationAdd from "./LocationAdd";
import DepartmentAdd from "./DepartmentAdd";
import JobAdd from "./JobAdd";
import Popup from "../../Popup";
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import {useHistory}  from 'react-router-dom';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';


import { forwardRef } from 'react';
 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
 
const tableIcons = {
    Add: forwardRef<SVGSVGElement, {}>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef<SVGSVGElement, {}>((props, ref) => <Check {...props} ref={ref} />),
    Clear:  forwardRef<SVGSVGElement, {}>((props, ref) => <Clear {...props} ref={ref} />),
    Delete:  forwardRef<SVGSVGElement, {}>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel:  forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit:  forwardRef<SVGSVGElement, {}>((props, ref) => <Edit {...props} ref={ref} />),
    Export:  forwardRef<SVGSVGElement, {}>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter:  forwardRef<SVGSVGElement, {}>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage:  forwardRef<SVGSVGElement, {}>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage:  forwardRef<SVGSVGElement, {}>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage:  forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage:  forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch:  forwardRef<SVGSVGElement, {}>((props, ref) => <Clear {...props} ref={ref} />),
    Search:  forwardRef<SVGSVGElement, {}>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow:  forwardRef<SVGSVGElement, {}>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck:  forwardRef<SVGSVGElement, {}>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn:  forwardRef<SVGSVGElement, {}>((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const endPoint = "https://hrportalserver.herokuapp.com/";

const Department = () =>{
    const history = useHistory();
    
    const [adminData, setadminData]= useState([]);
    const [Dept, setDept] = useState([]);
    const [openAddJob, setopenAddJob] = useState(false);
    const [openAddLocation, setopenAddLocation] = useState(false);
    const [openAddDepartment, setopenAddDepartment] = useState(false);
    useEffect(()=>{
        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{
            setadminData(response.data);
        });

        Axios.get(`${endPoint}api/departments`).then((response) => {
            setDept(response.data);
        });
    }, []);

    //delete user by StaffID
    const deleteDept =(sn)=>{
       return Axios.delete(`${endPoint}api/delete/department/${sn}`);
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
                    <Header tag="List of Departments"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.tableH}>
                    <div><h4 style={{fontWeight:'bolder', marginBottom:'10px'}}>List of Departments</h4></div>
                    <div style={{ fontSize: '10px', marginBottom:'10px'}}>
                       <div style ={{float:'left'}}> 
                        <Button onClick={()=>setopenAddLocation(true)}  size="small" variant="contained" style={{ marginRight: '10px', backgroundColor: "#572594", color: "white", textTransform:"none"}}>
                            Add Location
                        </Button>
                        <Button onClick={()=>setopenAddDepartment(true)} size="small" variant="contained" style={{ marginRight: '10px', backgroundColor: "#f8c333", color: "white" , textTransform:"none"}}>
                           Add Department
                        </Button>
                        <Button onClick={()=>setopenAddJob(true)} size="small" variant="contained" style={{ backgroundColor: "#028749", color: "white" , textTransform:"none"}}>
                           Add Job Role
                        </Button>
                        </div>
                        <div style ={{float:'right'}}>
                        </div>
                    </div>
                    </div>
                    <div className={styles.staffTable}> 

                        { 
                            //material   datatable
                            <MaterialTable
                            icons={tableIcons}
                                title="List of Department"
                                columns={[
                                    { title: 'SN', field: 'sn', cellStyle:{
                                        width: '20px', color: '#f41'
                                    },
                                    headerStyle:{ width:'20px', color:'#afe'}
                                },
                                    { title: 'Department', field: 'departmentName' },
                                    { title: 'Manager', field: 'managerName'},
                                    { title: 'Manager CUG', field: 'managerCUG' },
                                    { title: 'Location', field: 'location'},
                                    { title: 'Num of Staff', field: 'departmentCount'},
                                    
                                ]}
                                data={Dept}
                                actions={[
                                    {
                                        icon: EditIcon ,
                                        tooltip: 'Edit Department',
                                        onClick: (event, rowData) => {
                                            history.push("/edit/depart/"+rowData.sn); 
                                        } 
                                       
                                    },
                                    {
                                        icon: DeleteForeverIcon,
                                        tooltip: 'Delete department',
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
                                                    deleteDept(rowData.sn);
                                                  Swal.fire({
                                                    title: 'Deleted',
                                                    text: "Department deleted!", 
                                                    icon: "success",
                                                    timer: 1500,
                                                  });
                                                } 
                                              });
                                            
                                             
                                        }
                                        
                                    },
                                   
                                ]}
                                options={{
                                    actionsColumnIndex: -1,
                                    search:true,
                                    sorting:true,
                                    exportButton: true,
                                }} 
                                />
                    
                        }
                    </div>
            
                </div>
                <Popup 
                openPopup={openAddLocation}
                setopenPopup = {setopenAddLocation}
                head="Add Location"
                > 
                <LocationAdd/>
                </Popup>

                <Popup 
                openPopup={openAddDepartment}
                setopenPopup = {setopenAddDepartment}
                head="Add Department"
                > 
                <DepartmentAdd/>
                </Popup>


                <Popup 
                openPopup={openAddJob}
                setopenPopup = {setopenAddJob}
                head="Add Job Role"
                > 
                <JobAdd/>
                </Popup>
            </div>
            </div>
            </div>
            })}
            </div>
       
    );

};

export default Department; 