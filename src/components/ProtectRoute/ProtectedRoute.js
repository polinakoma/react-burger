import { useSelector } from "react-redux";
import { useLocation, Redirect, Route } from "react-router-dom";
import Preloader from '../Preloader/preloader.js';


export const ProtectedRoute = ({ onlyUnAuth, children, ...props }) => {

    const location = useLocation();

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
    const isAuthChecked = useSelector((state) => state.userRequestReducer.isAuthChecked); 
  //  становится true если запрос на проверку токена прошел успешно

    if(!isAuthChecked) {
        <Preloader />
    }

    if(onlyUnAuth && userInfo) {
        const { from } = location.state || { from: {pathname: "/"} };
        return <Redirect to={from} />
    };

    if(!onlyUnAuth && !userInfo) {
        return <Redirect to={{pathname: '/login', state: { from: location }
        }} />
    }

    return (
    <Route {...props}>
        {children}
    </Route>)
};


export default ProtectedRoute;