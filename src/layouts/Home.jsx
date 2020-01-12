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
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "components/Footer/Footer";

import routes from "routes.js";

import GuestNavbar from "../components/Navbars/GuestNavbar";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  getRoutes = routes => {
    const pathname = this.props.location.pathname.split("/")[1];
    const dictionaryPath = {
      Student: "student",
      Professor: "professor",
      DDI: "ddi",
      "Teaching Office": "admin"
    };
    if (pathname === "home" && localStorage.getItem("token") != null) {
      let user = JSON.parse(localStorage.getItem("user"));
      window.location.replace(
        "http://localhost:3000/" + dictionaryPath[user.role] + "/notices"
      );
    }
    let list = routes[pathname];
    return list.map((prop, key) => {
      return (
        <Route
          path={"/" + pathname + prop.path}
          render={props => (
            <prop.component
              {...props}
              handleClick={this.handleNotificationClick}
            />
          )}
          key={key}
        />
      );
    });
  };

  getBrandText = path => {
    const pathnameRoule = this.props.location.pathname.split("/")[1];
    const pathnameView = this.props.location.pathname.split("/")[2];
    let list = routes[pathnameRoule];
    for (let i = 0; i < list.length; i++) {
     
      if (list[i].path.split("/")[1] === pathnameView) return list[i].name;
    }
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return (
      <div>
        <GuestNavbar
          {...this.props}
          brandText={this.getBrandText(this.props.location.pathname)}
        />
        <Switch>{this.getRoutes(routes)}</Switch>
        <Footer className="pull-right" />
      </div>
    );
  }
}

export default Home;
