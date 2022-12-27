import styles from './preloader.module.css';


export const Preloader = () => {
    return (
        <>
            <div className={styles.loader_container}>
                <div className={styles.loader}></div>
            </div>
        </>
    )

};

export default Preloader;

