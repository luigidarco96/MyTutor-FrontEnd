import React, { useState} from 'react';
import {
    Form,
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';
export const SignUpProfessor = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [data, setData] = useState("");
    const [confrimPass, setConfirmPass] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const emailRegex = '/^[a-z]\.[a-z]*\@unisa.it$/'
    const passRegex = '/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8, 20}$/'
    const nomeRegex = '/^[A-Za-z ‘]+$/'
    const cognomeRegex = '/^[A-Za-z ‘]+$/'
    const dataRegex = '/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/'

    function validateForm() {
        return email.length > 0 && password.length > 0 && nome.length > 0 && cognome.length > 0 &&
        data.length > 0 && confrimPass.length > 0 && confirmEmail.length > 0;
      }
    
      function handleSubmit(event) {
        event.preventDefault();
      }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Nome</ControlLabel>
                    <FormControl
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="text"
                        placeholder="Scrivi il tuo nome.."
                        validations={{matchRegexp:nomeRegex}} 
                        validationErrors={{matchRegexp:'Inserisci un nome valido'}}
                    />
                </Col>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Cognome</ControlLabel>
                    <FormControl
                        value={cognome}
                        onChange={e => setCognome(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="text"
                        placeholder="Scrivi il tuo cognome.."
                        validations={{matchRegexp:cognomeRegex}} 
                        validationErrors={{matchRegexp:'Inserisci un cognome valido'}}
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Data Di Nascita</ControlLabel>
                    <FormControl
                        value={data}
                        onChange={e => setData(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="text"
                        placeholder="La tua data di nascita.."
                        validations={{matchRegexp:dataRegex}} 
                        validationErrors={{matchRegexp:'Inserisci una data valida'}}
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Email</ControlLabel>
                    <FormControl
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="text"
                        placeholder="Scrivi la tua email.."
                        validations={{matchRegexp:emailRegex}} 
                        validationErrors={{matchRegexp:'Inserisci una email valida'}}
                    />
                </Col>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Conferma Email</ControlLabel>
                    <FormControl
                        value={confirmEmail}
                        onChange={e => setConfirmEmail(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="text"
                        placeholder="Conferma la tua email.."
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="password"
                        placeholder="Scrivi la tua password.."
                        validations={{matchRegexp:passRegex}} 
                        validationErrors={{matchRegexp:'Inserisci una password valida'}}
                    />
                </Col>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ 'margin-top': '3px' }}>Conferma password</ControlLabel>
                    <FormControl
                        value={confrimPass}
                        onChange={e => setConfirmPass(e.target.value)}
                        style={{ width: '400px' }}
                        required
                        type="password"
                        placeholder="Conferma la tua password.."
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col md={6} lg={6} sm={6} style={{ padding: '6px' }}>
                    <ControlLabel style={{ visibility: 'hidden', 'margin-top': '3px' }}>Conferma password</ControlLabel>
                    <FormControl
                        style={{ width: '400px' }} style={{ visibility: 'hidden' }} />
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


export default SignUpProfessor;