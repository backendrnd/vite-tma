import styles from './BackButton.module.scss';

export const BackButton = ({ onBack }) => {
    return (
        <div className={styles['back-button']} onClick={onBack}>
            <div className={styles['back-button__icon']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10.3075 3.50173C10.5846 3.19385 10.5596 2.71963 10.2517 2.44254C9.94384 2.16544 9.46962 2.1904 9.19253 2.49828L4.69253 7.49828C4.43582 7.78351 4.43582 8.2165 4.69253 8.50173L9.19253 13.5017C9.46962 13.8096 9.94384 13.8346 10.2517 13.5575C10.5596 13.2804 10.5846 12.8062 10.3075 12.4983L6.25902 8.00001L10.3075 3.50173Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </div>
    );
};
