import React, { Component } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem,
} from "react-bootstrap";

export class GuestNavbar extends Component {
    render() {
        const positionImgStyle = {
            fontWeight: "400",
            margin: "5px 0px",
            padding: "2px 15px",
            fontSize: "35px",
            textDecoration: "none",
            color: "white",
        }
        const spanStyle = {
            padding: "0px 0px",
            marginBottom: "10px",
        }

        const goSignin = () => {
            window.location.replace('http://localhost:3000/signin')
        }

        const goSignup = () => {
            window.location.replace('http://localhost:3000/signup')
        }

        return (
            <Navbar collapseOnSelect fluid 
                style={{ backgroundColor: "#274F77", marginBottom: '1.5vw', maxHeight: '80px' }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <div style={spanStyle}>
                            <a
                                href="http://localhost:3000/home"
                                style={positionImgStyle}
                            >
                                <img style={{ height: "50px" }} src="/assets/images/logo_progetto_tutorato_light.png" alt="logo_image" />
                                <span style={{ fontSize: "15px", marginTop: "30px", marginLeft: "4px", position: "absolute" }}> MYTUTOR</span>
                            </a>
                        </div>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown noCaret 
                        eventKey={2}
                            title={
                                <span><i className="pe-7s-user pe-custom-32px" style={{ color: "white" }} /><span className="caret" style={{ color: "white" }}></span></span>
                            }
                            id="basic-nav-dropdown-right">
                            <MenuItem eventKey={2.1} onClick={() => goSignin()}>Accedi</MenuItem>
                            <MenuItem eventKey={2.5} onClick={() => goSignup()}>Registrati</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default GuestNavbar;