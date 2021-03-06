
import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from '../Employees/Employees.module.scss'; 
import Header from '../../Header';
import Axios from 'axios';
import swal from 'sweetalert';
import Input from '../../controls/Input';
import { Button, Grid } from '@material-ui/core';
import {useParams} from 'react-router';
import SelectDept from '../../controls/SelectDepart';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';

const SectBEdit = () =>{
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const [Targets, setTargets]= useState('');
   const [Perspectives, setPerspectives] =useState('');
   const [Objectives, setObjectives] = useState('');
   const [Measures, setMeasures] = useState('');
   const [DepartmentAPI, setDepartmentAPI] = useState([]);
   const [Department, setDepartment] = useState('');
   const [adminData, setadminData]= useState([]);
    const [sectB, setsectB] = useState([]);

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

        Axios.get(`${endPoint}sectB/${sn}`).then((response) => {
            setsectB(response.data);
            setMeasures(response.data[0].measures);
            setObjectives(response.data[0].objectives);
            setTargets(response.data[0].targets);
            setPerspectives(response.data[0].perspectives);
            setDepartment(response.data[0].department);
        });

        Axios.get(`${endPoint}api/departments`).then((response)=>{
            setDepartmentAPI(response.data);
            });
    }, []);

 
    const updateSect = (e) => {
        Axios.put(`${endPoint}update/sectB`,{
        sn: sn,
        Targets: Targets,
        Perspectives: Perspectives,
        Objectives: Objectives,
        Measures: Measures,
        Department: Department

        });
        e.preventDefault()
        swal({
            title: "Saved!",
            text: "Question Updated",
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
                    <Header tag="Edit Section B"/>
                </div>
                <div className={styles.content}>
               {sectB.map((val)=>{
                   return <div key={val.sn}>
                        <form onSubmit={updateSect} className={classes.root}>  
                                                                 
                            <Grid container xs={6} style={{float:'left', padding:'0 15px 0 0', boxSizing: 'border-box'}}>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Perspective</label>
                                    <Input
                                        name="perspective"
                                        label="Perspective"
                                        defaultValue={val.perspectives}
                                        required
                                        fullWidth
                                        onChange={(e) => { setPerspectives(e.target.value); }}
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Measures</label>
                                    <Input
                                        name="measures"
                                        label="Measures"
                                        defaultValue={val.measures}
                                        required
                                        fullWidth
                                        onChange={(e) => { setMeasures(e.target.value); }}
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Objectives</label>
                                    <Input
                                        name="objectives"
                                        label="Objectives"
                                        defaultValue={val.objectives}
                                        required
                                        fullWidth
                                        onChange={(e) => { setObjectives(e.target.value); }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container xs={6} style={{float:'left', padding:'0 0 0 15px', boxSizing: 'border-box'}}>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Targets</label>
                                    <Input
                                        name="targets"
                                        label="Targets"
                                        defaultValue={val.targets}
                                        required
                                        fullWidth
                                        onChange={(e) => { setTargets(e.target.value); }}
                                    />
                                </Grid>
                                <Grid item xs={12}
                                   style={{ margin: '0 0 20px 0' }}>
                                    <label>Department</label>
                                    <SelectDept style={{ width: '100%'}}
                                    name="department"
                                    label="Department"
                                    required
                                    defaultValue={val.department}
                                    onChange={(e)=>{setDepartment(e.target.value)}}
                                    options={DepartmentAPI}
                                />
                                </Grid>
                                <Grid item xs={12}
                                 style={{ margin: '20px 0 0 0' }}>
                                    <Button size= "medium"
                                        // height= 30
                                        fullWidth
                                        type='submit'
                                        style={{ background: '#f8c333', color: 'white', textTransform: "none" }}>
                                        Upload
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
            })}
                </div>
    );
};

export default SectBEdit; 