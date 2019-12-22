import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import HomeNavbarLinks from "./HomeNavbarLinks.jsx";

export class GuestNavbar extends Component {
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
            <Navbar fluid style={{ backgroundColor: "#274F77"}}>
                <Navbar.Header>

                    <div style={spanStyle}>
                        <a
                            href="http://localhost:3000/home"
                            style={positionImgStyle}
                        >
                            <img style={{ height: "50px" }} src="/assets/images/logo_progetto_tutorato_light.png" alt="logo_image" />
                            <span style={{ fontSize: "15px", marginTop: "30px", marginLeft: "4px", position: "absolute" }}> MYTUTOR</span>
                        </a>
                    </div>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>
                <Navbar.Collapse>
                    <HomeNavbarLinks/>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default GuestNavbar;