import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './Employees.module.scss'; 
import Axios from 'axios';
import {useParams} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
const Qualification = () =>{
    const { id } = useParams<Record<string, string | undefined>>();
    const [EmergencyContact, SetEmergencyContact] = useState([]);
    const endPoint = "https://hrportalserver.herokuapp.com/";
    
    useEffect(()=>{
        Axios.get(`${endPoint}api/employee/${id}`).then((response) => {
            SetEmergencyContact(response.data); 
        });
    }, []);

    return(
        <div >
            
            {EmergencyContact.map((emerg)=>{
                      return <table key={emerg.id} className="table table-bordered table-striped" >
                      <tr>
                        <td style={{width: '30%' , fontWeight: 'bold'}}>Qualification</td>
                        <td style={{width: '70%'}}>{emerg.EmergencyContact_Name}</td>
                    </tr>
                    <tr>
                        <td style={{width: '30%' , fontWeight: 'bold'}}>Qualification</td>
                        <td style={{width: '70%'}}>{emerg.EmergencyContact_MobileNumber}</td>
                    </tr>
                    <tr>
                        <td style={{width: '30%', fontWeight: 'bold'}}>Qualification</td>
                        <td style={{width: '70%'}}>{emerg.Relationship}</td>
                    </tr>
                    <tr>
                        <td style={{width: '30%' , fontWeight: 'bold'}}>Qualification</td>
                        <td style={{width: '70%'}}>{emerg.EmergencyContact_HomeAddress}</td>
                    </tr>
                  </table>;
                  })}
        </div>      
       
    );

};
export default Qualification; 