import '../../assets/css/createNotice.css';
import '../../assets/css/global.css';

import axios from 'axios';
import React, { Component } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import {
  Form,
  Col,
  Row,
  FormControl,
  FormGroup,
  ControlLabel,
  OverlayTrigger,
  Tooltip,
  Table,
  Alert,
  Glyphicon
} from 'react-bootstrap';

const necessary = {
  color: 'red',
  padding: '0 5px',
  fontSize: '13px',
  fontFamily: '"Times New Roman", serif'
};

/**
 * View: NoticeManager.jsx
 * If the prop 'notice' is set, this component is used for the notice's editing.
 * If the prop 'notice is not set, this component is used for the notice creation.
 *
 * @author Federico Allegretti
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 *
 */
export default class CreateNotice extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      editNoticeLoaded: false,
      professorsLoaded: false,
      error: null,
      user: {},
      professors: [],
      editing: false,
      notice: {
        protocol: null,
        referent_professor: null,
        description: null,
        notice_subject: null,
        admission_requirements: null,
        assessable_titles: null,
        how_to_submit_applications: null,
        selection_board: null,
        acceptance: null,
        incompatibility: null,
        termination_of_the_assignment: null,
        nature_of_the_assignment: null,
        unused_funds: null,
        responsible_for_the_procedure: null,
        notice_funds: null,
        state: 'DRAFT',
        type: null,
        deadline: null,
        notice_file: null,
        graded_list_file: null,
        articles: null,
        evaluation_criteria: null,
        application_sheet: null,
        assignments: null,
        comment: null
      }
    };
  }

  handleEditType() {
    const {
      match: { params }
    } = this.props;

    if (params.id) {
      return 'Applica Modifica';
    } else {
      return 'Crea bando';
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { notice } = this.state;

    const {
      match: { params }
    } = this.props;

    this.setState({
      error: null
    });

    if (params.id) {
      // Change the notice
      console.log(/^Prot\. n\. [0-9]+$/.test(notice.protocol));
      if (!/^Prot\. n\. [0-9]+$/.test(notice.protocol)) {
        console.log('Sono nel test!');
        notice.protocol = `Prot. n. ${notice.protocol}`;
      }

      axios({
        method: 'PATCH',
        url: 'http://localhost:3001/api/notices',
        data: {
          user: this.state.user,
          notice: notice
        },
        headers: {
          Authorization: this.state.token
        }
      })
        .then(blob => {
          window.location = '/notices';
        })
        .catch(error => {
          if (error) {
            notice.protocol = notice.protocol.replace('Prot. n. ', '');
            this.setState({
              error: <Alert bsStyle='danger'>{error.response.data.error}</Alert>
            });
          }
        });
    } else {
      if (!notice.protocol) {
        this.setState({
          error: <Alert bsStyle='danger'>Inserisci il protocollo</Alert>
        });
        return;
      } else if (notice.protocol.length > 7) {
        this.setState({
          error: (
            <Alert bsStyle='danger'>
              Il protocollo non può essere più lungo di 7 caratteri.
            </Alert>
          )
        });
        return;
      }

      let errorAssignCode = false;
      let regexAssignCode = /^[A-Z]+\/([0-9]{2}|[0-9]{3})$/;

      if (notice.assignments) {
        notice.assignments.forEach(assignment => {
          if (!regexAssignCode.test(assignment.code)) {
            errorAssignCode = true;
          }
        });

        if (errorAssignCode) {
          this.setState({
            error: (
              <Alert bsStyle='warning'>
                Verifica che i codici degli incarici rispettano il formato.
              </Alert>
            )
          });
          return;
        }
      }

      if (!/^Prot\. n\. [0-9]+$/.test(notice.protocol)) {
        notice.protocol = `Prot. n. ${notice.protocol}`;
      }

      // Create the notice
      axios({
        method: 'PUT',
        url: 'http://localhost:3001/api/notices',
        data: {
          user: this.state.user,
          notice: notice
        },
        headers: {
          Authorization: this.state.token
        }
      })
        .then(blob => {
          window.location = '/notices';
        })
        .catch(error => {
          if (error) {
            notice.protocol = notice.protocol.replace('Prot. n. ', '');
            this.setState({
              error: <Alert bsStyle='danger'>{error.response.data.error}</Alert>
            });
          }
        });
    }
  }

  handleAssignmentDeletion(e, element) {
    e.stopPropagation();
    e.preventDefault();

    const { notice } = this.state;
    notice.assignments.splice(notice.assignments.indexOf(element), 1);

    this.setState({ notice });
  }

  handleArticleDeletion(e, element) {
    e.stopPropagation();
    e.preventDefault();

    const { notice } = this.state;
    notice.articles.splice(notice.articles.indexOf(element), 1);

    this.setState({ notice });
  }

  handleEvaluationCriterionDeletion(e, element) {
    e.stopPropagation();
    e.preventDefault();

    const { notice } = this.state;
    notice.evaluation_criteria.splice(
      notice.evaluation_criteria.indexOf(element),
      1
    );

    this.setState({ notice });
  }

  handleAddArticle(e) {
    e.preventDefault();

    const { notice } = this.state;

    if (notice.articles === null) {
      notice.articles = [];
    }

    notice.articles.push({
      id: null,
      notice_protocol: 'Prot. n. ' + notice.protocol,
      text: null,
      initial: null
    });

    this.setState({
      notice: notice
    });
  }

  handleAddCriteria(e) {
    e.preventDefault();

    const { notice } = this.state;

    if (notice.evaluation_criteria === null) {
      notice.evaluation_criteria = [];
    }

    notice.evaluation_criteria.push({
      notice_protocol: 'Prot. n. ' + notice.protocol,
      name: null,
      max_score: null
    });

    this.setState({
      notice: notice
    });
  }

  handleAddAssignment(e) {
    e.preventDefault();

    const { notice } = this.state;

    if (notice.assignments === null) {
      notice.assignments = [];
    }

    notice.assignments.push({
      id: null,
      notice_protocol: 'Prot. n. ' + notice.protocol,
      student: null,
      code: null,
      activity_description: null,
      total_number_hours: null,
      title: null,
      hourly_cost: null,
      ht_fund: null,
      state: 'Unassigned',
      note: null
    });

    this.setState({
      notice: notice
    });
  }

  handleChange(e) {
    const { notice } = this.state;
    const el = e.target;

    let value = '' + el.value;

    if (el.name === 'protocol') {
      let regexProtocol = /^\d+$/;

      if (!regexProtocol.test(value.trim()) && value.trim() !== '') {
        el.style.border = '1px solid red';
      } else {
        el.style.border = '';
      }

      if (notice.assignments) {
        notice.assignments.map(element => {
          element.notice_protocol = 'Prot. n.' + value;
        });
      }

      if (notice.evaluation_criteria) {
        notice.evaluation_criteria.map(element => {
          element.notice_protocol = 'Prot. n.' + value;
        });
      }

      if (notice.articles) {
        notice.articles.map(element => {
          element.notice_protocol = 'Prot. n.' + value;
        });
      }
    }

    if (el.name === 'code') {
      let regexAssignCode = /^[A-Z]+\/([0-9]{2}|[0-9]{3})$/;

      if (!regexAssignCode.test(value.trim())) {
        el.style.border = '1px solid red';
      } else {
        el.style.border = '';
      }
    }

    let elClass = '' + el.className;
    let elName = '' + el.name;

    if (elClass.includes('list')) {
      elClass = elClass.split(' ')[0].split('.');
      let elKey = elClass[1];
      let index = Number(elClass[0]);

      if (el.type === 'number') {
        notice[elKey][index][elName] = Number(value);
      } else {
        notice[elKey][index][elName] = value;
      }
    } else {
      if (el.type === 'number') {
        notice[elName] = Number(value);
      } else if (el.type === 'date') {
        notice[elName] = value;
      } else {
        notice[elName] = value;
      }
    }

    this.setState({ notice });
  }

  handleFocus(e) {
    let el = e.target;

    el.className += ' typing';
  }

  handleBlur(e) {
    const el = e.target;

    let value = '' + el.value;
    el.disabled = value.length > 0;

    el.className = el.className.replace('typing', '');
    el.className = el.className.trim();
  }

  handleMouseEnter(e) {
    if (this.state.editing && e.target.name === 'protocol') {
      return;
    }
    e.target.disabled = false;
  }

  handleMouseOut(e) {
    let el = e.target;
    let elClass = el.className;
    if (elClass.includes('typing')) {
      return;
    } else {
      let value = '' + el.value;
      el.disabled = value.length > 0;
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');

    const { professorsLoaded, editNoticeLoaded } = this.state;

    const {
      match: { params }
    } = this.props;

    // Fetch notice information if the protocol its been passed
    if (params.id) {
      if (
        user != null &&
        user.role === 'Teaching Office' &&
        !editNoticeLoaded
      ) {
        axios
          .get(`http://localhost:3001/api/notices/${params.id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          .then(blob => {
            let notice = blob.data.notices[0];

            notice.protocol = notice.protocol.replace('Prot. n. ', '');
            if (notice.deadline) {
              notice.deadline = notice.deadline.split(' ')[0];
            }

            this.setState({
              editing: true,
              notice: notice,
              editNoticeLoaded: true
            });
          });
      }
    }

    // Fetch all professor
    if (!professorsLoaded) {
      axios
        .post(
          'http://localhost:3001/api/users/search',
          {
            param: {
              role: 'Professor'
            }
          },
          {
            headers: { Authorization: token }
          }
        )
        .then(blob => {
          this.setState({
            professors: blob.data.list,
            professorsLoaded: true
          });
        });
    }

    this.setState({
      token: token
    });
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const {
      notice,
      notice: { articles },
      notice: { evaluation_criteria },
      notice: { assignments },
      error,
      professors
    } = this.state;

    return (
      <div className='container-fluid'>
        <Form onSubmit={e => this.handleFormSubmit(e)}>
          <FormGroup>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Protocollo</ControlLabel>
                <div
                  className='protocol-input'
                  style={{ margin: 0, padding: 0 }}
                >
                  <p>Prot. n. </p>
                  <FormControl
                    type='text'
                    placeholder='Inserisci il protocollo (max. 7 numeri)'
                    name='protocol'
                    value={this.state.notice.protocol}
                    onFocus={e => this.handleFocus(e)}
                    onBlur={e => this.handleBlur(e)}
                    onMouseEnter={e => this.handleMouseEnter(e)}
                    onMouseOut={e => this.handleMouseOut(e)}
                    onChange={e => this.handleChange(e)}
                    disabled={this.state.editing ? true : false}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Professore</ControlLabel>
                <FormControl
                  componentClass='select'
                  name='referent_professor'
                  value={this.state.notice.referent_professor}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                >
                  <option value=''>Nessuna Scelta</option>
                  {professors.map((professor, index) => {
                    return (
                      <option value={professor.email} key={index}>
                        {professor.name + ' ' + professor.surname}
                      </option>
                    );
                  })}
                </FormControl>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={12}>
                <ControlLabel>Incarichi</ControlLabel>
                <span style={necessary}>Compilare tutti i campi</span>
                <Table id='assignments' striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Elimina</th>
                      <th>Codice</th>
                      <th>Descrizione</th>
                      <th>Ore totali</th>
                      <th>Retribuzione oraria</th>
                      <th>Titolo</th>
                      <th>Fondo HT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments &&
                      assignments.map((el, index) => {
                        return (
                          <tr key={el.id}>
                            <td className='icon-container'>
                              <Glyphicon
                                glyph='trash'
                                onMouseLeave={e => {
                                  e.target.style.color = '#565656';
                                }}
                                onMouseOver={e => {
                                  e.target.style.color = '#274f77';
                                }}
                                onClick={event =>
                                  this.handleAssignmentDeletion(event, el)
                                }
                              />
                            </td>
                            <td>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip>
                                    Es. <strong>SO/01</strong>
                                  </Tooltip>
                                }
                              >
                                <FormControl
                                  className={index + '.assignments list'}
                                  name='code'
                                  value={el.code}
                                  type='text'
                                  onFocus={e => this.handleFocus(e)}
                                  onBlur={e => this.handleBlur(e)}
                                  onMouseEnter={e => this.handleMouseEnter(e)}
                                  onMouseOut={e => this.handleMouseOut(e)}
                                  onChange={e => this.handleChange(e)}
                                />
                              </OverlayTrigger>
                            </td>
                            <td>
                              <FormControl
                                className={index + '.assignments list'}
                                name='activity_description'
                                value={el.activity_description}
                                componentClass='textarea'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.assignments list'}
                                name='total_number_hours'
                                value={el.total_number_hours}
                                type='number'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.assignments list'}
                                name='hourly_cost'
                                value={el.hourly_cost}
                                type='number'
                                step='0.01'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                            <td>
                              <FormControl
                                componentClass='select'
                                className={index + '.assignments list'}
                                name='title'
                                value={el.title}
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              >
                                <option value=''>Nessuna Scelta</option>
                                <option value='PhD'>Dottorato</option>
                                <option value='Master'>Magistrale</option>
                              </FormControl>
                            </td>
                            <td>
                              <FormControl
                                className={index + '.assignments list'}
                                name='ht_fund'
                                value={el.ht_fund}
                                type='text'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <CustomButton
                  bsStyle='primary'
                  block={true}
                  className='create-notice-csbutton pull-right'
                  onClick={e => this.handleAddAssignment(e)}
                >
                  Aggiungi incarico
                </CustomButton>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Descrizione bando</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci la descrizione del bando (max. 300 caratteri)'
                  name='description'
                  rows={4}
                  value={notice.description}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Responsabile delle procedure</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci il responsabile delle procedure'
                  name='responsible_for_the_procedure'
                  rows={4}
                  value={notice.responsible_for_the_procedure}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Oggetto del bando</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci l'oggetto del bando (max. 2000 caratteri)"
                  name='notice_subject'
                  value={notice.notice_subject}
                  rows={4}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Requisiti di ammissione</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci i requisiti di ammissione (max. 5000 caratteri)'
                  name='admission_requirements'
                  rows={4}
                  value={notice.admission_requirements}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={12}>
                <ControlLabel>Criteri di valutazione</ControlLabel>
                <span style={necessary}>Compilare tutti i campi</span>
                <Table id='criteria' striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Elimina</th>
                      <th>Nome</th>
                      <th>Valore Massimo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluation_criteria &&
                      evaluation_criteria.map((el, index) => {
                        return (
                          <tr key={index}>
                            <td className='icon-container'>
                              <Glyphicon
                                glyph='trash'
                                onMouseLeave={e => {
                                  e.target.style.color = '#565656';
                                }}
                                onMouseOver={e => {
                                  e.target.style.color = '#274f77';
                                }}
                                onClick={event =>
                                  this.handleEvaluationCriterionDeletion(
                                    event,
                                    el
                                  )
                                }
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.evaluation_criteria list'}
                                name='name'
                                value={el.name}
                                type='text'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.evaluation_criteria list'}
                                name='max_score'
                                value={el.max_score}
                                type='number'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <CustomButton
                  bsStyle='primary'
                  block={true}
                  className='create-notice-csbutton pull-right'
                  onClick={e => this.handleAddCriteria(e)}
                >
                  Aggiungi criterio
                </CustomButton>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Titoli Valutabili</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci i titoli valutabili (max. 5000)'
                  name='assessable_titles'
                  rows={4}
                  value={notice.assessable_titles}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>
                  Modalità di presentazione delle domande
                </ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci come inviare la domanda (max. 5000)'
                  name='how_to_submit_applications'
                  rows={4}
                  value={notice.how_to_submit_applications}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Commissione Giudicatrice</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo la commissione giudicatrice (max. 5000)'
                  name='selection_board'
                  rows={4}
                  value={notice.selection_board}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Accettazione incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo l'accettazione dell'incarico (max. 5000)"
                  name='acceptance'
                  rows={4}
                  value={notice.acceptance}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Incompatibilità</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo le incompatibilità (max. 5000)'
                  name='incompatibility'
                  rows={4}
                  value={notice.incompatibility}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Cessazione dell'incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo la cessazione dell'incarico (max. 5000)"
                  name='termination_of_the_assignment'
                  rows={4}
                  value={notice.termination_of_the_assignment}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Natura dell'incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo la natura dell'incarico (max. 5000)"
                  name='nature_of_the_assignment'
                  rows={4}
                  value={notice.nature_of_the_assignment}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={6}>
                <ControlLabel>Borse non utilizzate</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo le borse non utilizzate (max. 5000)'
                  name='unused_funds'
                  rows={4}
                  value={notice.unused_funds}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={4}>
                <ControlLabel>Tipo bando</ControlLabel>
                <FormControl
                  componentClass='select'
                  placeholder='Tipo bando'
                  name='type'
                  value={notice.type}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                >
                  <option value=''>Scegli tipo</option>
                  <option value='Tutoring'>Tutorato</option>
                  <option value='Help Teaching'>Help Teaching</option>
                </FormControl>
              </Col>
              <Col xs={12} md={4}>
                <ControlLabel>Scadenza</ControlLabel>
                <FormControl
                  type='date'
                  placeholder='Scadenza bando'
                  name='deadline'
                  value={notice.deadline}
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col xs={12} md={4}>
                <ControlLabel>Fondi</ControlLabel>
                <FormControl
                  type='number'
                  placeholder='Fondi'
                  name='notice_funds'
                  value={notice.notice_funds}
                  step='0.01'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={12}>
                <ControlLabel>Articoli</ControlLabel>
                <span style={necessary}>Compilare tutti i campi</span>
                <Table id='articles' striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Elimina</th>
                      <th>Sigla</th>
                      <th>Testo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles &&
                      articles.map((el, index) => {
                        return (
                          <tr key={index}>
                            <td className='icon-container'>
                              <Glyphicon
                                glyph='trash'
                                onMouseLeave={e => {
                                  e.target.style.color = '#565656';
                                }}
                                onMouseOver={e => {
                                  e.target.style.color = '#274f77';
                                }}
                                onClick={event =>
                                  this.handleArticleDeletion(event, el)
                                }
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.articles list'}
                                name='initial'
                                value={el.initial}
                                type='text'
                                placeholder='Es: VISTO, VISTA, ...'
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                            <td>
                              <FormControl
                                className={index + '.articles list'}
                                type='text'
                                name='text'
                                value={el.text}
                                onFocus={e => this.handleFocus(e)}
                                onBlur={e => this.handleBlur(e)}
                                onMouseEnter={e => this.handleMouseEnter(e)}
                                onMouseOut={e => this.handleMouseOut(e)}
                                onChange={e => this.handleChange(e)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <CustomButton
                  bsStyle='primary'
                  block={true}
                  className='create-notice-csbutton pull-right'
                  onClick={e => this.handleAddArticle(e)}
                >
                  Aggiungi articolo
                </CustomButton>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={12}>
                <CustomButton
                  bsStyle='success'
                  create-notice-csbutton
                  type='submit'
                >
                  {this.handleEditType()}
                </CustomButton>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={12}>
                {error}
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
