import React, { Component } from 'react';
import '../assets/css/createNotice.css';
import {
  Form,
  Col,
  Row,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap';

export default class CreateNotice extends Component {
  render() {
    return (
      <div
        className='container-fluid'
        style={{ padding: '10px', minHeight: 'fit-available' }}
      >
        <Form>
          <FormGroup>
            <Row className='create-notice-row'>
              <Col xs={5} md={5}>
                <ControlLabel>Protocollo</ControlLabel>
                <FormControl
                  type='text'
                  name='protocol'
                  placeholder='Inserisci il protocollo'
                />
              </Col>
              <Col xs={5} md={5}>
                <ControlLabel>Codice Incarico</ControlLabel>
                <FormControl
                  type='text'
                  name='assignment-code'
                  placeholder="Inserisci il codice dell'incarico"
                />
              </Col>
            </Row>
            <Row className='create-notice-row'>
              <Col xs={5} md={5}>
                <ControlLabel>Descrizione bando</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  name='description'
                  placeholder='Inserisci la descrizione del bando (max. 300 caratteri)'
                />
              </Col>
              <Col xs={5} md={5}>
                <ControlLabel>Descrizione incarico</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  name='assignment-description'
                  placeholder="Inserisci la descrizione dell'incarico (max. 300 caratteri)"
                />
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
