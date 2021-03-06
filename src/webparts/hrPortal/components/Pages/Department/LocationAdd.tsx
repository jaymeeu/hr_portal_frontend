import { Button, Grid} from '@material-ui/core';
import * as React from 'react';
import styles from './Department.module.scss'; 
import Select from '../../controls/Select';
import TextArea from '../../controls/TextArea';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import makeStyles from '@material-ui/core/styles/makeStyles';

const LocationAdd = () =>{

    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '100%',
                margin: theme.spacing(1)
            }
        }
    }))

    const endPoint = "https://hrportalserver.herokuapp.com/";

    const classes = useStyles();

    const [location, setlocation] = useState('');
    const [address, setaddress] = useState('');
    const [NigeriaStates, setNigeriaStates] = useState([]);

    useEffect(()=>{
        
            Axios.get("https://locationsng-api.herokuapp.com/api/v1/cities").then((response)=>{
            setNigeriaStates(response.data); 
            console.log(response.data);
            });
      
    },[]);


    const Submit = (e) =>{
        Axios.post(`${endPoint}api/addlocation`, {
            location: location,
            address: address,
        });
        e.preventDefault()
        swal({
            title: "Saved!",
            text: "Location Added",
            icon: "success",
            timer: 2000,
        });
        
     };
  
    return(
        <div className={styles.addEmployeeForm}>

            <div className={styles.addForm}>

                <form onSubmit={Submit} className={classes.root} autoComplete="off">
                     <Grid container>
                                 <Grid item xs={12}
                                  style={{margin:'0 0 20px 0'}}>
                                     <Select style={{ width: '100%'}}
                                         name="location"
                                         label="Location"
                                         required
                                         onChange={(e)=>{setlocation(e.target.value);}}
                                         options={NigeriaStates}
                                     />
                                 </Grid>
                                 <Grid item xs={12} style={{margin:'0 0 20px 0'}}>
                                     <TextArea
                                         name="address"
                                         placeholder="Address"
                                         required
                                         onChange={(e)=>{setaddress(e.target.value);}}
                                     />
                                 </Grid>
                                 
                                <Grid item xs={12}>
                                    <Button 
                                    fullWidth 
                                    type='submit' 
                                    style={{background: '#f8c333', color:'white'}}>
                                    Add Location
                                    </Button>
                                </Grid>
                     </Grid>
                </form>

            </div>

        </div>
    );

};
export default LocationAdd;