import styles from './profile.module.css';
import { Route } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import { FC } from 'react';


const Profile: FC = () => {

    return (
        <div className={styles.container}>
            <ProfileMenu />

            <Route path="/profile" exact>  
                <ProfileForm />
            </Route>
        </div>
    )
};

export default Profile;