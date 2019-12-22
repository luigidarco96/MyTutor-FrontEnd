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

class HomeNavbarLinks extends Component {
  goSignin = () => {
    window.location.replace("http://localhost:3000/signin");
  }

  goSignup =()=>{
    window.location.replace("http://localhost:3000/signup");
  }

  render() {
    return (
      <div>
        <Nav pullRight>
          <div style={{marginTop:"32px"}}>
          <NavDropdown noCaret
            eventKey={2}
            title= {
              <span style={{marginLeft:"-40px"}}><i className="pe-7s-user pe-custom-32px" style={{color:"white"}}/><span className="caret" style={{color:"white"}}></span></span>
            }            
            
            
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1} onClick={()=>this.goSignin()}>Accedi</MenuItem>
            <MenuItem eventKey={2.5} onClick={()=>this.goSignup()}>Registrati</MenuItem>
          </NavDropdown>
          
         </div>
        </Nav>
      </div>
    );
  }
}

export default HomeNavbarLinks;
