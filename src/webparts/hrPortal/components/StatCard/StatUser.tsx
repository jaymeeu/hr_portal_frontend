import * as React from 'react';
import styles from '../StatCard/StatUser.module.scss';
import PeopleIcon from '@material-ui/icons/People';

const StatUser = (props) => {
    const {icon, number, label} = props;
    return(
        <>
            <div className={styles.root}>
                <div className={styles.icon}>{icon}</div> 
                <div className={styles.number}>{number}</div>
                <div className={styles.label}>{label}</div>
               
            </div>
        </>
    );
};
export default StatUser;