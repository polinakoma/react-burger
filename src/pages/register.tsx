import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { registerUserRequest } from '../services/actions/userRequests';
import { useCallback, FC, FormEvent } from 'react';
import { EmailInput, PasswordInput, Input, Button } 
from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../services/hooks';
import { useForm } from '../services/hooks';


const Registration: FC = () => {

    const dispatch = useDispatch();

    const {values, handleChange } = useForm({
        name: '', 
        email: '', 
        password: ''
    });

    const createAccout = useCallback((evt: FormEvent) => {
        evt.preventDefault();
        dispatch(registerUserRequest(values));
    }, [values, dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Регистрация</h1>
            <form className={styles.form} name="sign_up" onSubmit={createAccout}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    size={'default'}
                    extraClass="mt-6 mb-6"
                    />
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'>Зарегистрироваться
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