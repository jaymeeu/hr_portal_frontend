
import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from '../Employees/Employees.module.scss'; 
import Header from '../../Header';
import Axios from 'axios';
import swal from 'sweetalert';
import Input from '../../controls/Input';
import { Button, Grid } from '@material-ui/core';
import {useParams} from 'react-router';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';

const SectAEdit = () =>{
    const endPoint = "https://hrportalserver.herokuapp.com/";
    const { sn } = useParams<Record<string, string | undefined>>()
    const [adminData, setadminData]= useState([]);

    useEffect(()=>{
        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{
            setadminData(response.data);
        });

        Axios.get(`${endPoint}sectA/${sn}`).then((response) => {
            setsectA(response.data);
            setTitle(response.data[0].Title);
            setDescription(response.data[0].Description)
        });
    }, []);

const [sectA, setsectA] = useState([]);
const [Title, setTitle] = useState('');
const [Description, setDescription] = useState('');

   
   const updateSect = (e) => {
    Axios.put(`${endPoint}update/sectA`,{
    sn: sn,
    Title: Title,
    Description: Description
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
                    <Header tag="Section A Edit"/>
                </div>
                <div className={styles.content}>
                
                {sectA.map((val)=>{
                return <div key={val.SN} style={{margin:'0 auto', width: '50%'}}>
                    
                        <form onSubmit={updateSect}>    
                            <Grid container>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Title</label>
                                    <Input style={{marginBottom: '30px'}}
                                        name="title"
                                        label="Title"
                                        defaultValue={val.Title}
                                        required
                                        fullWidth
                                        onChange={(e) => { setTitle(e.target.value); }}
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    style={{ margin: '0 0 20px 0' }}>
                                    <label>Description</label>
                                    <Input style={{marginBottom: '30px'}}
                                        name="description"
                                        label="Description"
                                        defaultValue={val.Description}
                                        required
                                        fullWidth
                                        onChange={(e) => { setDescription(e.target.value); }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size="small"
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

export default SectAEdit; 