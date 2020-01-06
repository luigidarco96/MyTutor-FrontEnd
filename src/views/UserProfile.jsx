import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  ControlLabel,
  Col,
  Row,
  Grid,
  Alert
} from 'react-bootstrap';
import Card from '../components/Card/Card';
import CustomButton from '../components/CustomButton/CustomButton';
import { UserRole } from '../static/dicts';
import Axios from 'axios';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      change: false,
      error: null
    };
  }

  showError() {
    const { error } = this.state;

    if (error) {
      return error;
    }
  }

  changePassword() {
    const { change } = this.state;

    if (change) {
      return (
        <div>
          <h6>Cambia password</h6>
          <FormControl
            style={{ margin: '5px 0 0 5px' }}
            type='password'
            value={this.state.password}
            placeholder='Inserisci password'
            onChange={e => this.handleInput(e)}
          />
          <CustomButton type='submit' block bsStyle='primary'>
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

    console.log('Cambia password!');

    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');

    if (user) {
      if (user.role === 'Student') {
        user.birth_date = user.birth_date.split('T')[0] + ' ';
      }
      user.password = this.state.password;

      Axios({
        method: 'PATCH',
        url: 'http://localhost:3001/api/users',
        data: {
          user: user
        },
        headers: {
          Authorization: token
        }
      })
        .then(result => {
          console.log(result);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(result.data.user));

          window.location = '/notices';
        })
        .catch(error => {
          if (Boolean(error)) {
            this.setState({
              error: <Alert bsStyle='danger'>{error}</Alert>
            });
          }
        });
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));

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
                <Row>
                  <Col xs={12} md={12}>
                    {this.showError()}
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
