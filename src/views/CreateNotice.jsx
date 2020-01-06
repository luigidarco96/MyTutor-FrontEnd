import '../assets/css/createNotice.css';
import '../assets/css/global.css';

import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../components/CustomButton/CustomButton';
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
  Alert
} from 'react-bootstrap';

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
      error: null,
      user: {},
      professors: [],
      notice: {
        protocol: '',
        referent_professor: '',
        description: '',
        notice_subject: '',
        admission_requirements: '',
        assessable_titles: '',
        how_to_submit_applications: '',
        selection_board: '',
        acceptance: '',
        incompatibility: '',
        termination_of_the_assignment: '',
        nature_of_the_assignment: '',
        unused_funds: '',
        responsible_for_the_procedure: '',
        notice_funds: 0,
        state: 'DRAFT',
        type: '',
        deadline: '',
        notice_file: null,
        graded_list_file: null,
        articles: [],
        evaluation_criteria: [],
        application_sheet: null,
        assignments: [],
        comment: null
      },
      noticeControl: {
        protocol: false,
        referent_professor: true,
        description: false,
        notice_subject: false,
        admission_requirements: false,
        assessable_titles: false,
        how_to_submit_applications: false,
        selection_board: false,
        acceptance: false,
        incompatibility: false,
        termination_of_the_assignment: false,
        nature_of_the_assignment: false,
        unused_funds: false,
        responsible_for_the_procedure: false,
        notice_funds: false,
        state: true,
        type: false,
        deadline: true,
        notice_file: true,
        graded_list_file: true,
        assignments: [],
        evaluation_criteria: [],
        articles: [],
        application_sheet: true,
        comment: true
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
    const { noticeControl, notice } = this.state;

    const {
      match: { params }
    } = this.props;

    let allTrue = true;

    console.clear();
    console.info('Funzione per creare il bando.');
    console.log(noticeControl);
    console.log(notice);
    for (let el in noticeControl) {
      if (
        el === 'articles' ||
        el === 'evaluation_criteria' ||
        el === 'assignments'
      ) {
        let cur = el;
        if (noticeControl[cur].lengh === 0) {
          allTrue = false;
        } else {
          noticeControl[cur].map((article, index) => {
            for (let key in noticeControl[cur][index]) {
              if (noticeControl[cur][index][key] === false) {
                allTrue = false;
              }
            }
          });
        }
      } else {
        if (noticeControl[el] === false) {
          allTrue = false;
        }
      }
    }

    if (!allTrue) {
      this.setState({
        error: (
          <Alert bsStyle='danger'>
            Attenzione! Controllare se sono stati inseriti tutti i parametri.
          </Alert>
        )
      });
      return false;
    }

    this.setState({
      error: null
    });

    // Add space for timestamp
    notice.deadline = notice.deadline + ' ';

    if (params.id) {
      // Change the notice
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
      }).then(blob => {
        let error = blob.data.error;

        if (Boolean(error)) {
          this.setState({
            error: <Alert bsStyle='danger'>{error}</Alert>
          });
        }
      });
    } else {
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
      }).then(blob => {
        let error = blob.data.error;

        if (Boolean(error)) {
          this.setState({
            error: <Alert bsStyle='danger'>{error}</Alert>
          });
        }
      });
    }

    window.location = 'notices';
  }

  handleAddArticle(e) {
    e.preventDefault();

    const { notice, noticeControl } = this.state;

    notice.articles.push({
      notice_protocol: notice.protocol,
      text: '',
      initial: ''
    });

    noticeControl.articles.push({
      notice_protocol: notice.protocol.length > 0,
      text: false,
      initial: false
    });

    this.setState({
      notice: notice,
      noticeControl: noticeControl
    });
  }

  handleAddCriteria(e) {
    e.preventDefault();

    const { notice, noticeControl } = this.state;

    notice.evaluation_criteria.push({
      notice_protocol: notice.protocol,
      name: '',
      max_score: 0
    });

    noticeControl.evaluation_criteria.push({
      notice_protocol: notice.protocol.length > 0,
      name: false,
      max_score: false
    });

    this.setState({
      notice: notice,
      noticeControl: noticeControl
    });
  }

  handleAddAssignment(e) {
    e.preventDefault();

    const { notice, noticeControl } = this.state;

    notice.assignments.push({
      notice_protocol: notice.protocol,
      student: null,
      code: '',
      activity_description: '',
      total_number_hours: 0,
      title: '',
      hourly_cost: 0,
      ht_fund: '',
      state: 'Unassigned',
      note: null
    });

    noticeControl.assignments.push({
      notice_protocol: notice.protocol.length > 0,
      student: true,
      code: false,
      activity_description: false,
      total_number_hours: false,
      title: false,
      hourly_cost: false,
      ht_fund: true,
      state: true,
      note: true
    });

    this.setState({
      notice: notice,
      noticeControl: noticeControl
    });
  }

  handleChange(e) {
    const { notice, noticeControl } = this.state;
    const el = e.target;

    let value = '' + el.value;

    if (el.name === 'protocol') {
      notice.assignments.map(element => {
        element.notice_protocol = value;
      });
      notice.evaluation_criteria.map(element => {
        element.notice_protocol = value;
      });
      notice.articles.map(element => {
        element.notice_protocol = value;
      });
      noticeControl.assignments.map(element => {
        element.notice_protocol = value.length > 0;
      });
      noticeControl.evaluation_criteria.map(element => {
        element.notice_protocol = value.length > 0;
      });
      noticeControl.articles.map(element => {
        element.notice_protocol = value.length > 0;
      });
    }

    let elClass = '' + el.className;
    let elName = '' + el.name;

    if (elClass.includes('list')) {
      elClass = elClass.split(' ')[0].split('.');
      let elKey = elClass[1];
      let index = Number(elClass[0]);

      if (el.type === 'number') {
        notice[elKey][index][elName] = Number(value);
        noticeControl[elKey][index][elName] = Number(value) > 0;
      } else {
        notice[elKey][index][elName] = value;
        noticeControl[elKey][index][elName] =
          elName !== 'ht_fund' ? value.length > 0 : true;
      }
    } else {
      if (el.type === 'number') {
        notice[elName] = Number(value);
        noticeControl[elName] = Number(value) > 0;
      } else if (el.type === 'date') {
        notice[elName] = value;
        noticeControl[elName] = Boolean(value + ' ');
      } else {
        notice[elName] = value;
        noticeControl[elName] = value.length > 0;
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
    el.disabled = el.name !== 'ht_fund' ? value.length > 0 : true;

    el.className = el.className.replace('typing', '');
    el.className = el.className.trim();
  }

  handleMouseEnter(e) {
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
    let noticeControl;

    const {
      match: { params }
    } = this.props;

    // Fetch notice information if the protocol its been passed
    if (params.id) {
      if (
        user != null &&
        (user.role === 'Teaching Office' ||
          user.role === 'DDI' ||
          user.role === 'Professor')
      ) {
        axios
          .get(`http://localhost:3001/api/notices/${params.id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          .then(blob => {
            let notice = blob.data.notices[0];
            notice.deadline = notice.deadline.split('T')[0];

            noticeControl = {
              protocol: true,
              referent_professor: true,
              description: true,
              notice_subject: true,
              admission_requirements: true,
              assessable_titles: true,
              how_to_submit_applications: true,
              selection_board: true,
              acceptance: true,
              incompatibility: true,
              termination_of_the_assignment: true,
              nature_of_the_assignment: true,
              unused_funds: true,
              responsible_for_the_procedure: true,
              notice_funds: true,
              state: true,
              type: true,
              deadline: true,
              notice_file: true,
              graded_list_file: true,
              assignments: [],
              evaluation_criteria: [],
              articles: [],
              application_sheet: true,
              comment: true
            };

            notice.assignments.map(el => {
              noticeControl.assignments.push({
                notice_protocol: notice.protocol.length > 0,
                student: true,
                code: true,
                activity_description: true,
                total_number_hours: true,
                title: true,
                hourly_cost: true,
                ht_fund: true,
                state: true,
                note: true
              });
            });

            notice.articles.map(el => {
              noticeControl.articles.push({
                notice_protocol: notice.protocol.length > 0,
                text: true,
                initial: true
              });
            });

            notice.evaluation_criteria.map(el => {
              noticeControl.evaluation_criteria.push({
                notice_protocol: notice.protocol.length > 0,
                name: true,
                max_score: true
              });
            });

            this.setState({ notice: notice, noticeControl: noticeControl });
          });
      }
    }
    // Fetch all professor
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
          user: user,
          token: token
        });
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

    console.log(notice);

    return (
      <div className='container-fluid custom-body-view'>
        <Form onSubmit={e => this.handleFormSubmit(e)}>
          <FormGroup>
            <Row className='create-notice-row'>
              <Col xs={12} md={6}>
                <ControlLabel>Protocollo</ControlLabel>
                <OverlayTrigger
                  trigger='focus'
                  placement='top'
                  overlay={
                    <Tooltip id='overload-top'>
                      <strong>Esempio:</strong> Prot. n. 0274751
                    </Tooltip>
                  }
                >
                  <FormControl
                    type='text'
                    placeholder='Inserisci il protocollo'
                    name='protocol'
                    value={this.state.notice.protocol}
                    onFocus={e => this.handleFocus(e)}
                    onBlur={e => this.handleBlur(e)}
                    onMouseEnter={e => this.handleMouseEnter(e)}
                    onMouseOut={e => this.handleMouseOut(e)}
                    onChange={e => this.handleChange(e)}
                  />
                </OverlayTrigger>
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
                <Table id='assignments' striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Codice</th>
                      <th>Descrizione</th>
                      <th>Ore totali</th>
                      <th>Retribuzione oraria</th>
                      <th>Titolo</th>
                      <th>Fondo HT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*TODO: Lista incarichi */
                    assignments.map((el, index) => {
                      return (
                        <tr key={el.id}>
                          <td>
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

                <Table id='criteria' striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valore Massimo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*TODO: Aggiungere Criteri di valutazione*/
                    evaluation_criteria.map((el, index) => {
                      return (
                        <tr key={index}>
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
                <Table id='articles' striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sigla</th>
                      <th>Testo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* TODO: aggiungere articoli*/
                    articles.map((el, index) => {
                      return (
                        <tr key={index}>
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
