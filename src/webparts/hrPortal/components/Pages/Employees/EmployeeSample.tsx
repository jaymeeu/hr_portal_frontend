
// import styles from './Employees.module.scss'; 
// import Header from '../../Header';
// import { Button, Grid } from '@material-ui/core';
// import Input from '../../controls/Input';
// import {useState, useEffect} from 'react';
// import Axios from 'axios';

// const EmployeeSample = () =>{
// const [userList, setuserList] = useState([]);
// const[firstname, setfirstname] = useState('');
// const[address, setaddress] = useState('');
// const[newAddress, setnewAddress] = useState('');
//    //get from api
//     useEffect(()=>{
//         Axios.get("http://localhost:3001/api/get").then((response) => {
//             setuserList(response.data);
//         });
//     }, []);

//     //post to API
//     const Submit = () =>{
//         Axios.post("http://localhost:3001/api/insert", {
//             firstname: firstname, 
//             address:address,
//         });
//         setuserList([
//             ...userList, 
//             {firstname: firstname, address: address},
//         ]);
//      };

//     //delete from api
//     const deleteUser =(name)=>{
//         Axios.delete(`http://localhost:3001/api/delete/${name}`);
//     };

//     //update data
//     const updateUser = (name) =>{
//         Axios.put("http://localhost:3001/api/update", {
//             firstname: name, 
//             address:newAddress,
//         });
//         setnewAddress("");
//     };

//     return(
//         <div></div>

//         // <div className={styles.container}> 
            
//         //         <div className={styles.search}>
//         //             <Header/>
//         //         </div>
//         //         <div className={styles.content}>
//         //            <div className={styles.info}>
//         //                <div className={styles.picture}>
//         //                    <div className={styles.dp}> dp here</div>    
//         //                </div>
//         //            </div>
//         //            <div className={styles.forEditForm}>
//         //                <div>
//         //                     <form>
//         //                             <Grid container>
//         //                                         <Grid item xs={5} style={{margin:'0 20px 20px 0'}}>
//         //                                             <label htmlFor="firstname">First Name</label>
//         //                                             <Input
//         //                                                 color="primary"
//         //                                                 name="firstname"
//         //                                                 placeholder="10/04/03"
//         //                                                 required
//         //                                                 onChange={(e)=>{setfirstname(e.target.value);}}
//         //                                             />
//         //                                         </Grid>
//         //                                         <Grid item xs={5} style={{margin:'0 0 20px 20px'}}>
//         //                                             <label htmlFor="address">Address</label>
//         //                                             <Input
//         //                                                 color="primary"
//         //                                                 name="firstname"
//         //                                                 placeholder="rasaq"
//         //                                                 required
//         //                                                 onChange={(e)=>{setaddress(e.target.value);}}
//         //                                             />
//         //                                         </Grid>
//         //                                        <Grid item xs><Button onClick={Submit}>Submit</Button></Grid>
//         //                             </Grid>
//         //                             {userList.map((val)=>{
//         //                                 return <div className={styles.cards}> 
//         //                                     <h1> {val.firstname}</h1> 
//         //                                     <p>{val.address}</p>
//         //                                     <button onClick={()=>{deleteUser(val.firstname)}}>delete</button>
//         //                                     <input type="text" onChange={(e)=>{setnewAddress(e.target.value)}}></input>
//         //                                     <button onClick={()=>{updateUser(val.firstname)}}>update</button>
//         //                                 </div>
//         //                             })}
//         //                     </form>
//         //                 </div>
                        
//         //            </div>
//         //         </div>
//         //     </div>
      
//     );
// }
// export default EmployeeSample;
