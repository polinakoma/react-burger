import styles from './preloader.module.css';

// ИЗМЕНИТЬ ПРЕЛОУДЕР!!!!!
export const Preloader = () => {
    return (
        <>
            <h1>Секундочку...</h1>
            <div className={styles.loader_container}>
                <div className={styles.loader}></div>
            </div>
        </>
    )

};

export default Preloader;

