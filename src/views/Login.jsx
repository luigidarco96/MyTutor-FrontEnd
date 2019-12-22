import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col
} from "react-bootstrap";
import "../assets/css/page-login.css";
import Card from "../components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import bg from '../assets/img/background-image.jpg'
import GuestNavbar from "../components/Navbars/GuestNavbar";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const setBackground = () => {
    document.body.style.backgroundImage = 'url(' + bg + ')'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  }
  return (
    <div onLoad={() => { setBackground() }}>
      <GuestNavbar />
      <div
        style={{
          position: 'absolute',
          width: '98vw'
        }} />
      <Row className="Login_Card" style={{
        width: '100%',
        overflowY: 'hidden',
        maxHeight: '550px',
        padding: '1px',
      }}>
        <Col md="4"></Col>
        <Col md="4" style={{marginTop:'6vw'}}>
          <Card
            content={
              <div className="Login">
                Login
                <form onSubmit={handleSubmit}>
                  <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      autoFocus
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                    />
                  </FormGroup>
                  <Button
                    block
                    bsSize="large"
                    disabled={!validateForm()}
                    type="submit"
                  >
                    Invio
                  </Button>
                </form>
              </div>
            }
          />
        </Col>
      </Row>
    </div>
  );
}
