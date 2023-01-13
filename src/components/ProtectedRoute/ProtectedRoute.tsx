import { FC } from "react";
import { useSelector } from "../../services/hooks"; 
import { useLocation, Redirect, Route } from "react-router-dom";
import { IProtectedRouteProps } from "../../services/types/data";
import { Location } from '../../services/types/data';


const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth, children, ...props }) => {

    const location = useLocation<Location>();
    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);

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