import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './Employees.module.scss'; 
import Header from '../../Header';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Chart from '../../Recharts';
import {useParams} from 'react-router';
import Qualification from './qualification';
import Emergency from './emergence';
const one = require('../../../assets/1.jpg');
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';

const EmployeeViewInfo = () =>{
    const { id } = useParams<Record<string, string | undefined>>()

    const [userData, setuserData] = useState([]);
    const [showQ, setshowQ] = useState(false);
    const [showEmerg, setshowEmerg] = useState(false);
    const [chartData, setchartData] = useState([]);
    const [adminData, setadminData]= useState([]);

    const endPoint = "https://hrportalserver.herokuapp.com/";

    useEffect(()=>{
        Axios.get(`${endPoint}admin`, {
            headers: { 
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{ 
            // console.log(response.data)
            setadminData(response.data);              
        });
        Axios.get(`${endPoint}chartData/user/${id}`).then((response) => {
            setchartData(response.data);
            console.log(response.data);
        });

        Axios.get(`${endPoint}api/employee/${id}`).then((response) => {
            setuserData(response.data);
        });
    }, []);

    const showQualiifation= ()=>{setshowEmerg(false); setshowQ(true);}
    const showEmergency= ()=>{setshowEmerg(true); setshowQ(false);}
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
                    <Header tag="View Info"/>
                </div>
                <div className={styles.content}>
                   <div className={styles.info}>
                       {userData.map((userDetail)=>{
                        return <div key={userDetail.StaffID}>

                            <div className={styles.picture}>
                                <div className={styles.dp}> 
                                <img src={userDetail.Passport}/>
                                </div> 
                                <div className={styles.dpinfo}> 
                                    
                                        <div><span>{userDetail.FirstName+ " "}{userDetail.MiddleName}</span></div>
                                        <div><span>{userDetail.JobRole}</span></div>
                                        <div><span>{userDetail.MobileNumber}</span></div>
                                    
                                </div> 
                            </div>
                            <div className={styles.details}> 
                            <h3 style={{fontWeight:"bolder"}}>Basic Information</h3>
                            <h5>Employee's ID: {userDetail.StaffID}</h5>
                            <h5>Name: {userDetail.FirstName + " "} {userDetail.MiddleName}</h5>
                            <h5>Gender: {userDetail.Gender}</h5>
                            <h5>Date of Birth: {userDetail.DateOfBirth}</h5>
                            <h5>Mobile: {userDetail.MobileNumber}</h5>
                            <h5>CUG: {userDetail.CUGNumber} </h5>
                            <h5>Official Email:  {userDetail.OfficialEmail}</h5>
                            </div>
                       </div> })}
                   </div>
                   
                   <div className={styles.performanceChart}>
                       <div className={styles.performanceSummary}>
                        <div><span style={{ fontSize: "14px", marginTop: '20px', marginLeft: '20px', fontWeight:"bolder"}}>Performance Summary For The Year</span></div>
                         <div className={styles.forChart}>
                            <div className={styles.chart}>
                            <Chart 
                            width={800} 
                            height={300}
                            value ={chartData}
                            xKey = 'quarter' 
                            yKey = 'staff'
                            zKey = 'hr'
                            fKey = 'overall'
                            />
                            </div>  
                            <div className={styles.buttons}>
                                <div className={styles.button}>
                                    <div>
                                        <Button size="small" onClick={showEmergency} variant="contained" fullWidth style={{ marginBottom: '10px', backgroundColor: "#019549", color: "white", textTransform: "none" }}>
                                            Emergency Contact
                                        </Button>
                                    </div> 
                                    <div>
                                        <Button size="small" onClick={showQualiifation} variant="contained" fullWidth style={{ backgroundColor: "#f8c333", color: "white" , textTransform:"none"}  }>
                                            Qualification
                                        </Button>
                                    </div>
                                </div>    
                            </div>
                         </div>
                         <div className={styles.qlf}>
                             {
                                (showQ) ?
                                <Qualification/>
                                :
                                (showEmerg) ?
                                <Emergency/>
                                :
                                null
                             } 
                         </div>
                       </div>
                       
                   </div>
                </div>
            </div>
            </div>
            </div>
            })}
            </div>
    );
};
export default EmployeeViewInfo;