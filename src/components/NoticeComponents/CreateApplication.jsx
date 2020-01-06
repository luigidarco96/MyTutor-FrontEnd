import React, { useState } from 'react';
import {
    FormControl,
    Form,
    FormGroup,
    ControlLabel,
    OverlayTrigger,
    Tooltip,
    Row,
    Col,
    Modal
} from 'react-bootstrap';
import '../../assets/css/global.css';
import CustomButton from '../CustomButton/CustomButton';
import axios from 'axios';

const CreateApplication = (props) => {
    const [protocol, setProtocol] = useState("");
    const [description, setDescription] = useState("");
    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        validateForm()
        let applicationSheet = {
            notice_protocol: protocol,
            documents_to_attach: description
        }
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        axios({
            method: 'PUT',
            url: 'http://localhost:3001/api/applicationsheet',
            data: {
                user: user,
                applicationSheet: applicationSheet
            },
            headers: {
                Authorization: token
            }
        }).then(response => {
            if (response.status == '200') {
                setModal(true)
                setModalContent('Domanda creata con successo')
            }
        })
            .catch(err => {
                if (err.response.data.exception != undefined) {
                    if (err.response.data.exception.match("Duplicate entry")) {
                        setModal(true)
                        setModalContent(err.response.data.error + "\nControlla che la domanda per questo bando non esista già.")
                    }
                    else {
                        setModal(true)
                        setModalContent(err.response.data.error + "\nControlla che il bando collegato alla domanda esista.")
                    }
                }
            })
    }

    const validateForm = () => {
        if (protocol == '' || description == '') {
            document.getElementById('error-message').innerHTML = 'Controlla di aver compilato tutti i campi'
        } else if (protocol != '' && description != '') {
            document.getElementById('error-message').innerHTML = ''
        }
    }

    const handleClose = () => {
        setModal(false)
    }

    const handleFocus = (e) => {
        let el = e.target;

        el.className += ' typing';
    }

    const handleBlur = (e) => {
        const el = e.target;

        let value = '' + el.value;
        el.disabled = value.length > 0;

        el.className = el.className.replace('typing', '');
        el.className = el.className.trim();
    }

    const handleMouseEnter = (e) => {
        e.target.disabled = false;
    }

    const handleMouseOut = (e) => {
        let el = e.target;
        let elClass = el.className;

        if (elClass.includes('typing')) {
            return;
        } else {
            let value = '' + el.value;
            el.disabled = value.length > 0;
        }
    }
    return (
        <div className='container-fluid custom-body-view'>
            <Form onSubmit={e => handleFormSubmit(e)}>
                <FormGroup>
                    <Row className='create-notice-row'>
                        <Col xs={12} md={3}>
                            <ControlLabel>Protocollo</ControlLabel>
                            <OverlayTrigger
                                trigger='focus'
                                placement='top'
                                overlay={
                                    <Tooltip id='overload-top'>
                                        <strong>Esempio:</strong> Prot. n. 0274751
                                        </Tooltip>}>
                                <FormControl
                                    defaultValue={props.protocol}
                                    type='text'
                                    placeholder='Inserisci il protocollo'
                                    name='protocol'
                                    onFocus={e => handleFocus(e)}
                                    onBlur={e => handleBlur(e)}
                                    onMouseEnter={e => handleMouseEnter(e)}
                                    onMouseOut={e => handleMouseOut(e)}
                                    onChange={e => setProtocol(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row className='create-notice-row'>
                        <Col xs={12} md={9}>
                            <ControlLabel>Documenti da caricare</ControlLabel>
                            <FormControl
                                componentClass='textarea'
                                placeholder='Inserisci quali sono i documenti da caricare'
                                name='responsible_for_the_procedure'
                                onFocus={e => handleFocus(e)}
                                onBlur={e => handleBlur(e)}
                                onMouseEnter={e => handleMouseEnter(e)}
                                onMouseOut={e => handleMouseOut(e)}
                                onChange={e => setDescription(e.target.value)}>

                            </FormControl>
                        </Col>
                    </Row>
                    <Row className='create-notice-row'>
                        <Col xs={12} md={12}>
                            <CustomButton
                                bsStyle='success'
                                create-notice-csbutton
                                type='submit'
                            >Crea Domanda</CustomButton>
                        </Col>
                    </Row>
                </FormGroup>
                <Modal style={{ borderRadius: '6px', overflow: 'hidden', marginTop: '15%', left: '35%', position: 'absolute', height: '200px', width: '350px' }} show={modal} onHide={handleClose} animation={false}>
                    <Modal.Header style={{ width: '350px' }} closeButton />
                    <Modal.Body id='modalBody' style={{ width: '350px', padding: '7px' }}>{modalContent}</Modal.Body>
                </Modal>
            </Form>
            <div id='error-message'></div>
        </div>
    )
}


export default CreateApplication;