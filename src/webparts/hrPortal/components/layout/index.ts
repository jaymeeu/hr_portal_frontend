import * as React from 'react';
import { INavStyles, INav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';

export const navStyles: Partial<INavStyles> = {
    root: {
      width: '100%', 
    }, 
    link: {
      height: '50px', background: '#3e0287', color: 'white', padding: '0 15px',
      selectors:{
        '.ms-Nav-compositeLink:hover &':{color:'#572594', background:'white', fontWeight: 'bold'},
      
      },
    },
  };
//const stackTokens: IStackTokens = {childrenGap: 40};
export const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
   
      {
        key: 'dashboard',
        name: 'Dashboard',
        icon: 'ViewDashboard',
        url: '#/dashboard',
      },
      {
        key: 'employee',
        name: 'Employees',
        icon: 'PeoplePause',
        url: '#/employees',
      },
      {
        key: 'performance',
        name: 'Performance Management',
        icon: 'PivotChart',
        url: '#/performance',
      },
      {
        key: 'evaluation',
        name: 'Evaluation',
        icon: 'Chart',
        url: '#/evaluation',
      },
      {
        key: 'sectionA',
        name: 'SectionA',
        icon: 'Questionnaire',
        url: '#/SectionA',
      },
      {
        key: 'sectionB',
        name: 'SectionB',
        icon: 'QuestionnaireMirrored',
        url: '#/SectionB',
      },
      {
        key: 'department',
        name: 'Department',
        icon: 'Group',
        url: '#/department',
      },
      {
        key: 'admin',
        name: 'Admin',
        icon: 'reminderGroup',
        url: '#/admin',
      },
    ],
  },
];
