import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';
import LogIn from '../../pages/login';
import Registration from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import NotFound from '../../pages/not-found-404';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderLine from '../OrderLine/OrderLine';
import OrderContentModal from '../OrderContentModal/OrderContentModal';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import { useDispatch } from '../../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData, RESET_MODAL } from '../../services/actions/ingredients';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { checkAuth } from '../../services/actions/userRequests';
import { FC, useEffect } from 'react';
import { Location } from 'history'; 


const App: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location= useLocation<{background: Location}>();

    const background = location.state?.background;

    useEffect(() => {
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
                        <OrderContentModal isModal={false}/>
                    </Route>
                    <ProtectedRoute path="/profile" exact>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact>
                        <ProfileOrders />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id">
                        <OrderContentModal isModal={false}/>
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
                            <OrderContentModal isModal={true}/>
                        </Modal>
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id">
                        <Modal 
                        onClose={closeIngredientModal}
                        handleCloseModal={closeIngredientModal}>
                            <OrderContentModal isModal={true}/>
                        </Modal>
                    </ProtectedRoute>
                </Switch>
                )}  
        </div>
    )
};

export default App;