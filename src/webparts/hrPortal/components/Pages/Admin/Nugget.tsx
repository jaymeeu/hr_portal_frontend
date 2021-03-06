import * as React from 'react';
import {useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import Input from '../../controls/Input';
import Axios from 'axios';
import swal from 'sweetalert';

const endPoint = "https://hrportalserver.herokuapp.com/";

const Nugget = () =>{
    const [heading, setHeading] = useState('');
    const [post, setPost] = useState('');
   
const Submit = (e) =>{
    e.preventDefault();
        Axios.put(`${endPoint}nugget`, {
            heading : heading,
            post : post
        })
        .then((response)=>{
            if(response.data){
                swal({
                    title: "Posted!",
                    text: "Nugget Posted",
                    icon: "success",
                    timer: 2000,
                });
            }
        });
    };

    return(       
            <form onSubmit={Submit}>
                    <div>
                        <Grid container>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Headline</span>
                                <Input
                                    name="heading"
                                    fullWidth
                                    required
                                    onChange={(e) => { setHeading(e.target.value); }}
                                />
                            </Grid>
                            <Grid item xs={5}
                                style={{ margin: '0 0 20px 20px', fontSize: '14px', fontWeight: 'bolder'}}>
                                <span>Post</span>
                                <Input
                                    name="content"
                                    fullWidth
                                    required
                                    onChange={(e) => { setPost(e.target.value); }}
                                />
                            </Grid>
                            
                            
                            
                            <Grid item xs={5}
                                    style={{ margin: '0 0 20px 20px' }}>
                                
                                    <Button
                                        fullWidth
                                        type='submit'
                                        style={{ background: '#028749', color: 'white', textTransform:'none' }}>
                                        Post Nugget
                                </Button>
                                
                            </Grid>
                            

                        </Grid>

                    </div>
                
            </form> 
    );
};
export default Nugget;