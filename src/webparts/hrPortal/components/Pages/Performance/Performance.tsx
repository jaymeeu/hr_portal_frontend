import * as React from 'react';
import styles from './Performance.module.scss'; 
import Header from '../../Header';
import {useState} from 'react';
import Input from '../../controls/Input';
import { Button, Grid } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';
import Popup from "../../Popup";
import StartApraisal from '../Performance/StartAppraisal';
import { useEffect } from 'react';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';


const Performance = () =>{
   const [Title, setTitle] = useState('');
   const [Description, setDescription] = useState('');
   const [Targets, setTargets]= useState('');
   const [Perspectives, setPerspectives] =useState('');
   const [Objectives, setObjectives] = useState('');
   const [Measures, setMeasures] = useState('');
   const [OpenStartAppraisal, setOpenStartAppraisal] = useState(false)
    const [DeptList, setDeptList] = useState([]);
    const [SelectedDept, setSelectedDept] = useState([]);
    const [adminData, setadminData]= useState([]);

    const endPoint = "https://hrportalserver.herokuapp.com/";

   useEffect (()=>{
    Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{
            setadminData(response.data);
        });

    Axios.get(`${endPoint}api/departments`).then((response) => {
       let departmentList =  response.data.map((d)=>{
           return{
               select: false,
               sn: d.sn,
               departmentName: d.departmentName,
           }
       })
        setDeptList(departmentList);
    });
    }, []);

   const Upload = (e) =>{
    Axios.post(`${endPoint}api/Appraisal/SectionA/Upload`, {
        title: Title,
        description: Description, 
    });
    e.preventDefault()
    swal({
        title: "Uploaded!",
        text: "Question Added",
        icon: "success",
        timer: 2000,
    });
        setTitle("");
        setDescription("")
   }

   const UploadSectionB = (e) =>{
    Axios.post(`${endPoint}api/Appraisal/SectionB/Upload`, {
        measures: Measures,
        perspectives: Perspectives, 
        objectives: Objectives,
        targets: Targets,
        department: SelectedDept,
    });
    e.preventDefault() 
    swal({
        title: "Uploaded!",
        text: "Section B question Added",
        icon: "success",
        timer: 2000,
        
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
                    <Header tag="Key Performance Indicator"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.body}>   
                        <div className={styles.btn}>
                            <div className={styles.btnApraisal}>
                                <Button onClick={()=>setOpenStartAppraisal(true)}  size="small" fullWidth variant="contained" style={{ marginRight: '10px', backgroundColor: "#028749", color: "white", textTransform:"none"}}>
                                    Start Apraisal
                                </Button>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.sectionA}>
                                <div className={styles.sectionTitle}>
                                    <h3 style={{marginBottom:"15px"}}>SECTION A</h3>
                                </div>
                                <form onSubmit={Upload}>    
                                    <Grid container>
                                        <Grid item xs={12}
                                            style={{ margin: '0 0 20px 0' }}>
                                            <label>Title</label>
                                            <Input
                                                name="title"
                                                label="Title"
                                                required
                                                fullWidth
                                                onChange={(e) => { setTitle(e.target.value); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}
                                            style={{ margin: '0 0 20px 0' }}>
                                            <label>Description</label>
                                            <Input
                                                name="description"
                                                label="Description"
                                                required
                                                fullWidth
                                                onChange={(e) => { setDescription(e.target.value); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button size="medium"
                                                fullWidth
                                                type='submit'
                                                style={{ background: '#f8c333', color: 'white', textTransform: "none" }}>
                                                Upload
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                           
                        </div>
                        <div className={styles.question}>
                            <div className={styles.sectionTitle}>
                                <h3 style={{marginBottom:"15px"}}>Add Section B Question</h3>
                            </div>
                                <form onSubmit={UploadSectionB}>                                       
                                    <Grid container xs={6} style={{float: 'left', padding: '0 15px 0 0', boxSizing:'border-box'}}>
                                        <Grid item xs={12}
                                            style={{ margin: '0 20px 20px 0' }}>
                                            <label>Perspective</label>
                                            <Input
                                                name="perspective"
                                                label="Perspective"
                                                required
                                                fullWidth
                                                onChange={(e) => { setPerspectives(e.target.value); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}
                                            style={{ margin: '0 20px 20px 0' }}>
                                            <label>Measures</label>
                                            <Input
                                                name="measures"
                                                label="Measures"
                                                required
                                                fullWidth
                                                onChange={(e) => { setMeasures(e.target.value); }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={6} style={{float: 'left', padding: '0 0 15px 0', boxSizing:'border-box'}}>
                                        <Grid item xs={12}
                                            style={{ margin: '0 20px 20px 0' }}>
                                            <label>Objectives</label>
                                            <Input
                                                name="objectives"
                                                label="Objectives"
                                                required
                                                fullWidth
                                                onChange={(e) => { setObjectives(e.target.value); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}
                                            style={{ margin: '0 20px 20px 0' }}>
                                            <label>Targets</label>
                                            <Input
                                                name="targets"
                                                label="Targets"
                                                required
                                                fullWidth
                                                onChange={(e) => { setTargets(e.target.value); }}
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                    <div>
                                        {DeptList.map((depts)=>{
                                            return <div key={depts.sn} style={{width:'auto', marginBottom: '20px'}}> 
                                                <div style={{ float: 'left', marginLeft: '20px'}}>
                                                    <input 
                                                        style={{fontSize: '20px', color: 'red'}}
                                                        type="checkbox" 
                                                        checked={depts.select}
                                                        onChange= { e => { 
                                                                let checked = e.target.checked;
                                                                setSelectedDept(
                                                                    DeptList.map( data => {
                                                                        if (depts.sn === data.sn){
                                                                            data.select = checked;
                                                                        } 
                                                                        if (data.select){
                                                                            let result = data.departmentName;
                                                                        return result;
                                                                        }
                                                                    })
                                                                )
                                                            }                                    
                                                        }></input> 
                                                    <span style={{fontSize: '20px', marginLeft: '5px', color: 'blue'}}> {depts.departmentName} </span>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <Grid item xs={12} style={{ margin: '20px 0 0 0' }}>
                                        <Button size="medium"
                                            fullWidth
                                            type='submit'
                                            style={{ background: '#f8c333', color: 'white', textTransform: "none" }}>
                                            Upload
                                        </Button>
                                    </Grid>
                                </form>
                            
                        </div>
                    </div>
                </div>

                <Popup 
                openPopup={OpenStartAppraisal}
                setopenPopup = {setOpenStartAppraisal}
                head="Start Appraisal" 
                > 
                <StartApraisal/>
                </Popup>

            </div>
        </div>
        </div>
            })}
        </div>
       
    );

};
export default Performance;