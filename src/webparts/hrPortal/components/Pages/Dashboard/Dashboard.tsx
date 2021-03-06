import * as React from 'react';
import styles from './Dashboard.module.scss'; 
import  Head from '../../Head/Head';
import Card from '../../Cards/Card';
import Calendar_design from '../../Calendar/Calendar';
import StatCard from '../../StatCard/StatCard';
import StatUser from '../../StatCard/StatUser';
import PeopleIcon from '@material-ui/icons/People';
import Chart from '../../Recharts';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import {Nav} from 'office-ui-fabric-react/lib/Nav';
import { navLinkGroups, navStyles }from '../../layout';
import Loader from 'react-loader-spinner'; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from '../../Header';
import {  useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [adminData, setadminData]= useState([]);
    const [employeeCount, setemployeeCount] = useState([]);
    const [departmentCount, setdepartmentCount] = useState([]); 
    const [chartData, setchartData] = useState([]);
    const [KPICount, setKPICount] = useState([]);
    const [kpiAwait, setkpiAwait] = useState([]);
    const [recentApp, setRecentApp] = useState([]);
    const [loader, setloader] = useState(false);
    const history = useHistory();

    const endPoint = "https://hrportalserver.herokuapp.com/";
    
    useEffect(() => {
        setloader(false);
        // Axios.get("http://localhost:3001/admin", {
        //     headers: {
        //         "x-access-token" : localStorage.getItem("token"),
        //     },
        // })
        // .then((response)=>{
        //     setadminData(response.data);
        // });
        Axios.get(`${endPoint}admin`, {
            headers: {
                "user" : localStorage.getItem("staff"),
            },
        })
        .then((response)=>{ 
            if(response.data.length == 0){
                history.push("/");
            }
            else{
                setadminData(response.data);     
            }
                        
        });
        Axios.get(`${endPoint}recentApp`).then((response) => {
            setRecentApp(response.data);
            
        });
        Axios.get(`${endPoint}employees/count`).then((response)=>{
            setemployeeCount(response.data[0].count);
        });

        Axios.get(`${endPoint}kpiScore/count`).then((response)=>{
            setKPICount(response.data[0].count);
        });

        Axios.get(`${endPoint}awaitHR/count`).then((response)=>{
            setkpiAwait(response.data[0].count);
        });
        
        Axios.get(`${endPoint}chartData`).then((response) => {
            setchartData(response.data);
        });
        Axios.get(`${endPoint}depts/count`).then((response)=>{
            setdepartmentCount(response.data[0].count);
        });
        setloader(true);
    }, []);

    
    return(
        
        <div className={styles.sideBar}>
            { (!loader) ?
                <div className={styles.loader}>  
                    <Loader
                    type="ThreeDots"
                    color="#3e0287"
                    height={100}
                    width={100} 
                />
                </div>

                :

              adminData.map((detail)=>{
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
                    <div className={styles.search}> <Header tag="Dashboard" badge={kpiAwait}/> </div>
                    <div className={styles.head}>
                        <Head adminName={detail.name}/>  
                    </div>

                    <div className={styles.cards}>
                        <div className={styles.cardTitle}>Most Recently Submitted Appraisal</div>
                        <div className={styles.card}>
                            {recentApp.map((val)=>{
                                return <div key={val.sn}> 
                                    <Card userName={val.FirstName} dp={val.Passport}/>
                                </div>;
                            })}
                        </div>
                    </div>
                    
 
                    <div className={styles.base}>
                        {/* <div className={styles.notification}>
                            <div className={styles.tableTitle}>Notification</div>
                            <div className={styles.table}><CustomizedTable/></div>
                        </div> */}
                        <div className={styles.chartDiv}>
                            <div className={styles.chartTitle}>Employee's Chart</div>
                            <div className={styles.chart}> 
                                <Chart 
                                width={950} 
                                height={300}
                                value ={chartData}
                                 xKey = 'departmentName'
                                 yKey = 'departmentCount'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBar}>
                    <div className={styles.insideRightBar}>
                        {/* <div className={styles.top}>
                            <div className={styles.time}>12:00</div>
                            <div className={styles.weather}><WbSunnyIcon/></div>
                        </div> */}
                        <div className={styles.calendar}><Calendar_design/></div>
                        <div className={styles.stat}>
                            <div className={styles.statCards}>
                                <div className={styles.statCard}>
                                    <StatCard 
                                        num={KPICount} 
                                        subtitle='Submitted Appraisal' 
                                        icon={<PeopleIcon style={{fontSize: 40, color: '#fff'}}/>}
                                        />
                                </div>
                                <div className={styles.statCard}>
                                    <StatCard 
                                        num={kpiAwait} 
                                        subtitle='Appraisal Awaiting HR Rating' 
                                        icon={<PeopleIcon style={{fontSize: 40, color: '#fff'}}/>}
                                        />
                                </div>
                            </div>
                            
                            <div className={styles.statNum}>
                                <div className={styles.statUser}>
                                        <StatUser                                    
                                        icon = {<PeopleIcon style={{fontSize: 40}}/>}
                                        number= {employeeCount}
                                        label='Employees'
                                    />
                                 
                                </div>
                                <div className={styles.statUser}>
                                    <StatUser
                                        icon = {<PeopleIcon style={{fontSize: 40}}/>}
                                        number= {departmentCount}
                                        label='Departments'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            

        </div>
        </div>;
            })
        }
        </div>
    );
};
export default Dashboard;