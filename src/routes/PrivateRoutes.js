import React from 'react';
import {isLogin} from '../utils/auth'
import { Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({component:Component,path:Path, ...rest})=>{
    return(
        <Route path={Path} {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
}

export default PrivateRoute;