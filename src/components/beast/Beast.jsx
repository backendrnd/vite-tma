import styles from './Beast.module.scss';

export const Beast = ({ isActive }) => {
    return (
        <div className={styles['beast'] + (isActive ? ' ' + styles['is-active'] : '')}>
            <div className={`${styles['snow']} ${styles['layer1']} ${styles['a']}`} />
            <div className={`${styles['snow']} ${styles['layer1']}`} />
            <div className={`${styles['snow']} ${styles['layer2']} ${styles['a']}`} />
            <div className={`${styles['snow']} ${styles['layer2']}`} />
            <div className={`${styles['snow']} ${styles['layer3']} ${styles['a']}`} />
            <div className={`${styles['snow']} ${styles['layer3']}`} />
        </div>
    );
};
