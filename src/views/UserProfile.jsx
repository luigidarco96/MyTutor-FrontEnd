import React, { Component } from 'react';
import { Collapse, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Glyphicon, FormControl, Col, Row, Grid, Alert, Button } from 'react-bootstrap';
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
      error: null,
      name: '',
      surname: '',
      email: '',
      registrationNumber: '',
      birthDate: '',
      role: '',
      alertSuccess: false,


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
        'btn-color-blue btn-block btn btn-primary',
        'btn-color-red btn btn-block'
      );

      e.target.innerHTML = 'Annulla';
    } else {
      e.target.className = e.target.className.replace(
        'btn-color-red btn btn-block',
        'btn-color-blue btn-block btn btn-primary '
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
    let passRegex = RegExp(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/
    );

    let value = '' + e.target.value;

    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');

    if (passRegex.test(value.trim())) {
      this.setState({
        error: <Alert bsStyle='danger'>Password inserita non valida.</Alert>
      });
      return;
    }

    if (user) {
      if (user.role === 'Student') {
        user.birth_date = user.birth_date + ' ';
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
          this.setState({
            error: <Alert bsStyle='success'>Modifica avvenuta.</Alert>
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(error => { });
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

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeSurname(event) {
    this.setState({ surname: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }


  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'Professor')
      this.setState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: 'Professore',
      })
    else {
      this.setState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: 'Studente',
        registrationNumber: user.registration_number,
        birthDate: user.birth_date
      })
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    const { error } = this.state;



    return (
      <div className='container-fluid content'>
        <Grid fluid>
          <Col xs={12} md={8}>
            <Card
              title='Informazioni personali'
              content={
                <Grid fluid>
                  <Row className='text-center'>
                    <div class="form-group">
                      <label style={{ float: 'left', paddinLeft: '5px' }}>Nome</label>
                      <input type="text" class="form-control" placeholder="Nome" value={this.state.name} onChange={(e) => { this.handleChangeName(e) }} />
                    </div>
                  </Row>
                  <Row className='text-center'>
                    <div class="form-group">
                      <label style={{ float: 'left', paddinLeft: '5px' }}>Cognome</label>
                      <input type="text" class="form-control" placeholder="Cognome" value={this.state.surname} onChange={(e) => { this.handleChangeSurname(e) }} />
                    </div>
                  </Row>
                  <Row className='text-center'>
                    <div class="form-group">
                      <label style={{ float: 'left', paddinLeft: '5px' }}>Email</label>
                      <input readOnly type="text" class="form-control" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChangeEmail(e) }} />
                    </div>
                  </Row>
                  <Row className='text-center'>
                    <div class="form-group">
                      <label style={{ float: 'left', paddinLeft: '5px' }}>Ruolo</label>
                      <input readOnly type="text" class="form-control" placeholder="Ruolo" value={this.state.role} onChange={(e) => { this.handleChangeEmail(e) }} />
                    </div>
                  </Row>
                  {user.role === 'Student' ?
                    <Row className='text-center'>
                      <div class="form-group">
                        <label style={{ float: 'left', paddinLeft: '5px' }}>Matricola</label>
                        <input readOnly style={{ border: '' }} type="text" class="form-control" placeholder="Matricola" value={this.state.registrationNumber} />
                      </div>
                    </Row>
                    :
                    <div></div>
                  }
                  {this.state.alertSuccess?
                  <Alert bsStyle='success'><p>Modifica eddettuata con successo</p></Alert>  
                  :
                  <div></div>
                }
                  <CustomButton
                    style={{ margin: '0' }}
                    bsStyle='primary'
                    className="btn-color-blue btn-block"
                    onClick={() => {

                      if (user) {
                        if (user.role === 'Student') {
                          user.birth_date = user.birth_date + ' ';
                        }
                        user.name = this.state.name;
                        user.surname = this.state.surname;
                        user.password = null;
                        console.log(user);
                        Axios({
                          method: 'PATCH',
                          url: 'http://localhost:3001/api/users',
                          data: {
                            user: user
                          },
                          headers: {
                            'Authorization': localStorage.getItem('token')
                          }
                        })
                          .then(result => {
                            localStorage.removeItem('user');
                            localStorage.setItem('user', JSON.stringify(result.data.user));
                            this.setState({
                              alertSuccess: true
                            })
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          })
                          .catch(error => { });
                        }

                      }
                    }
                  >
                    Modifica dati personali
                  </CustomButton>

                </Grid>

              }
            />
          </Col>
          <Col xs={12} md={4}>
            <Card
              title='Modifica dati'
              content={
                <form onSubmit={e => this.handleSubmit(e)}>
                  <Grid fluid>
                    <Row>
                      <CustomButton
                        style={{ margin: '0' }}
                        bsStyle='primary'
                        className="btn-color-blue btn-block"

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
                          className='btn-color-blue btn-block'
                          type='submit'
                        >
                          Applica modifiche
                        </CustomButton>
                      </Collapse>
                    </Row>
                  </Grid>
                  {error}
                </form>
              }
            />
          </Col>
        </Grid>
      </div>
    );

  }
}
