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

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="sfondo" />
      <Row className="Login_Card">
        <Col md="4"></Col>
        <Col md="4">
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
