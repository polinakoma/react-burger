import styles from './profile.module.css';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Profile = () => {

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
    const userEmail = userInfo.email
    const userName = userInfo.name

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
        // пееретащить данные пароля
    const [password, setPassword] = useState('');


    const onChangeName = evt => {
        const value = evt.target.value;
        setName(value);
    };

    const onChangeEmail = evt => {
        const value = evt.target.value;
        setEmail(value);
    };

    const onChangePassword = evt => {
        const value = evt.target.value;
        setPassword(value);
    };


    return (
        <div className={styles.container}>
            <div className={styles.description}>
                <NavLink to='/profile' className={styles.button} 
                activeClassName={styles.link_active}>Профиль</NavLink>
                <NavLink to='/profile/orders' className={styles.button}>История заказов</NavLink>
                <NavLink to='/login' className={styles.button}>Выход</NavLink>
                <p className={`${styles.info} mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <form className={styles.profile_info}>
                <Input
                    onChange={onChangeName}
                    value={name}
                    name={'name'}
                    placeholder="Имя"
                    icon={"EditIcon"}
                    extraClass="mb-6"
                    size={"default"}
                />
               <EmailInput
                   onChange={onChangeEmail}
                   value={email}
                    name={'email'}
                    placeholder="Логин"
                    icon={"EditIcon"}
                    extraClass="mb-6"
                    size={"default"}
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    placeholder="Пароль"
                    icon={"EditIcon"}
                    extraClass="mb-6"
                    size={"default"}
                />
                <div className={styles.buttons}>
                    <button className={styles.buttonCancel}>Отмена</button>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='button'>Сохранить
                    </Button> 
                </div>
            </form>
        </div>
    )
};


export default Profile;