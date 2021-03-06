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
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

//import siderbar_background_image from "../../logoUnisa.png";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: `url(${"/assets/images/logo_unisa.png"})`,
      zIndex: 3,
      backgroundPositionX: "initial"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color= "black"
        data-image= "/assets/images/logo_unisa.png"
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo" style={{height:'78px'}}>
          <a
            href="http://localhost:3000/home"
           // className="simple-text logo-mini"
           
          >
            <div className="logo-img" > 
              <img style={{position:'absolute',left:'20px',top:'20px',height:'40px'}} src="/assets/images/logo_MyTutor.png" alt="logo_image" />
            </div>
          </a> 
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect){
                return (
                  <li
                    className={prop.path === window.location.pathname?"active":""}          
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
