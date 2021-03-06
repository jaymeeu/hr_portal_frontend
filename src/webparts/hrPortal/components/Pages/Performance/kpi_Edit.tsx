
import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from '../Employees/Employees.module.scss'; 
import Header from '../../Header';
import Axios from 'axios';
import swal from 'sweetalert';
import Input from '../../controls/Input';
import { Button, Grid } from '@material-ui/core';
import {useParams} from 'react-router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';

const KPI_Edit = () =>{
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const endPoint = "https://hrportalserver.herokuapp.com/";

    const [adminData, setadminData]= useState([]);
    const [KPI, setKPI] = useState([]);
    const [hrRating, setHrRating] = useState("");
    const [staffRating, setStaffRating] = useState("");

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

        Axios.get(`${endPoint}KPI_Score/${sn}`).then((response) => {
            setKPI(response.data);
        });

       
    }, []);

 
    const rate = (e) => {
        if(!hrRating){
            e.preventDefault();
            swal({
            title: "Note!",
            text: "No Change Made",
            icon: "info",
            timer: 2000,
            }); 
        }
        else{
            e.preventDefault();
            Axios.put(`${endPoint}update/kpi`,{
            hrRating : hrRating,
            staffRating : staffRating,
            sn: sn,
            }).then((response)=>{
                if (response.data){
                    e.preventDefault();
                    swal({
                    title: "Saved!",
                    text: "Question Updated",
                    icon: "success",
                    timer: 2000,
                    }); 
                }
                else{
                    e.preventDefault();
                    swal({
                        title: "Error!",
                        text: "An Error Occur, Server Down",
                        icon: "danger",
                        timer: 2000,
                        });
                }
            })
        }
        
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
               {KPI.map((val)=>{
                   
                   return <div key={val.sn}>
                    <div style={{width:"100%"}}> 
                    <form onSubmit={rate} className={classes.root}>                                       
                        <Grid container>
                            <Grid item xs={5}
                                style={{ margin: '0 20px 20px 0' }}>
                                <label>Staff ID</label>
                                <Input
                                    name="staffID" 
                                    value={val.staffID}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 20px 20px 0' }}>
                                <label>Quarter</label>
                                <Input
                                    name="quarter"
                                    value={val.quarter}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 20px 20px 0' }}>
                                <label>Staff Rating</label>
                                <Input
                                    name="staff"
                                    value={val.staff}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 20px 20px 0' }}>
                                <label>HR Rating</label>
                                <Input
                                    name="hr"
                                    defaultValue={val.hr}
                                    onChange={(e)=>{setHrRating(e.target.value); setStaffRating(val.staff);}}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            
                         <Grid item xs={5}
                         style={{ margin: '0 20px 20px 0' }}>
                            <Button size="small"
                                fullWidth
                                type='submit'
                                style={{ background: '#f8c333', color: 'white', textTransform: "none" }}>
                                Rate Staff
                            </Button>
                        </Grid>   
                            
                        </Grid>
                            
                        
                    </form>
                      </div>
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

export default KPI_Edit; 