import * as React from 'react';
import { IHrPortalProps } from './IHrPortalProps';
import jQuery from 'jquery';
import './Icons.module.scss';
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import Employees from "../components/Pages/Employees/Employees";
import Admin from "../components/Pages/Admin/Admin"; 
import {HashRouter, Route} from 'react-router-dom';
import {Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

import Landing from '../components/Pages/LandingPage/Landing';
import Login from '../components/Pages/Login/Login';
import EmployeeViewInfo from '../components/Pages/Employees/EmployeeViewInfo';
import EmployeeEdit from '../components/Pages/Employees/EmployeeEdit';
import Performance from '../components/Pages/Performance/Performance';
import Evaluation from '../components/Pages/Performance/Evaluation';
import SectionA from '../components/Pages/Performance/SectionA';
import SectAEdit from '../components/Pages/Performance/SectAEdit';
import SectionB from '../components/Pages/Performance/SectionB';
import SectBEdit from '../components/Pages/Performance/SectBEdit';
import Department from './Pages/Department/Department';
import DepartmentEdit from './Pages/Department/DepartmentEdit';
import KPI_Edit from './Pages/Performance/kpi_Edit';

const stackTokens: IStackTokens = {childrenGap: 40};
export default class HrPortal extends React.Component<IHrPortalProps, {}> {
  
  public render(): React.ReactElement<IHrPortalProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); 
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); 
    jQuery(".CanvasZone").prop("style", "max-width: none");
    
    return (          
                
                  <Stack horizontal tokens={stackTokens}>
                   
                     <HashRouter>
                        <Route  path='/' exact component={Landing}/>
                        <Route  path='/dashboard' exact component={Dashboard}/>
                        {/* <Route  path='/dashboard/:officialEmail' exact component={Dashboard}/> */}
                        <Route  path='/employees' exact component={Employees}/>
                        <Route  path='/performance' exact component={Performance}/>
                        <Route  path='/evaluation' exact component={Evaluation}/>
                        <Route  path='/sectionA' exact component={SectionA}/>
                        <Route  path='/sectionB' exact component={SectionB}/>
                        <Route  path='/department' exact component={Department}/>
                        <Route  path='/view/:id' exact component={EmployeeViewInfo}/>
                        <Route  path='/edit/:id' exact component={EmployeeEdit}/>
                        <Route  path='/edit/depart/:sn' exact component={DepartmentEdit}/>
                        <Route  path='/edit/sectA/:sn' exact component={SectAEdit}/>
                        <Route  path='/edit/sectB/:sn' exact component={SectBEdit}/>
                        <Route  path='/Kpi_Edit/:sn' exact component={KPI_Edit}/>
                        <Route  path='/admin' exact component={Admin}/>
                        <Route  path='/login' exact component={Login}/>
                    </HashRouter>
                  </Stack> 

    );
    
  }
}

