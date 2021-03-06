import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from "../Pages/Dashboard/Dashboard";
import Employees from "../Pages/Employees/Employees";
import EmployeeViewInfo from '../Pages/Employees/EmployeeViewInfo';
import EmployeeEdit from '../Pages/Employees/EmployeeEdit';
import EmployeeAdd from '../Pages/Employees/EmployeeAdd';
const SideBar = ()=>{
    return(
        <div className={styles.sideBar}>
            <Router> 
         
               <div className={styles.sideBarLinks}>                
                    <div className={styles.profile}>
                    <div className={styles.pics}></div> 
                    <span>Admin</span>
                    </div>
                    <ul>
                        <li>
                      <Link to="">Dashboard</Link> 
                        </li>
                        <li>
                      <Link to="/employees">Employees</Link>
                        </li>
                        <li>
                        <Link to="/employeeAdd">Performance</Link>
                        </li>
                        <li>
                        <Link to="/employeeView">Management</Link>
                        </li>
                        <li>
                        <Link to="/employeeEdit">Department</Link>
                        </li>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Recruitment</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
                <div className={styles.main}> 
               
                     <Switch>
                        <Route  path='' exact component={EmployeeEdit}/>
                        <Route  path='employees' exact component={Employees}/>
                        <Route  path='/employeeAdd' exact component={EmployeeAdd}/>
                        <Route  path='/employeeEdit' exact component={EmployeeEdit}/>
                        <Route  path='/employeeView' exact component={EmployeeViewInfo}/>
                    </Switch>
                 </div> 
            </Router>   
               
        </div>
    );
};
export default SideBar;