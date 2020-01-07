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
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.jsx';

import { style } from 'variables/Variables.jsx';

import routes from 'routes.js';

import image from 'assets/img/sidebar-3.jpg';
import {
  studentSidebar,
  professorSidebar,
  ddiSidebar,
  adminSidebar
} from '../routes/sidebar.js';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasImage: true,
      fixedClasses: 'dropdown show-dropdown open'
    };
  }

  getRoutes = routes => {
    const pathname = this.props.location.pathname.split('/')[1];
    let list = routes[pathname];
    return list.map((prop, key) => {
      return (
        <Route
          path={'/' + pathname + prop.path}
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
    const pathnameRoule = this.props.location.pathname.split('/')[1];
    const pathnameView = this.props.location.pathname.split('/')[2];
    let list = routes[pathnameRoule];
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (list[i].path.split('/')[1] === pathnameView) return list[i].name;
    }
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  getSidebarNames = () => {
    const pathname = this.props.location.pathname.split('/')[1];

    switch (pathname) {
      case 'student':
        return studentSidebar;
      case 'professor':
        return professorSidebar;
      case 'ddi':
        return ddiSidebar;
      case 'admin':
        return adminSidebar;
    }
  };

  render() {
    const pathBase = this.props.location.pathname.split('/')[1];
    return (
      <div className='wrapper'>
        <Sidebar
          {...this.props}
          routes={this.getSidebarNames()}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}

        />

        <div
          id='main-panel'
          className='main-panel'
          ref='mainPanel'
          style={{ height: '100%' }}
        >
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route exact path={"/" + pathBase}>
              <Redirect to={"/" + pathBase + "/notices"} />
            </Route>
            {this.getRoutes(routes)}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
