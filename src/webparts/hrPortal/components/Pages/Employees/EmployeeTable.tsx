import * as React from 'react';
import styles from './Employees.module.scss'; 
import Axios from 'axios';
import MaterialTable from "material-table";


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

const EmployeeTable = (props) =>{

    const endPoint = "https://hrportalserver.herokuapp.com/";
    
    const {data,actions} = props
    
    
    //delete user by StaffID
    const deleteUser =(StaffID)=>{
        return Axios.delete(`${endPoint}api/delete/employee/${StaffID}`);
    };

    return(
        <div className={styles.sideBar}>
            { //material   datatable
                <MaterialTable
                icons= {tableIcons}
                    title="List of Staff"
                    columns={[
                        { title: 'Staff-ID', field: 'StaffID' },
                        { title: 'Firstname', field: 'FirstName' },
                        { title: 'Middlename', field: 'MiddleName'},
                        { title: 'Lastname', field: 'LastName' },
                        { title: 'Department', field: 'Department'},
                        { title: 'Official Email', field: 'OfficialEmail'},
                        { title: 'CUG Number', field: 'CUGNumber'}, 
                    ]}
                    // table data
                    data={data}
                   
                    // actions buttons
                    actions={actions}
                    options={{
                        actionsColumnIndex: -1,
                        search:true,
                        sorting:true,
                        exportButton: true,
                    }} 
                    />
                }
        </div>
       
    );

};

export default EmployeeTable; 