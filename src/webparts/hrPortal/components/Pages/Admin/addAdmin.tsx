import * as React from 'react';
import {useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import Input from '../../controls/Input';
import Axios from 'axios';
import swal from 'sweetalert';

const addAdmin = () =>{
    const [name, setname] = useState('');
    const [email, setemail]= useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');  
    const [passError, setpassError] = useState('');
    const [passport, setpassport] = useState('');

const endPoint = "https://hrportalserver.herokuapp.com/";

const Submit = (e) =>{
    const formData = new FormData();
    formData.append('passport', passport);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('cpassword', cpassword);
    Axios.post(`${endPoint}api/admin/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((response)=>{
            if(!response.data){
                setpassError("Password did not match")
            }
            else{
                swal({
                    title: "Saved!",
                    text: "New Admin Added",
                    icon: "success",
                    timer: 2000,
                });  
            }
        })
        e.preventDefault(); 
        console.log(passport)
    };

const handleUpload = (e) => {
    setpassport(
        e.target.files[0]
    );
}

    return(
      
            <form onSubmit={Submit}>
                <Grid container>
                    <div>
                        <Grid container>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Name</span>
                                <Input
                                    name="name"
                                    fullWidth
                                    required
                                    onChange={(e) => { setname(e.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Official Email</span>
                                <Input
                                    name="email"
                                    fullWidth
                                    type="email"
                                    required
                                    onChange={(e) => { setemail(e.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Password</span>
                                <Input
                                    name="password"
                                    type="password"
                                    fullWidth
                                    required
                                    onChange={(e) => { setpassword(e.target.value); setpassError(""); }}
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>confirm Password</span>
                                <Input
                                    name="cpassword"
                                    type="password"
                                    fullWidth
                                    required
                                    onChange={(e) => { setcpassword(e.target.value); setpassError("");}}
                                />
                            </Grid>

                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Upload Passport</span>
                                <Input 
                                    
                                    name="passport"
                                    type="file"
                                    id="file"
                                    fullWidth
                                    required
                                    onChange={handleUpload}
                                />
                            </Grid>

                            
                            
                            <Grid item xs={5}
                                    style={{ margin: '0 0 20px 20px' }}>
                                <div style={{color: 'red',marginBottom:'15px', fontSize: '10px'}}>{passError}</div>
                                    <Button
                                        fullWidth
                                        type='submit'
                                        style={{ background: '#028749', color: 'white', textTransform:'none' }}>
                                        Add Admin
                                </Button>
                                
                            </Grid>
                            

                        </Grid>

                    </div>
                </Grid>
            </form> 
    );
};
export default addAdmin;