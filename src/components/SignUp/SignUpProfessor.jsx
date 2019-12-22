import React, { Component } from 'react';
import {
    Form,
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';
export class SignUpProfessor extends Component {
    render() {
        return (
            <Form>
                    <FormGroup>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Nome</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="text"
                                placeholder="Scrivi il tuo nome.."
                            />
                        </Col>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Cognome</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="text"
                                placeholder="Scrivi il tuo cognome.."
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Data Di Nascita</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="text"
                                placeholder="La tua data di nascita.."
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Email</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="text"
                                placeholder="Scrivi la tua email.."
                            />
                        </Col>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Conferma Email</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="text"
                                placeholder="Conferma la tua email.."
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Password</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="password"
                                placeholder="Scrivi la tua password.."
                            />
                        </Col>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                            <ControlLabel style={{ 'margin-top': '3px' }}>Conferma password</ControlLabel>
                            <FormControl
                                style={{width:'400px'}}
                                required
                                type="password"
                                placeholder="Conferma la tua password.."
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={6} lg={6} sm={6} style={{padding:'6px'}}>
                        <ControlLabel style={{ visibility: 'hidden','margin-top': '3px' }}>Conferma password</ControlLabel>
                        <FormControl
                        style={{width:'400px'}}    style={{ visibility: 'hidden' }}/>
                        </Col>
                    </FormGroup>
                <Button
                    variant="dark"
                    type='submit'
                    className='pull-right'
                    style={{ 'margin': '1.5rem' }}>
                    Registrati</Button>
            </Form>
        )
    }
}

export default SignUpProfessor;