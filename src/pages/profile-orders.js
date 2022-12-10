import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';

const ProfileOrders = () => {

    return (
        <div className={styles.container}>
            <div className={styles.description}>
                <NavLink to='/profile' className={styles.button}>Профиль</NavLink>
                <NavLink to='/profile/orders' className={styles.button}
                 activeClassName={styles.link_active}>История заказов</NavLink>
                <NavLink to='/profile/orders/:id' className={styles.button}>Выход</NavLink>
                <p className={`${styles.info} mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
        </div>
    )
};


export default ProfileOrders;