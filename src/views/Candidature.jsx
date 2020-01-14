import React, { Component } from 'react';
import { Grid, Row, Table, Col, Button, Modal, Alert } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import axios from 'axios';

class Candidature extends Component {

  state = {
    header: [],
    candidatures: [],
    protocol: null,
    show: false,
    operationToconfirm: '',
    showConfirm: false,
    selectedCandidature: '',
    showAlertError: false,
    showAlertText: '',
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    let id = params.id;
    let pathRegex = /admin\/candidatures\/*/;

    if (window.location.pathname === '/admin/candidatures' || pathRegex.test(window.location.pathname)) {
      this.setState({
        header: [
          'Studente',
          'Protocollo',
          'Ultima modifica',
          'Stato',
          'Scarica',
          'Rifiuta'
        ]
      });
    } else {
      this.setState({
        header: [
          'Studente',
          'Protocollo',
          'Ultima modifica',
          'Stato',
          'Modifica'
        ]
      });
    }

    const headers = {
      Authorization: localStorage.getItem('token')
    };

    axios
      .get('http://localhost:3001/api/candidatures', {
        params: {
          protocol: id
        },
        headers: headers
      })
      .then(blob => {

        this.setState({
          candidatures: blob.data.candidatures
        });
      });
  }

  deleteCandidature(){
    const closeConfirm = () =>{
      this.setState({
        showConfirm: false,
        showAlertError: false
      })
    }
    const headers = {
      Authorization: localStorage.getItem('token')
    };
   
    //Call servise to delete a candidature
    axios
      .patch(
        'http://localhost:3001/api/candidatures',
        { candidature: this.state.selectedCandidature },
        { headers: headers }
      )
      .then(blob => {
        
        let newCandidatures = [];
        let i = 0;
        this.state.candidatures.forEach(el => {
          if (
            this.state.selectedCandidature.student === el.student &&
            this.state.selectedCandidature.notice_protocol === el.notice_protocol
          ) {
            newCandidatures[i++] = blob.data.candidature;
          } else {
            newCandidatures[i++] = el;
          }
        });
     
        this.setState({
          candidatures: newCandidatures
        });
        closeConfirm();
      })
      .catch(error=>{
        this.setState({
          alertErrorText: error.response.data.error,
          alertError: true
        })
      })

  } 
   render() {
    const closeConfirm = () =>{
      this.setState({
        showConfirm: false,
        showAlertError: false
      })
    }


    let updateButton = element => {
      if (element.state === 'Editable')
        return (
          <Button
            onClick={() => {
              this.props.history.push('/student/modificaCandidatura/' +
                element.notice_protocol
              );
            }}
            style={{ border: '1px solid #274F77' }}
            className='btn-color-blue'
            bsStyle='primary'

          >
            Modifica documenti
          </Button>
        );
      else
        return (
          <Button
            disabled={true}
            onClick=''
            style={{ border: '1px solid #274F77' }}
            bsStyle='primary'
            className='btn-color-blue'
          >
            Modifica documenti
          </Button>
        );
    };

    let downoladDocuments = element => {
      if (element.state === 'In Evaluation') {
        return (
          <Button
            style={{ border: '1px solid #274F77' }}
            className='btn-colore-blue'

            bsStyle='primary'

            onClick={() => {
              const headers = {
                Authorization: localStorage.getItem('token')
              };
              const candidature = {
                candidature: element
              };
              //Call servise to downnload documents of a candidature
              axios
                .post(
                  'http://localhost:3001/api/candidatures/all',
                  candidature,
                  { headers: headers, responseType: 'blob' }
                )
                .then(blob => {
                  const fileName = blob.headers['content-disposition']
                    .split(';')[1]
                    .trim()
                    .split('"')[1];
                  let a = document.createElement('a');
                  var url = window.URL.createObjectURL(blob.data);
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  window.URL.revokeObjectURL(url);
                  a.remove();
                });
            }}
          >
            Scarica documenti
          </Button>
        );
      } else {
        return (
          <Button
            disabled={true}
            style={{ border: '1px solid #274F77' }}
            className='btn-color-blue'
            bsStyle='primary'

            onClick={() => {
              const headers = {
                Authorization: localStorage.getItem('token')
              };
              const candidature = {
                candidature: element
              };
              //Call servise to downnload documents of a candidature
              axios
                .post(
                  'http://localhost:3001/api/candidatures/all',
                  candidature,
                  { headers: headers, responseType: 'blob' }
                )
                .then(blob => {
                  const fileName = blob.headers['content-disposition']
                    .split(';')[1]
                    .trim()
                    .split('"')[1];
                  let a = document.createElement('a');
                  var url = window.URL.createObjectURL(blob.data);
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  window.URL.revokeObjectURL(url);
                  a.remove();
                });
            }}
          >
            Scarica documenti
          </Button>
        );
      }
    };

    let rejectCandidature = element => {
      if (element.state === 'In Evaluation') {
        return (
          <Button
            style={{ border: '1px solid #274F77' }}
            className='btn-color-blue'
            bsStyle='primary'

            onClick={() => {

              const candidature = {
                student: element.student,
                notice_protocol: element.notice_protocol,
                last_edit: element.last_edit,
                state: 'Rejected'
              };
              this.setState({
                showConfirm: true,
                operationToConfirm: 'Rifiuta candidatura',
                selectedCandidature: candidature
              })
            }}
          >
            Rifiuta candidatura
          </Button>
        );
      } else {
        return (
          <Button
            disabled={true}
            style={{ border: '1px solid #274F77' }}
            className='btn-color-blue'
            bsStyle='primary'

            onClick=''
          >
            Rifiuta candidatura
          </Button>
        );
      }
    };

    let statusCandidature = status => {
      switch (status) {
        case 'Editable':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureEditable.png'
              alt='no_img'
            />
          );
        case 'In Evaluation':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureInEvaluation.png'
              alt='no_img'
            />
          );

        case 'Rejected':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureRejected.png'
              alt='no_img'
            />
          );
        case 'In Graded List':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureGradList.png'
              alt='no_img'
            />
          );
        default:
          return
      }
    };
    const { header, candidatures } = this.state;
    let pathRegex = /admin\/candidatures\/*/;

    if (window.location.pathname === '/admin/candidatures' || pathRegex.test(window.location.pathname)) {
      return (
        <div className='content'>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title='Candidature'
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table hover>
                      <thead>
                        <tr>
                          {header.map((prop, key) => {
                            return (
                              <th style={{ paddingLeft: '70px' }} key={key}>
                                {prop}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {candidatures &&
                          candidatures.map(element => {
                            return (
                              <tr key={element.last_edit}>
                                <td>{element.student.email}</td>
                                <td style={{ position: 'relative', left: '50px' }}>
                                  {element.notice_protocol}
                                </td>
                                <td style={{ position: 'relative', left: '50px' }}>
                                  {element.last_edit.split('T')[0]}
                                </td>
                                <td style={{ position: 'relative', left: '63px' }}>
                                  {statusCandidature(element.state)}
                                </td>
                                <td style={{ position: 'relative', left: '15px' }}>{downoladDocuments(element)}</td>
                                <td>{rejectCandidature(element)}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  }
                ></Card>
              </Col>
            </Row>
            <p>Legenda:</p>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureRejected.png'
                alt='no_img'
              />
              Candidatura rifiutata
            </div>

            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureEditable.png'
                alt='no_img'
              />
              Candidatura modificabile
            </div>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                alt='no_img'
                src='/assets/images/statusCandidatureInEvaluation.png'
              />
              Candidatura in valutazione
            </div>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureGradList.png'
                alt='no_img'
              />
              La graduatoria per la candidatura è stata pubblicata
            </div>
          </Grid>
          <Modal
            style={{
              borderRadius: '6px',
              overflow: 'hidden',
              marginTop: '13%',
              left: '10%',
              position: 'absolute'
            }}
            dialogClassName='myClass'
            show={this.state.showConfirm}
            onHide={closeConfirm}
            animation={false}
          >
            <Modal.Header style={{ width: '350px' }} closeButton>
              <Modal.Title style={{ color: '#274F77' }}>
                {this.state.operationToConfirm}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                width: '350px',
                padding: '7px 7px 7px 16px',
                fontSize: '15px'
              }}
            >
              <span>Confermare l'operazione?</span>
            </Modal.Body>
            {this.state.alertError ? (
              <Alert bsStyle='danger'>
                <p>{this.state.alertText}</p>
              </Alert>
            ) : (
                <span></span>
              )}

            <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
              <Button
                className='btn-color-blue'
                bsStyle='primary'
                onClick={closeConfirm}
              >
                Annulla
            </Button>
              <Button
                bsStyle={this.state.error ? 'danger' : 'success'}
                onClick={() => {
                  this.deleteCandidature();
                }}
              >
                Conferma
            </Button>
            </Modal.Footer>
          </Modal>

        </div>
      );
    }
    else {
      return (
        <div className='content'>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title='Candidature'
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table hover>
                      <thead>
                        <tr>
                          {header.map((prop, key) => {
                            return (
                              <th style={{ paddingLeft: '60px' }} key={key}>
                                {prop}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {candidatures &&
                          candidatures.map(element => {
                            return (
                              <tr key={element.last_edit}>
                                <td style={{ paddingLeft: '5px' }}>{element.student.email}</td>
                                <td style={{ paddingLeft: '45px' }}>
                                  {element.notice_protocol}
                                </td>
                                <td style={{ paddingLeft: '45px' }}>
                                  {element.last_edit.split('T')[0]}
                                </td>
                                <td style={{ paddingLeft: '60px' }}>
                                  {statusCandidature(element.state)}
                                </td>
                                <td>{updateButton(element)}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  }
                ></Card>
              </Col>
            </Row>
            <p>Legenda:</p>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureRejected.png'
                alt='no_img'
              />
              Candidatura rifiutata
            </div>

            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                alt='no_img'
                src='/assets/images/statusCandidatureEditable.png'
              />
              Candidatura modificabile
            </div>
            <div>
              <img
                alt='no_img'
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureInEvaluation.png'
              />
              Candidatura in valutazione
            </div>
            <div>

              <img
                alt='no_img'
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureGradList.png'
              />
              La graduatoria per la candidatura è stata pubblicata
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export default Candidature;
