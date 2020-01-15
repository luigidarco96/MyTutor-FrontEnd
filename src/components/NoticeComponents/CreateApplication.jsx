import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Form,
    FormGroup,
    ControlLabel,
    OverlayTrigger,
    Tooltip,
    Row,
    Col,
    Modal,
    Alert
} from 'react-bootstrap';
import '../../assets/css/global.css';
import CustomButton from '../CustomButton/CustomButton';
import axios from 'axios';

const CreateApplication = (props) => {
    const [protocol, setProtocol] = useState("");
    const [description, setDescription] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState('');
    const [modalConfirm, setModalConfirm] = useState(false);
    const [operationToConfirm, setOperationToConfirm] = useState('');
    const [isErrorOperation, setIsErrorOperation] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        if (!isMounted) {
            let user = JSON.parse(localStorage.getItem('user'));
            let token = localStorage.getItem('token');

            const {
                match: { params }
            } = props;

            //check if the id params of the applicationSheet is passed
            if (params.id) {
                if (user != null &&
                    (user.role === 'Teaching Office')) {
                    //fetch applicationSheet information
                    axios
                        .get(`http://localhost:3001/api/notices/${params.id}`, {
                            headers: {
                                Authorization: token
                            }
                        })
                        .then(response => {

                            setIsMounted(true)
                            let applicationSheet = response.data.notices[0].application_sheet
                            if (applicationSheet !== null) {
                                setDescription(applicationSheet.documents_to_attach)
                                setProtocol(applicationSheet.notice_protocol)
                            } else {
                                setError('ERROR PROTOCOL');


                            }

                        }).catch(err => {

                        })
                }
            }
        }
    })

    const handleEditType = () => {
        const {
            match: { params }
        } = props;

        if (params.id) {
            return (
                <div>
                    <CustomButton
                        style={{}}
                        bsStyle='danger'
                        create-notice-csbutton
                        type='submit'
                        onClick={e => {
                            setOperationToConfirm('Elimina');
                            setModalConfirm(true);
                            setIsErrorOperation(true);



                        }}>
                        Elimina
                    </CustomButton>
                    <CustomButton
                        bsStyle='success'
                        create-notice-csbutton
                        type='submit'
                        onClick={() => {
                            setAlertError(false);
                            setAlertSuccess(false);
                        }}
                    >
                        Applica Modifica
                    </CustomButton>
                </div>
            );
        } else {
            return (
                <CustomButton
                    bsStyle='success'
                    create-notice-csbutton
                    type='submit'>
                    Crea Domanda
                    </CustomButton>
            );
        }
    }

    const handleDelete = () => {
        const {
            match: { params }
        } = props;
        //Close the modal to confirm operation.
        setModalConfirm(false);

        let protocolField = document.getElementById('protocolField').value
        if (error !== '' && protocolField === params.id) {
            setAlertSuccess(false);
            setAlertText('Domanda con protocollo N. ' + params.id + 'inesistente');
            setAlertError(true);
        } else if (protocolField === params.id && protocolField !== '') {
            let user = JSON.parse(localStorage.getItem('user'));
            let token = localStorage.getItem('token');

            //Delete the applicationSheet
            axios({
                method: 'DELETE',
                url: `http://localhost:3001/api/applicationsheet/${params.id}`,
                data: {
                    user: user
                },
                headers: {
                    Authorization: token
                }
            }).then(response => {

                setAlertError(false);
                setAlertSuccess(true);
                setAlertText('Domanda eliminata con successo');

            }).catch(err => {
                if (err.response !== undefined) {
                    setAlertSuccess(false);
                    setAlertError(true);
                    setAlertText('Controlla di aver inserito correttamente il protocollo.');
                }
            })

        } else if (protocolField !== params.id && protocolField !== '' && protocolField.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) !== null) {
            setAlertSuccess(false);
            setAlertError(true);
            setAlertText('Attenzione! Hai inserito un nuovo protocollo, se vuoi cancellare un\'altra domanda recati sulla pagina inerente ad esso.');

        } else if (protocolField === '') {

            setAlertSuccess(false);
            setAlertError(true);
            setAlertText('Devi inserire il protocollo per poter eliminare una domanda.');

        } else if (protocolField.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) === null) {
            setAlertSuccess(false);
            setAlertError(true);
            setAlertText("Protocollo non valido. Rispettare il formato.");
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        validateForm()

        let applicationSheet = {
            notice_protocol: protocol,
            documents_to_attach: description
        }
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        const {
            match: { params }
        } = props;

        if (params.id && params.id === protocol) {
            if (error !== '') {
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

                    setAlertError(false);
                    setAlertSuccess(true);
                    setAlertText('La domanda non era presente ed è stata creata');

                })
                    .catch(err => {
                        if (err.response.data) {
                            if (err.response.data.exception && Object.entries(err.response.data.exception).length > 0) {
                                if (err.response.data.exception.startsWith('Duplicate entry')) {
                                    setAlertSuccess(false);
                                    setAlertError(true);
                                    setAlertText("Assicurati che la domanda per questo bando non esista già e riprova.");
                                }
                            } else {
                                setAlertSuccess(false);
                                setAlertError(true);
                                setAlertText("Assicurati che il bando collegato alla domanda esista e riprova.");

                            }
                        }
                    })

            } else {
                //modify applicationSheet
                axios({
                    method: 'PATCH',
                    url: 'http://localhost:3001/api/applicationsheet',
                    data: {
                        user: user,
                        applicationSheet: applicationSheet
                    },
                    headers: {
                        Authorization: token
                    }
                }).then(response => {

                    setAlertError(false);
                    setAlertSuccess(true);
                    setAlertText('Domanda modificata con successo');

                }).catch(err => {
                    if (err.response !== undefined) {
                        setAlertSuccess(false);
                        setAlertError(true);
                        setAlertText(err.response.data.error);

                    }
                })
            }
        } else if (params.id && params.id !== protocol && protocol.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) !== null) {

            if (error !== '' && protocol === params.id) {

                setAlertSuccess(false);
                setAlertError(true);
                setAlertText('Domanda con protocollo N. ' + params.id + ' inesistente.');

            } else {
                setAlertSuccess(false);
                setAlertError(true);
                setAlertText('Attenzione! Hai inserito un nuovo protocollo, se vuoi modificare un\'altra domanda recati sulla pagina inerente ad essa.');

            }
        } else if (!params.id) {
            //create the applicationSheet
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

                setAlertError(false);
                setAlertSuccess(true);
                setAlertText('Domanda creata con successo');

            })
                .catch(err => {
                    console.error(err.response)
                    if (err.response.data) {
                        if (err.response.data.exception && Object.entries(err.response.data.exception).length > 0) {
                            if (err.response.data.exception.startsWith('Duplicate entry')) {
                                setAlertSuccess(false);
                                setAlertError(true);
                                setAlertText("Assicurati che la domanda per questo bando non esista già e riprova.");
                            }
                        } else {
                            setAlertSuccess(false);
                            setAlertError(true);
                            setAlertText(err.response.data.error);

                        }
                    }
                })
        } else if (protocol.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) === null) {
            setAlertSuccess(false);
            setAlertError(true);
            setAlertText("Protocollo non valido. Rispettare il formato.");

        }
    }

    const validateForm = () => {
        if (protocol === '' || description === '') {
            setAlertSuccess(false);
            setAlertError(true);
            setAlertText('Controlla di aver compilato tutti i campi.');
            return false;
        } else if (protocol !== '' && description !== '') {
            return true;
        }
    }

    const handleClose = () => {

        setModalConfirm(false);
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


    //Select operatio to execute
    const selectOperation = () => {
        switch (operationToConfirm) {
            case 'Elimina':
                handleDelete();
                break;
            default:

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
                                    required
                                    defaultValue={protocol}
                                    type='text'
                                    placeholder='Inserisci il protocollo'
                                    id='protocolField'
                                    name='protocolField'
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
                                rows={5}
                                placeholder='Inserisci quali sono i documenti da caricare'
                                name='responsible_for_the_procedure'
                                value={description}
                                onFocus={e => handleFocus(e)}
                                onBlur={e => handleBlur(e)}
                                onMouseEnter={e => handleMouseEnter(e)}
                                onMouseOut={e => handleMouseOut(e)}
                                onChange={e => setDescription(e.target.value)}>
                            </FormControl>
                        </Col>
                    </Row>
                    {alertError ?
                        <Alert bsStyle='danger' id='error-message'>
                            <p>{alertText}</p>
                        </Alert >
                        :
                        <div></div>
                    }

                    {alertSuccess ?
                        <Alert bsStyle='success' id='success-message'>
                            <p>{alertText}</p>
                        </Alert >
                        :
                        <div></div>
                    }


                    <Row className='create-notice-row'>
                        <Col xs={12} md={12}>
                            {handleEditType()}
                        </Col>
                    </Row>
                </FormGroup>
            </Form>

            <Modal
                style={{
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginTop: '13%',
                    left: '10%',
                    position: 'absolute'
                }}
                dialogClassName='myClass'
                show={modalConfirm}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header style={{ width: '350px' }} closeButton>
                    <Modal.Title style={{ color: '#274F77' }}>
                        {operationToConfirm}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        width: '350px',
                        padding: '7px 7px 7px 16px',
                        fontSize: '15px'
                    }}
                >
                    <span>Confermare l'operazione?</span>
                </Modal.Body>
                <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
                    <CustomButton
                        className='btn-color-blue'
                        bsStyle='primary'
                        onClick={handleClose}
                    >
                        Annulla
            </CustomButton>
                    <CustomButton
                        bsStyle={isErrorOperation ? 'danger' : 'success'}
                        onClick={() => {
                            selectOperation();
                        }}
                    >
                        Conferma
            </CustomButton>
                </Modal.Footer>
            </Modal>


        </div>
    )
}


export default CreateApplication;