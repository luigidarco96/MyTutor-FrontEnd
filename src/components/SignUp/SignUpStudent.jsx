import React, { Component, Fragment } from 'react';
import {
    Form,
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const Regex = [
    {
        nomeRegex: RegExp(/^[A-Za-z‘]+$/),
        nomeMatch: false
    },
    {
        cognomeRegex: RegExp(/^[A-Za-z‘]+$/),
        cognomeMatch: false
    },
    {
        emailRegex: RegExp(/^[a-z]\.[a-z]+[1-9]*\@studenti.unisa.it$/),
        emailMatch: false
    },
    {
        passRegex: RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/),
        passMatch: false
    },
    {
        dataRegex: RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/),
        dataMatch: false
    },
    {
        matricolaRegex: RegExp(/^[0-9A-Za-z‘]*$/),
        matricolaMatch: false
    }
]

export class SignUpStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cognome: '',
            email: '',
            password: '',
            data: '',
            matricola: '',
            confirmEmail: '',
            confirmPass: '',
            errors: {
                nome: '',
                cognome: '',
                email: '',
                password: '',
                data: '',
                matricola: '',
                confirmEmail: '',
                confirmPass: ''
            }
        };
    }

    render() {
        const {
            nome,
            cognome,
            data,
            email,
            password,
            matricola,
            confirmEmail,
            confirmPass,
            errors
        } = this.state;

        function validateForm() {
            let confirmPassw = confirmPass == password ? true : false;
            let confirmEm = confirmEmail == email ? true : false;
            let last = true;
            Regex.forEach((element) => {
                Object.keys(element).forEach((key, value) => {
                    if (key.endsWith('Match')) {
                        last = last && value;
                    }
                })
            })
            return last && confirmPassw && confirmEm && nome.length > 0 && cognome.length > 0 && email.length > 0
                && password.length > 0 && confirmPass.length > 0 && confirmEmail.length > 0 && matricola.length > 0;
        }

        const handleChange = (event) => {
            event.preventDefault()
            const { name, value } = event.target
            let errors = this.state.errors;

            switch (name) {
                case 'nome':
                    if (value.match(Regex[0].nomeRegex) == null) {
                        errors.nome = 'Il nome può contenere solo caratteri'
                        Regex[0].nomeMatch = false;
                    } else {
                        errors.nome = ''
                        Regex[0].nomeMatch = true;
                    }
                    break;
                case 'cognome':
                    if (value.match(Regex[1].cognomeRegex) == null) {
                        errors.cognome = 'Il cognome può contenere solo caratteri'
                        Regex[1].cognomeMatch = false;
                    } else {
                        errors.cognome = ''
                        Regex[1].cognomeMatch = true;
                    }
                    break;
                case 'email':
                    if (value.match(Regex[2].emailRegex) == null) {
                        errors.email = "l'email deve essere del tipo m.rossi@studenti.unisa.it"
                        Regex[2].emailMatch = false;
                    } else {
                        errors.email = ""
                        Regex[2].emailMatch = true;
                    }
                    if (value == confirmEmail)
                        errors.confirmEmail = ''
                    break;
                case 'password':
                    if (value.match(Regex[3].passRegex) == null) {
                        errors.password = "la password deve contenere una maiuscola e un numero e almeno 8 caratteri"
                        Regex[3].passwordMatch = false;
                    } else {
                        errors.password = ""
                        Regex[3].passwordMatch = true;
                    }
                    if (value == confirmPass)
                        errors.confirmPass = ''
                    break;
                case 'data':
                    if (value.match(Regex[4].dataRegex) == null) {
                        errors.data = 'Formato: yyyy-mm-dd'
                        Regex[4].dataMatch = false;
                    } else {
                        errors.data = ''
                        Regex[4].dataMatch = true;
                    }
                    break;
                case 'confirmPass':
                    if (password != value) {
                        errors.confirmPass = 'La password non corrisponde'
                    } else {
                        errors.confirmPass = ''
                    }
                    break;
                case 'confirmEmail':
                    if (email != value) {
                        errors.confirmEmail = "L'email non corrisponde"
                    } else {
                        errors.confirmEmail = ''
                    }
                    break;
                case 'matricola':
                    if (value.match(Regex[5].matricolaRegex) == null) {
                        errors.matricola = 'La matricola può contenere solo caratteri alfanumerici'
                        Regex[5].matricolaMatch = false;
                    } else {
                        errors.matricola = ''
                        Regex[5].matricolaMatch = true;
                    }
                    break;

                default:
                    break;
            }
            this.setState({ errors, [name]: value })
        }

        const handleSubmit = (event) => {
            event.preventDefault();

            let user = {
                name: nome,
                surname: cognome,
                email: email,
                password: password,
                registration_number: matricola,
                birth_date: data,
                role: null,
                verified: null
            }
            axios.post('http://localhost:3001/api/auth/registerStudent',{student:user})
            .then(response => {
                
            })

        }
        return (
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Nome</ControlLabel>
                        <FormControl
                            name='nome'
                            value={nome}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Scrivi il tuo nome.."
                        />
                        {errors.nome.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.nome}</span>}
                    </Col>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Cognome</ControlLabel>
                        <FormControl
                            name='cognome'
                            value={cognome}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Scrivi il tuo cognome.."
                        />
                        {errors.cognome.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.cognome}</span>}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Matricola</ControlLabel>
                        <FormControl
                            name='matricola'
                            value={matricola}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Scrivi la tua matricola.."
                        />
                        {errors.matricola.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.matricola}</span>}
                    </Col>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Data Di Nascita</ControlLabel>
                        <FormControl
                            name='data'
                            value={data}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="La tua data di nascita.."
                        />
                        {errors.data.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.data}</span>}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Email</ControlLabel>
                        <FormControl
                            name='email'
                            value={email}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Scrivi la tua email.."
                        />
                        {errors.email.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.email}</span>}
                    </Col>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Conferma Email</ControlLabel>
                        <FormControl
                            name='confirmEmail'
                            value={confirmEmail}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Conferma la tua email.."
                        />
                        {errors.confirmEmail.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.confirmEmail}</span>}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Password</ControlLabel>
                        <FormControl
                            name='password'
                            value={password}
                            onChange={handleChange}
                            required
                            type="password"
                            placeholder="Scrivi la tua password.."
                        />
                        {errors.password.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.password}</span>}
                    </Col>
                    <Col md={6} lg={6} sm={6} style={{ padding: '6px', height: '80px' }}>
                        <ControlLabel style={{ marginTop: '3px' }}>Conferma password</ControlLabel>
                        <FormControl
                            name='confirmPass'
                            value={confirmPass}
                            onChange={handleChange}
                            required
                            type="password"
                            placeholder="Conferma la tua password.."
                        />
                        {errors.confirmPass.length > 0 &&
                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{errors.confirmPass}</span>}
                    </Col>
                </FormGroup>
                <Button
                    disabled={!validateForm()}
                    variant="dark"
                    type='submit'
                    className='pull-right'
                    style={{ 'margin': '1.5rem' }}>
                    Registrati</Button>
            </Form>
        )
    }
}