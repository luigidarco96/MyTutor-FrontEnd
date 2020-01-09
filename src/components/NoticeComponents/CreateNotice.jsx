import '../../assets/css/createNotice.css';
import '../../assets/css/global.css';

import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    console.clear();
    console.info('Funzione per creare il bando.');
    console.log(notice);

    this.setState({
      error: null
    });

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

    // window.location = 'notices';
  }

  handleAddArticle(e) {
    e.preventDefault();

    const { notice } = this.state;

    if (notice.articles === null) {
      notice.articles = [];
    }

    notice.articles.push({
      notice_protocol: notice.protocol,
      text: '',
      initial: ''
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
      notice_protocol: notice.protocol,
      name: '',
      max_score: 0
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

    this.setState({
      notice: notice
    });
  }

  handleChange(e) {
    const { notice } = this.state;
    const el = e.target;

    let value = '' + el.value;

    if (el.name === 'protocol') {
      if (notice.assignments) {
        notice.assignments.map(element => {
          element.notice_protocol = value;
        });
      }

      if (notice.evaluation_criteria) {
        notice.evaluation_criteria.map(element => {
          element.notice_protocol = value;
        });
      }

      if (notice.articles) {
        notice.articles.map(element => {
          element.notice_protocol = value;
        });
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
      if (user != null && user.role === 'Teaching Office') {
        axios
          .get(`http://localhost:3001/api/notices/${params.id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          .then(blob => {
            this.setState({ notice: blob.data.notices[0] });
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
                <Table id='assignments' striped bordered responsive>
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
                    {assignments &&
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

                <Table id='criteria' striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valore Massimo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluation_criteria &&
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
                <Table id='articles' striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Sigla</th>
                      <th>Testo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles &&
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
