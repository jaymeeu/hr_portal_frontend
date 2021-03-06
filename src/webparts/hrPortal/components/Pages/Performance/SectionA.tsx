
import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from '../Employees/Employees.module.scss'; 
import Header from '../../Header';
import Axios from 'axios';
import MaterialTable from "material-table";
import Swal from 'sweetalert2';
import {useHistory}  from 'react-router-dom';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


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

const SectionA = () =>{
    const history = useHistory();

    const [SectionA, setSectionA] = useState([]);
    const [adminData, setadminData]= useState([]);
    
    const endPoint = "https://hrportalserver.herokuapp.com/";

    useEffect(()=>{
        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{
            setadminData(response.data);
        });
        Axios.get(`${endPoint}sectionA`).then((response) => {
            setSectionA(response.data);
        });
    }, []);

     //delete question in sectionA 
     const deleteSectionA =(sn)=>{
        return Axios.delete(`${endPoint}delete/sectionA/${sn}`);
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
                    <Header tag="Section A- Key Performance Indicator"/>
                </div>
                <div className={styles.content}>
                      {
                            //material   datatable
                            <MaterialTable
                                title="Section A"
                                icons={tableIcons}
                                columns={[
                                    { title: 'SN', field: 'SN' },
                                    { title: 'Title', field: 'Title' },
                                    { title: 'Description', field: 'Description'},
                                ]}
                                data={SectionA}
                                actions={[
                                    {
                                        icon: EditIcon,
                                        tooltip: 'edit',
                                        onClick: (event, rowData) => {
                                            history.push("/edit/sectA/"+rowData.SN); 
                                        } 
                                    },
                                    {   icon: DeleteForeverIcon,
                                        tooltip: 'delete',
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
                                                    deleteSectionA(rowData.SN)
                                                  Swal.fire({
                                                    title: 'Deleted',
                                                    text: "Question has been deleted!", 
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
            </div>
            </div>
            })}
        </div>
            
       
    );

};

export default SectionA; 