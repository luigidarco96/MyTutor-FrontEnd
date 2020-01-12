/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import AdminLayout from "layouts/Admin.jsx";
import HomeLayout from "layouts/Home.jsx";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import PrivateRoute from "./routes/PrivateRoutes";

function PrivateRoutes() {
    
  return (
      <Switch>
        <PrivateRoute component={AdminLayout} path="/admin"/>
        <PrivateRoute component={AdminLayout} path="/student"/>
        <PrivateRoute path="/professor" component={AdminLayout}/>
        <PrivateRoute path="/ddi" component={AdminLayout}/>
        <Redirect from='/' to='/home'></Redirect>
      </Switch>
  );
  
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin"render={props => <Login {...props} />}/>
      <Route exact path="/signup" render={props => <SignUp {...props} />}/>
      <Route  path="/home"  render={props => <HomeLayout {...props} />}/>
      <PrivateRoutes/>
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
