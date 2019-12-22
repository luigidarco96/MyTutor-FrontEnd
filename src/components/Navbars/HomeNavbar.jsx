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
import { Navbar } from "react-bootstrap";

import HomeNavbarLinks from "./HomeNavbarLinks.jsx";

class HeaderHome extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
      const positionImgStyle={
        fontWeight: "400",
        margin: "5px 0px",
        padding: "2px 15px",
        fontSize: "50px",
        textDecoration:"none",
        color:"white",
      }
      const spanStyle={
        padding:"0px 0px" ,
        marginBottom: "12px",
      }
    return (
      <Navbar fluid style={{backgroundColor: "#274F77"}}>
        <Navbar.Header>
         
        <div style={spanStyle}>
         <a
            href="http://localhost:3000/home"
            style={positionImgStyle}
          > 
              <img style={{height: "50px"}}src="/assets/images/logo_progetto_tutorato_light.png" alt="logo_image" />
             <span style={{fontSize:"15px", marginTop: "30px", marginLeft: "4px",position: "fixed"}}> MYTUTOR</span> 
          </a> 
          </div>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HomeNavbarLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderHome;
