import React, {Component, Fragment} from 'react';
import {
    Form, 
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';
export class SignUpStudent extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Nome</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="Scrivi il tuo nome.."
                        />
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Cognome</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="Scrivi il tuo cognome.."
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Matricola</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="Scrivi la tua matricola.."
                        />
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Data Di Nascita</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="La tua data di nascita.."
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Email</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="Scrivi la tua email.."
                        />
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Conferma Email</ControlLabel>
                        <FormControl
                            required
                            type="text"
                            placeholder="Conferma la tua email.."
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Password</ControlLabel>
                        <FormControl
                            required
                            type="password"
                            placeholder="Scrivi la tua password.."
                        />
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                        <ControlLabel style={{'margin-top':'3px'}}>Conferma password</ControlLabel>
                        <FormControl
                            required
                            type="password"
                            placeholder="Conferma la tua password.."
                        />
                        </Col>
                </FormGroup>
                <Button 
                    variant="dark" 
                    type='submit' 
                    className='pull-right' 
                    style={{'margin':'1.5rem'}}>
                        Registrati</Button>
            </Form>
        )
    }
}