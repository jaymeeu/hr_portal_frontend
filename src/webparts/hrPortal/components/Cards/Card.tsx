import * as React from 'react';
import styles from '../Cards/Card.module.scss';
const one = require('../../assets/1.jpg');

const Card = (props) => {
    const {userName, dp} = props;
    return(
        <>
            <div className={styles.root}>
                <div className={styles.profile}>
                    <div className={styles.pics}> <img src={dp}/></div>
                    <span >{userName}</span>
                </div>
            </div>   
        </>
    );
};
export default Card;