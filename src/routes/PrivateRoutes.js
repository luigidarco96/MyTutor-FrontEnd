import React from 'react';
import { isLogin, tokenExpired } from '../utils/auth';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Error401 from '../views/Error401';
import Axios from 'axios';
const PrivateRoute = ({
  history,
  component: Component,
  path: Path,
  ...rest
}) => {
  history.listen((location, action) => {
    let token = localStorage.getItem('token');

    console.log(history, action);

    if (location.pathname !== '/signin') {
      Axios({
        method: 'get',
        url: 'http://localhost:3001/api/auth/check',
        headers: {
          Authorization: token
        }
      })
        .then(blob => {
          if (blob.status === 200) {
            console.log('Token attivo');
          }
        })
        .catch(error => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('status');

          history.entries = [];
          history.index = -1;
          history.push('/signin');
        });
    }
  });

  return (
    <Route
      path={Path}
      {...rest}
      render={props => {
        let result = isLogin({ Path });
        if (result === true && !tokenExpired()) return <Component {...props} />;
        else if (result === 'Not Authorized') return <Error401 />;
        else return <Redirect to='/signin' />;
      }}
    />
  );
};

export default withRouter(PrivateRoute);
