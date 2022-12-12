import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logInRequest } from '../services/actions/user_requests.js';
import { useDispatch } from 'react-redux';


const LogIn = () => {

    const dispatch = useDispatch();

    const [form, setValue] = useState({email:'', password:''})

    const onChange = e => {
        setValue(e.target.value)
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const logIn = useCallback((e) => {
        e.preventDefault();
        dispatch(logInRequest(form));
    }, [form, dispatch]
    ); 

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Вход</h1>
            <form className={styles.form} name="sign_in">
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder={'E-mail'}
                    extraClass="mb-6 mt-6">
                </EmailInput>
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    placeholder={'Пароль'}
                    extraClass="mb-6">
                </PasswordInput>
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'
                        onClick={logIn}>Войти          
                    </Button>
                </div> 
            </form>
            <div className={`${styles.actions} mt-20`}>
                <p className={styles.text}>Вы - новый пользователь?</p>
                <Link to='/register' className={styles.text_button}>&#8194;Зарегистрироваться</Link>
            </div>
            <div className={`${styles.actions} mt-4`}>
                 <p className={styles.text}>Забыли пароль?</p>
                <Link to='/forgot-password' className={styles.text_button}>&#8194;Восстановить пароль</Link>
            </div>
        </div>
    )
};


export default LogIn;
