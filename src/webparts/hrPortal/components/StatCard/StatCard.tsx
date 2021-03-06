import * as React from 'react';
import styles from '../StatCard/StatCard.module.scss';

const StatCard = (props) => {
    const {num, subtitle, icon} = props;
    return(
        <>
            <div className={styles.sCard}>
               
                <div className={styles.num}>
                    <div className={styles.number}><span>{num}</span></div>
                    <div className={styles.label}><span>{subtitle}</span></div>
                </div>
                    <div className={styles.icon}> {icon}</div>
            </div>
        </>
    );
};
export default StatCard;