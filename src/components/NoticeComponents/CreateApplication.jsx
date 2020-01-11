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
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState('');
    const [modalConfirm, setModalConfirm] = useState(false);
    const [operationToConfirm, setOperationToConfirm] = useState('');
    const [isErrorOperation, setIsErrorOperation] = useState(false);
  
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
                            if (response.status == '200') {
                                setIsMounted(true)
                                console.log(response.data.notices[0])
                                let applicationSheet = response.data.notices[0].application_sheet
                                if (applicationSheet != null) {
                                    setDescription(applicationSheet.documents_to_attach)
                                    setProtocol(applicationSheet.notice_protocol)
                                } else {
                                    setError('PROTOCOL ERROR')
                                }
                            }
                        }).catch(err => {
                            console.log(err)
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
                        type='submit'>
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
        setModalConfirm(false);
        let protocolField = document.getElementById('protocolField').value
        if (error != '' && protocolField == params.id) {
            setModalContent('Domanda con protocollo N. ' + params.id + ' inesistente.')
            setModal(true)
        } else if (protocolField == params.id && protocolField != '') {
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
                if (response.status == '200') {
                    setModalContent('Domanda eliminata con successo')
                }
            }).catch(err => {
                console.log(err.response)
                if (err.response != undefined) {
                    setModalContent('Controlla di aver inserito correttamente il protocollo.')
                }
            })
            setModal(true)
        } else if (protocolField != params.id && protocolField != '' && protocolField.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) != null) {
            setModalContent('Attenzione! Hai inserito un nuovo protocollo, se vuoi cancellare un\'altra domanda recati sulla pagina inerente ad esso.')
            setModal(true)
        } else if (protocolField == '') {
            setModalContent('Devi inserire il protocollo per poter eliminare una domanda.')
            setModal(true)
        } else if (protocolField.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) == null) {
            console.log(protocolField)
            setModalContent("Protocollo non valido. Rispettare il formato.")
            setModal(true)
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

        if (params.id && params.id == protocol) {
            if (error != '') {
                setModalContent('Domanda con protocollo N. ' + params.id + ' inesistente.')
                setModal(true)
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
                    if (response.status == '200') {
                        setModalContent('Domanda modificata con successo')
                    }
                }).catch(err => {
                    if (err.response != undefined) {
                        setModalContent(err.response.data.error)
                    }
                })
                setModal(true)
            }
        } else if (params.id && params.id != protocol && protocol.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) != null) {
            if (error != '' && protocol == params.id) {
                setModalContent('Domanda con protocollo N. ' + params.id + ' inesistente.')
                setModal(true)
            } else {
                setModalContent('Attenzione! Hai inserito un nuovo protocollo, se vuoi modificare un\'altra domanda recati sulla pagina inerente ad essa.')
                setModal(true)
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
                if (response.status == '200') {
                    setModalContent('Domanda creata con successo')
                    setModal(true)
                }
            })
                .catch(err => {
                    if (err.response.data.exception != undefined) {
                        if (err.response.data.exception.match("Duplicate entry")) {
                            setModalContent(err.response.data.error + "Assicurati che la domanda per questo bando non esista già e riprova.")
                            setModal(true)
                        }
                        else {
                            setModalContent(err.response.data.error + "Assicurati che il bando collegato alla domanda esista e riprova.")
                            setModal(true)
                        }
                    }
                })
        } else if (protocol.match(RegExp(/^Prot. n. [0-9]{1,7}$/)) == null) {
            setModalContent("Protocollo non valido. Rispettare il formato.")
            setModal(true)
        }
    }

    const validateForm = () => {
        if (protocol == '' || description == '') {
            document.getElementById('error-message').innerHTML = 'Controlla di aver compilato tutti i campi'
            document.getElementById('error-message').style.visibility = 'visible'
            return false;
        } else if (protocol != '' && description != '') {
            document.getElementById('error-message').innerHTML = ''
            document.getElementById('error-message').style.visibility = 'hidden'
            return true;
        }
    }

    const handleClose = () => {
        setModal(false);
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
    const selectOperation = ()=>{
        switch(operationToConfirm){
            case 'Elimina' : 
                handleDelete();
                break;
           
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
                        bsStyle={isErrorOperation?'danger':'success'}
                        onClick={() => {
                            selectOperation();
                        }}
                    >
                        Conferma
            </CustomButton>
                </Modal.Footer>
            </Modal>

            <Alert style={{ visibility: 'hidden' }} bsStyle='danger' id='error-message'></Alert >
        </div>
    )
}


export default CreateApplication;