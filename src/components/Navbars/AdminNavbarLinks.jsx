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
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { logout } from "../../utils/auth";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title= {
              <span><i className="pe-7s-user pe-custom-32px"/></span>
            } 
            
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Visualizza Profilo</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5} onClick={logout}>Logout</MenuItem>
          </NavDropdown>
         
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
