import React from 'react';
import { isLogin, tokenExpired } from '../utils/auth';
import { Route, Redirect } from 'react-router-dom';
import Error401 from '../views/Error401';
const PrivateRoute = ({ component: Component, path: Path, ...rest }) => {
  return (
    <Route
      path={Path}
      {...rest}
      render={props => {
        let result = isLogin({ Path });
        if (result == true && !tokenExpired()) return <Component {...props} />;
        else if (result === 'Not Authorized') return <Error401 />;
        else return <Redirect to='/signin' />;
      }}
    />
  );
};

export default PrivateRoute;
