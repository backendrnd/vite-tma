import styles from './Coin.module.scss';

export const Coin = ({ onClick, disabled = false }) => {
    return (
        <div className={styles['coin']} id="coin" onClick={onClick}>
            <span className={styles['coin__icon'] + ' icon' + (disabled ? ' ' + styles['coin__icon-is-playing'] : '')}>
                <i className={'fi fi-ss-usd-circle'}></i>
            </span>
            <span className={styles['coin__icon'] + ' icon' + (disabled ? ' ' + styles['coin__icon-is-playing'] : '')}>
                <i className={'fi fi-ss-circle-0'}></i>
            </span>
        </div>
    );
};
