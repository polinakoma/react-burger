import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerUserRequest } from '../services/actions/user_requests.js';
import { useState, useCallback } from 'react';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';


const Registration = () => {

    const dispatch = useDispatch();

    const [form, setValue] = useState({ 
        name: '', 
        email: '', 
        password: '' })

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const createAccout = useCallback((e) => {
        e.preventDefault();
        dispatch(registerUserRequest(form));
    }, [form, dispatch]
    );


    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Регистрация</h1>
            <form className={styles.form} name="sign_up">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    size={'default'}
                    extraClass="mt-6 mb-6"
                    />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'
                        onClick={createAccout}>Зарегистрироваться
                    </Button>
                </div> 
            </form>
            <div className={`${styles.actions} mt-20`}>
                <p className={styles.text}>Уже зарегистрированы?</p>
                <Link to='/login' className={styles.text_button}>&#8194;Войти</Link>
            </div>
        </div>
    )
};


export default Registration;