import styles from './profile.module.css';
import { Route } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';


const Profile = () => {

    return (
        <div className={styles.container}>
            <ProfileMenu />

            <Route to="/profile" exact>  
                <ProfileForm />
            </Route>
        </div>
    )
};


export default Profile;