import React, { Component } from 'react';
import { Collapse, Toast, ToastHeader, ToastBody } from 'reactstrap';
import {
  Glyphicon,
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
      showPassword: 'password',
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

  handleInput(e) {
    let el = e.target;

    this.setState({
      password: el.value
    });
  }

  handlePasswordChange(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.state.change) {
      e.target.className = e.target.className.replace(
        'btn-primary',
        'btn-warning'
      );

      e.target.innerHTML = 'Annulla';
    } else {
      e.target.className = e.target.className.replace(
        'btn-warning',
        'btn-primary'
      );

      e.target.innerHTML = 'Modifica Password';

      if (this.state.password) {
        this.setState({ password: '' });
      }
    }

    this.setState({
      change: !this.state.change
    });
  }

  handleHover(e) {
    if (e.target.disabled) {
      e.target.disabled = false;
    }
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

   

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
          
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(result.data.user));

          window.location = '/notices';
        })
        .catch(error => {
          this.setState({
            error: <Toast></Toast>
          });
        });
    }
  }

  handleSeePassword(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.state.showPassword === 'password') {
      this.setState({
        showPassword: 'text'
      });
    } else {
      this.setState({
        showPassword: 'password'
      });
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));

    return (
      <div className='container-fluid content'>
        <Grid fluid>
          <Col xs={12} md={8}>
            <Card
              title='Informazioni personali'
              content={
                <Grid fluid>
                  <Row className='text-center'>
                    <h4>Nome</h4>
                    <p>{user.name}</p>
                  </Row>
                  <Row className='text-center'>
                    <h4>Cognome</h4>
                    <p>{user.surname}</p>
                  </Row>
                  <Row className='text-center'>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </Row>
                  <Row className='text-center'>
                    <h4>Ruolo</h4>
                    <p>{UserRole[user.role]}</p>
                  </Row>
                </Grid>
              }
            />
          </Col>
          <Col xs={12} md={4}>
            <Card
              title='Modifica dati'
              content={
                <form onSubmit={e => this.handleSubmit()}>
                  <Grid fluid>
                    <Row>
                      <CustomButton
                        style={{ margin: '0' }}
                        bsStyle='primary'
                        block
                        fill
                        onClick={event => this.handlePasswordChange(event)}
                        onMouseOver={event => this.handleHover(event)}
                      >
                        Modifica Password
                      </CustomButton>
                    </Row>
                    <Row>
                      <Collapse
                        isOpen={this.state.change}
                        style={{ textAlign: 'center' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <FormControl
                            type={this.state.showPassword}
                            name='password'
                            value={this.state.password}
                            placeholder='Inserisci password'
                            onChange={event => this.handleInput(event)}
                            style={{ paddingRight: '10px' }}
                          />
                          <Glyphicon
                            glyph='eye-open'
                            style={{ marginLeft: '-25px', cursor: 'pointer' }}
                            onClick={event => {
                              this.handleSeePassword(event);
                            }}
                          />
                        </div>
                        <CustomButton
                          style={{ margin: '10px auto' }}
                          bsStyle='primary'
                          block
                          fill
                          type='submit'
                        >
                          Applica modifiche
                        </CustomButton>
                      </Collapse>
                    </Row>
                  </Grid>
                </form>
              }
            />
          </Col>
        </Grid>
      </div>
    );
  }
}
