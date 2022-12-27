import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import { useDispatch } from 'react-redux';
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
import { checkAuth } from '../../services/actions/userRequests';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { RESET_MODAL } from '../../services/actions/ingredients.js';
import OrderLine from '../OrderLine/OrderLine.js';
import OrderContentModal from '../OrderContentModal/OrderContentModal';
import ProfileOrders from '../ProfileOrders/ProfileOrders';


function App() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getIngredientsData()); 
        dispatch(checkAuth());
    }, [dispatch]);

    const closeIngredientModal = () => {
        dispatch({
            type: RESET_MODAL
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
                    <Route path="/ingredients/:id">
                        <IngredientDetails />
                    </Route>
                    <Route path="/feed" exact>
                        <OrderLine />
                    </Route>
                    <Route path="/feed/:id">
                        <OrderContentModal />
                    </Route>
                    <ProtectedRoute path="/profile" exact>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact>
                        <ProfileOrders />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id">
                        <OrderContentModal />
                    </ProtectedRoute>
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
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>

                {background && (
                <Switch>
                    <Route path="/ingredients/:id">
                        <Modal 
                        onClose={closeIngredientModal}
                        handleCloseModal={closeIngredientModal}>
                            <IngredientDetails />
                        </Modal>
                    </Route>
                    <Route path="/feed/:id">
                        <Modal 
                        onClose={closeIngredientModal}
                        handleCloseModal={closeIngredientModal}>
                            <OrderContentModal />
                        </Modal>
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id">
                        <Modal 
                        onClose={closeIngredientModal}
                        handleCloseModal={closeIngredientModal}>
                            <OrderContentModal />
                        </Modal>
                    </ProtectedRoute>
                </Switch>
                )}  
        </div>
    )
};


export default App;