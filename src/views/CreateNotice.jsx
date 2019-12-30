import React, { Component } from 'react';
import '../assets/css/createNotice.css';
import '../assets/css/global.css';
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
  Table
} from 'react-bootstrap';

export default class CreateNotice extends Component {
  constructor() {
    super();
    this.state = {
      notice: {
        protocol: '',
        referent_professor: null,
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
        state: 'DRAFT',
        type: '',
        deadline: '',
        notice_file: null,
        graded_list_file: null,
        assignments: [],
        evaluation_criteria: [],
        articles: [],
        application_sheet: null
      }
    };
  }

  handleAddArticle(e) {
    e.preventDefault();
    const { notice } = this.state;

    notice.articles.push({
      notice_protocol: '',
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

    notice.evaluation_criteria.push({
      name: '',
      max_value: 0
    });

    this.setState({
      notice: notice
    });
  }

  handleAddAssignment(e) {
    e.preventDefault();

    const { notice } = this.state;

    notice.assignments.push({
      notice_protocol: '',
      student: null,
      code: '',
      activity_description: '',
      total_number_hours: 0,
      title: '',
      hourly_cost: 0,
      ht_fund: null,
      state: '',
      note: null
    });

    this.setState({ notice: notice });
  }

  handleFocus(e) {
    let el = e.target;

    el.className += ' typing';
  }

  handleBlur(e) {
    const { notice } = this.state;
    const el = e.target;
    let value = '' + el.value;
    el.disabled = value.length > 0;

    el.className = el.className.replace('typing', '');
    el.className = el.className.trim();

    let elClass = '' + el.className;
    let elName = '' + el.name;

    if (elClass.includes('list')) {
      elClass = elClass.split(' ')[0].split('.');
      let elKey = elClass[1];
      let index = Number(elClass[0]);
      notice[elKey][index][elName] = el.value;
    } else {
      notice[elName] = value;
    }
    console.clear();
    console.log(notice);
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

  render() {
    const {
      notice: { articles },
      notice: { evaluation_criteria },
      notice: { assignments }
    } = this.state;

    return (
      <div className='container-fluid custom-body-view'>
        <Form>
          <FormGroup>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
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
                    onFocus={e => this.handleFocus(e)}
                    onBlur={e => this.handleBlur(e)}
                    onMouseEnter={e => this.handleMouseEnter(e)}
                    onMouseOut={e => this.handleMouseOut(e)}
                  />
                </OverlayTrigger>
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={10}>
                <ControlLabel>Incarichi</ControlLabel>
                <Table id='assignments' striped bordered hover>
                  <thead>
                    <tr>
                      <th>Codice</th>
                      <th>Descrizione</th>
                      <th>Ore totali</th>
                      <th>Retribuzione oraria</th>
                      <th>Fondo HT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*TODO: Lista incarichi */
                    assignments.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <FormControl
                              className={index + '.assignments list'}
                              name='code'
                              type='text'
                              placeholder='Inserisci il codice'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.assignments list'}
                              name='activity_description'
                              componentClass='textarea'
                              placeholder="Descrivi l'incarico (max. 200)"
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.assignments list'}
                              name='total_number_hours'
                              type='text'
                              placeholder='Ore totali'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.assignments list'}
                              name='hourly_cost'
                              type='text'
                              placeholder='Retribuzione oraria'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.assignments list'}
                              name='ht_fund'
                              type='text'
                              placeholder='Fondo HT'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
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
              <Col xs={12} md={5}>
                <ControlLabel>Descrizione bando</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci la descrizione del bando (max. 300 caratteri)'
                  name='description'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
                <ControlLabel>Oggetto del bando</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci l'oggetto del bando (max. 2000 caratteri)"
                  name='notice_subject'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
                <ControlLabel>Requisiti di ammissione</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci i requisiti di ammissione (max. 5000 caratteri)'
                  name='admission_requirements'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={10}>
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
                              type='text'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.evaluation_criteria list'}
                              name='max_value'
                              type='text'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
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
              <Col xs={12} md={5}>
                <ControlLabel>Titoli Valutabili</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci i titoli valutabili (max. 5000)'
                  name='assessable_titles'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
              <Col xs={12} md={5}>
                <ControlLabel>
                  Modalità di presentazione delle domande
                </ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci come inviare la domanda (max. 5000)'
                  name='how_to_submit_applications'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
                <ControlLabel>Commissione Giudicatrice</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo la commissione giudicatrice (max. 5000)'
                  name='selection_board'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
              <Col xs={12} md={5}>
                <ControlLabel>Accettazione incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo l'accettazione dell'incarico (max. 5000)"
                  name='acceptance'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
                <ControlLabel>Incompatibilità</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo le incompatibilità (max. 5000)'
                  name='incompatibility'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
              <Col xs={12} md={5}>
                <ControlLabel>Cessazione dell'incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo la cessazione dell'incarico (max. 5000)"
                  name='termination_of_the_assignment'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={5}>
                <ControlLabel>Natura dell'incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder="Inserisci informazioni riguardo la natura dell'incarico (max. 5000)"
                  name='nature_of_the_assignment'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
              <Col xs={12} md={5}>
                <ControlLabel>Borse non utilizzate</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  placeholder='Inserisci informazioni riguardo le borse non utilizzate (max. 5000)'
                  name='unused_funds'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={6} md={2}>
                <ControlLabel>Tipo bando</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Tipo bando'
                  name='type'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
              <Col xs={6} md={2}>
                <ControlLabel>Scadenza</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Scadenza bando'
                  name='deadline'
                  onFocus={e => this.handleFocus(e)}
                  onBlur={e => this.handleBlur(e)}
                  onMouseEnter={e => this.handleMouseEnter(e)}
                  onMouseOut={e => this.handleMouseOut(e)}
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={12} md={10}>
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
                              type='text'
                              placeholder='Es: VISTO, VISTA, ...'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
                            />
                          </td>
                          <td>
                            <FormControl
                              className={index + '.articles list'}
                              type='text'
                              name='text'
                              placeholder='Inserisci articolo'
                              onFocus={e => this.handleFocus(e)}
                              onBlur={e => this.handleBlur(e)}
                              onMouseEnter={e => this.handleMouseEnter(e)}
                              onMouseOut={e => this.handleMouseOut(e)}
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
                  Crea bando
                </CustomButton>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
