import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel, Col, Row, Grid } from 'react-bootstrap';
import Card from '../components/Card/Card';
import CustomButton from '../components/CustomButton/CustomButton';
import { UserRole } from '../static/dicts';
import Axios from 'axios';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      change: false
    };
  }

  changePassword() {
    const { change } = this.state;

    if (change) {
      return (
        <div>
          <h6>Cambia password</h6>
          <FormControl
            style={{ margin: '5px 0 0 5px' }}
            type='text'
            value={this.state.password}
            placeholder='Inserisci password'
            onChange={e => this.handleInput(e)}
          />
          <CustomButton block bsStyle='primary'>
            Invia
          </CustomButton>
        </div>
      );
    }
  }

  handleInput(e) {
    let el = e.target;

    this.setState({
      password: el.value
    });
  }

  handlePasswordChange(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      change: !this.state.change
    });
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem('user'));

    Axios({
      method: 'GET',
      url: 'http://localhost:3001/api/users/search',
      data: {
        user: user
      },
      headers: {
        Authorization: this.state.token
      }
    });
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    return (
      <div className='container-fluid content'>
        <Card
          content={
            <form onSubmit={e => this.handleSubmit(e)}>
              <Grid fluid>
                <Row>
                  <Col xs={12} md={6}>
                    <h6>Nome</h6>
                    <p>{user.name}</p>
                  </Col>
                  <Col xs={12} md={3} mdOffset={3}>
                    <CustomButton
                      block
                      bsStyle='primary'
                      onClick={e => this.handlePasswordChange(e)}
                    >
                      Cambia password
                    </CustomButton>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <h6>Cognome</h6>
                    <p>{user.surname}</p>
                  </Col>
                  <Col xs={12} md={3} mdOffset={3}>
                    {this.changePassword()}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <h6>Email</h6>
                    <p>{user.email}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <h6>Nome</h6>
                    <p>{UserRole[user.role]}</p>
                  </Col>
                </Row>
              </Grid>
            </form>
          }
        />
      </div>
    );
  }
}
