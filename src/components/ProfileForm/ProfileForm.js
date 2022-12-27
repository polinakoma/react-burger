import styles from './ProfileForm.module.css';
import { EmailInput, Input, PasswordInput } from 
'@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { saveUserData } from '../../services/actions/userRequests.js';
import { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie.js';


export const ProfileForm = () => {

    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken');

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
    let userEmail = userInfo.email
    let userName = userInfo.name

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState('');

    const handleResetData = (e) => {
        e.preventDefault();
        setName(userName)
        setEmail(userEmail)
    };

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

    const saveNewData = useCallback((e) => {
        e.preventDefault();
        dispatch(saveUserData(accessToken, name, email,password));
    }, [accessToken, name, email,password, dispatch]);


    return (
        <form className={styles.profile_info} onSubmit={saveNewData} name="profile">
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
                <button className={styles.buttonCancel} 
                onClick={handleResetData}>Отмена
                </button>
                <Button
                    type="primary"
                    size="medium"
                    htmlType='submit'>Сохранить
                </Button> 
            </div>
        </form>
    )
};

export default ProfileForm;