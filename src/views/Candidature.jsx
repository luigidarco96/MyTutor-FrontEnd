import React, { Component } from 'react';
import { Grid, Row, Table, Col, Button } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import axios from 'axios';

class Candidature extends Component {
 
  state = {
    header: [],
    candidatures: [],
    protocol: null,
    show: false
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

  render() {
   
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
              const headers = {
                Authorization: localStorage.getItem('token')
              };
             
              const candidature = {
                student: element.student,
                notice_protocol: element.notice_protocol,
                last_edit: element.last_edit,
                state: 'Rejected'
              };
              //Call servise to delete a candidature
              axios
                .patch(
                  'http://localhost:3001/api/candidatures',
                  { candidature: candidature },
                  { headers: headers }
                )
                .then(blob => {
                
                  let newCandidatures = [];
                  let i = 0;
                  this.state.candidatures.forEach(el => {
                    if (
                      candidature.student === el.student &&
                      candidature.notice_protocol === el.notice_protocol
                    ) {
                      newCandidatures[i++] = blob.data.candidature;
                    } else {
                      newCandidatures[i++] = el;
                    }
                  });
               
                  this.setState({
                    candidatures: newCandidatures
                  });
                });
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
              alt= 'no_img'
            />
          );

        case 'Rejected':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureRejected.png'
              alt= 'no_img'
            />
          );
        case 'In Graded List':
          return (
            <img
              style={{ paddingLeft: '10px', height: '16px' }}
              src='/assets/images/statusCandidatureGradList.png'
              alt= 'no_img'
            />
          );
        default:
          return
      }
    };
    const { header, candidatures } = this.state;
    let pathRegex = /admin\/candidatures\/*/;
    
    if (window.location.pathname === '/admin/candidatures'  || pathRegex.test(window.location.pathname)) {
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
                              <th  style={{paddingLeft:'70px'}} key={key}>
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
                                <td style={{position:'relative', left:'50px'}}>
                                  {element.notice_protocol}
                                </td>
                                <td style={{position:'relative', left:'50px'}}>
                                  {element.last_edit.split('T')[0]}
                                </td>
                                <td style={{position:'relative', left:'63px'}}>
                                  {statusCandidature(element.state)}
                                </td>
                                <td style={{position:'relative', left:'15px'}}>{downoladDocuments(element)}</td>
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
                alt= 'no_img'
              />
              Candidatura rifiutata
            </div>

            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureEditable.png'
                alt= 'no_img'
              />
              Candidatura modificabile
            </div>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                alt= 'no_img'
                src='/assets/images/statusCandidatureInEvaluation.png'
              />
              Candidatura in valutazione
            </div>
            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureGradList.png'
                alt= 'no_img'
              />
              La graduatoria per la candidatura è stata pubblicata
            </div>
          </Grid>
        </div>
      );
    } 
    else  {
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
                alt= 'no_img'
              />
              Candidatura rifiutata
            </div>

            <div>
              <img
                style={{ paddingLeft: '10px', height: '16px' }}
                alt= 'no_img'
                src='/assets/images/statusCandidatureEditable.png'
              />
              Candidatura modificabile
            </div>
            <div>
              <img
              alt= 'no_img'
                style={{ paddingLeft: '10px', height: '16px' }}
                src='/assets/images/statusCandidatureInEvaluation.png'
              />
              Candidatura in valutazione
            </div>
            <div>

              <img
              alt= 'no_img'
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
