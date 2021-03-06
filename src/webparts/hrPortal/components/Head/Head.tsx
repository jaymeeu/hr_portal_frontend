
import * as React from 'react';
import styles from '../Head/Head.module.scss';
import { Button} from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import {  useHistory } from 'react-router-dom';

const Group3 = require('./../../assets/Group.png');

const Head = (props) =>{
    const {adminName} =props;
    const history = useHistory();

    function handleNotify(e) {
        e.preventDefault();
        history.push('/evaluation/')
      }
    
    return(
        <div className={styles.root}>
            <div className={styles.left}> <img src={String(Group3)}/> </div>
            <div className= {styles.middle}> 
                <p>Hello {adminName}</p>
                <span>Good to see you again</span>
            </div>
            <div className={styles.right}> 
                   <div style={{textAlign: 'center'}}> 
                        <NotificationsActiveIcon style={{fontSize: 60, color: '#fff'}} />
                    </div>
                    <div style={{textAlign: 'center'}}> 
                        <Button  size="small" variant="contained" color="primary" onClick={handleNotify}>
                            Check Notification
                        </Button>
                    </div>
            </div>
            
        </div>
    );
};
export default Head;