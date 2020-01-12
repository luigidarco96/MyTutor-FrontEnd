import React, { Component } from "react";
import { Navbar, Nav} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";

export class GuestNavbar extends Component {
  render() {
    const positionImgStyle = {
      fontWeight: "400",
      margin: "5px 0px",
      padding: "2px 15px",
      fontSize: "35px",
      textDecoration: "none",
      color: "white"
    };
    const spanStyle = {
      padding: "0px 0px",
      marginBottom: "10px"
    };

    const goSignin = () => {
      window.location.replace("http://localhost:3000/signin");
    };

    const goSignup = () => {
      window.location.replace("http://localhost:3000/signup");
    };

    return (
      <Navbar
        collapseOnSelect
        fluid
        style={{
          backgroundColor: "#274F77",
          marginBottom: "1.5vw",
          maxHeight: "80px"
        }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <div style={spanStyle}>
              <a href="http://localhost:3000/home" style={positionImgStyle}>
                <img
                  style={{ height: "50px" }}
                  src="/assets/images/logo_MyTutor.png"
                  alt="logo_image"
                />
              </a>
            </div>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight className="auth_buttons">
          <span style={{position:'relative',top:'5px',right:'5px'}}>
          <Button
            bsStyle="primary"
            simple
            onClick={() => goSignin()}
            style={{ color: "white" }}
          >
            Accedi
          </Button>
          <Button
            simple
            onClick={() => goSignup()}
            style={{ color: "#274F77", "background-color": "white" }}
          >
            Registrati
          </Button>
          </span>
        </Nav>
      </Navbar>
    );
  }
}

export default GuestNavbar;
