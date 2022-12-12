import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/actions/ingredients.js';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import LogIn from '../../pages/login.jsx';
import Registration from '../../pages/register.jsx';
import ForgotPassword from '../../pages/forgot-password.jsx';
import ResetPassword from '../../pages/reset-password.jsx';
import Profile from '../../pages/profile.jsx';
import NotFound from '../../pages/not-found-404.jsx';
import ProtectedRoute from '../ProtectRoute/ProtectedRoute.js'
import { checkAuth } from '../../services/actions/user_requests';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { RESET_INGREDIENT_MODAL } from '../../services/actions/ingredients.js';


function App() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo)

    const background = location.state?.background

    React.useEffect(() => {
        dispatch(getIngredientsData()); 
        dispatch(checkAuth());
    }, [dispatch]);


    const closeIngredientModal = () => {
        dispatch({
            type: RESET_INGREDIENT_MODAL
        })
        history.goBack();
    };

    
    return (
        <div className={styles.app}>  
            <AppHeader />
                <Switch location={background || location}>
                    <Route path="/" exact >
                        <main className={styles.main}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstuctor />
                            </DndProvider>
                        </main>
                    </Route>
                    <ProtectedRoute path="/login" onlyUnAuth>
                        <LogIn />
                    </ProtectedRoute>
                    <ProtectedRoute path="/register" onlyUnAuth>
                        <Registration />
                    </ProtectedRoute>
                    <ProtectedRoute path="/reset-password" onlyUnAuth>
                        <ResetPassword />
                    </ProtectedRoute>
                    <ProtectedRoute path="/forgot-password" onlyUnAuth>
                        <ForgotPassword />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile" >
                        <Profile />
                    </ProtectedRoute>
                    <Route path="/ingredients/:id">
                        <IngredientDetails />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>

                {background && (
                <Route path="/ingredients/:id">
                    <Modal 
                    onClose={closeIngredientModal}
                    handleCloseModal={closeIngredientModal}>
                        <IngredientDetails />
                    </Modal>
                </Route>)}
                
        </div>
    )
};


export default App;
