import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { Modal, Alert } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx';
import { Grid } from 'react-bootstrap';
import Axios from 'axios';
import CustomButton from '../components/CustomButton/CustomButton';


const headers = {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
};




class Valutation extends Component {
    state = {
        header: [],
        valutations: [],
        assignments: [],
        operationToConfirm: '',
        selectedValutation: '',
        selectedAssignment: '',
        showConfirm: false,
        error: false,
        alertError: false,
        alertText: ''
    }



    componentWillMount() {
        //Take the notice protocol from the params.

        //Set the header of the table.
        this.setState({
            header: ['Nome', 'Cognome', 'Matricola', 'Punteggio', 'Nome Assegno', 'Azione']
        })
        //Call service to take all the valutation from table rating
        Axios
            .post('http://localhost:3001/api/ratings', { noticeProtocol: this.props.match.params.id }, headers)
            .then(blob => {
                //Set the state valutations to show the table of valutations.
                this.setState({
                    valutations: blob.data.result.sort((v1, v2) => (v1.assignment_id - v2.assignment_id))
                })
            })
            .catch(errro => {
                //TODO gestisci errore con popup
            })

        //Call service to take all the assignments.
        Axios
            .get("http://localhost:3001/api/assignments/search", headers)
            .then(blob => {
                //Set the state to save all the assignments.
                this.setState({
                    assignments: blob.data.list,
                });
            })
            .catch(error => {
                //TODO gestire l'errore con un popup
            });



    }

    setShowConfirm() {
        this.setState({
            showConfirm: true
        })
    }

    //Return the buttons in the table to do the action.
    showButtons(valutation, assignment) {

        let stateCurrentAssignment = '';
        //Set stateCurrentAssignment to the current state of the assignment
        this.state.assignments.forEach(assignment => {
            if (valutation.assignment_id === assignment.id) {
                stateCurrentAssignment = assignment.state;
            }
        })

        if (stateCurrentAssignment === 'Booked') {
            return (
                <div style={{ position: 'relative', right: '50px' }}>
                    <CustomButton
                        block
                        bsStyle='success'
                        onClick={
                            () => {

                                this.setState({
                                    operationToConfirm: 'Assegna incarico',
                                    selectedValutation: valutation,
                                    selectedAssignment: assignment,
                                })

                                this.setShowConfirm();


                            }
                        }
                    >
                        Assegna incarico
                    </CustomButton>
                </div>
            )
        }
        else if (stateCurrentAssignment === 'Unassigned') {
            let showSendRequestButton = false;
            
            this.state.assignments.forEach(el => {
                
                if (el.id === assignment.id) {
                    console.log('Ciao')
                    if (el.student == null || el.student === '') {
                        
                        showSendRequestButton = true;
                    }
                }
            })
            if (showSendRequestButton) {
                return (
                    <div style={{ position: 'relative', right: '50px' }}>
                        <CustomButton
                            block
                            bsStyle='success'
                            onClick={
                                () => {

                                    this.setState({
                                        operationToConfirm: 'Invia richiesta',
                                        selectedValutation: valutation,
                                        selectedAssignment: assignment,
                                    })

                                    this.setShowConfirm();


                                }
                            }

                        >
                            Invia richiesta
                </CustomButton>
                    </div>
                )
            }
            else {
                return (
                    <div style={{ position: 'relative', right: '50px' }}>
                        <CustomButton
                            block
                            bsStyle='warning'
                            disabled
                        >
                            Nessun operazione
                    </CustomButton>
                    </div>
                )
            }

        }
        else {
            return (
                <div style={{ position: 'relative', right: '50px' }}>
                    <CustomButton
                        block
                        bsStyle='warning'
                        disabled
                    >
                        Nessun operazione
                </CustomButton>
                </div>
            )
        }
    }

    //Assign assignment to a selected student.
    assignStudent() {
        const closeConfirm = () => {
            this.setState({
                showConfirm: false,
                alertError: false
            })
        }
        Axios
            .post('http://localhost:3001/api/assignments/assign', { assignment: this.state.selectedAssignment }, headers)
            .then(blob => {

                this.setState({
                    valutations: this.state.valutations.filter(val =>
                        val.assignment_id !== this.state.selectedAssignment.id
                    ),
                    assignments: this.state.assignments.filter(ass =>
                        ass.id !== this.state.selectedAssignment.assignment_id
                    )

                })
                window.location.reload();
                closeConfirm();
            })
            .catch(error => {
                this.setState({
                    alertError: true,
                    alertText: 'Impossibile assegnare incarico a questo studente'
                })
            })

    }
    //Send request for assignment to selected student.
    sendRequest() {
        const closeConfirm = () => {
            this.setState({
                showConfirm: false,
                alertError: false
            })
        }
        const objToSend = {
            assignment: this.state.selectedAssignment,
            emailStudent: this.state.selectedValutation.student.email
        }

        Axios
            .post('http://localhost:3001/api/assignments/request', objToSend, headers)
            .then(blob => {

                this.setState({
                    valutations: this.state.valutations.filter(val =>
                        val.assignment_id !== this.state.selectedAssignment.id
                    ),
                    assignments: this.state.assignments.filter(ass =>
                        ass.id !== this.state.selectedAssignment.assignment_id
                    )


                })
                window.location.reload();
                closeConfirm();
            })
            .catch(error => {
                this.setState({
                    alertError: true,
                    alertText: 'Impossibile inviare richiesta a questo studente controllare che la procedura sia stata eseguita correttamente'
                })
            })
    }

    //Select operation to confirm.
    selectOperation() {
        const { operationToConfirm } = this.state;
        switch (operationToConfirm) {
            case 'Assegna incarico':
                this.assignStudent();
                break;
            case 'Invia richiesta':
                this.sendRequest();
                break;
            default:
                break;
        }
    }
    render() {
        let currentAssignment;
        const { valutations, header } = this.state;
        //Function to close popup
        const closeConfirm = () => {
            this.setState({
                showConfirm: false,
                alertError: false
            })
        }
        let index = 0;
        return (
            <div className='content'>

                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title='Valutazioni studenti'
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {header.map((prop, key) => {
                                                    return (
                                                        <th style={{ paddingLeft: '20px' }} key={key}>
                                                            {prop}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {valutations &&
                                                valutations.map(element => {
                                                    currentAssignment = this.state.assignments.filter(el =>
                                                        el.id === element.assignment_id
                                                    )[0]



                                                    return (
                                                        <tr key={element.assignment_id}>
                                                            <td >{element.student.name}</td>
                                                            <td style={{ paddingLeft: '15px' }}>
                                                                {element.student.surname}
                                                            </td>
                                                            <td style={{ paddingLeft: '15px' }}>
                                                                {element.student.registration_number}
                                                            </td>
                                                            <td style={{ paddingLeft: '45px' }}>
                                                                {parseInt(element.interview_score) + parseInt(element.titles_score)}
                                                            </td>
                                                            <td style={{ paddingLeft: '45px' }}>
                                                                {this.state.assignments[index++]!=undefined?this.state.assignments[index++].code:''}
                                                            </td>
                                                            <td style={{ width: '200px' }}>
                                                                {this.showButtons(element, currentAssignment)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </Table>

                                }
                            />
                        </Col>
                    </Row>
                    {/* Modal to confirm operation */}
                    <Modal
                        style={{
                            borderRadius: '6px',
                            overflow: 'hidden',
                            marginTop: '13%',
                            left: '10%',
                            position: 'absolute'
                        }}
                        dialogClassName="myClass"
                        show={this.state.showConfirm}
                        onHide={closeConfirm}
                        animation={false}
                    >
                        <Modal.Header style={{ width: '350px' }} closeButton>
                            <Modal.Title style={{ color: '#274F77' }}>
                                {this.state.operationToConfirm}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                            style={{ width: '350px', padding: '7px 7px 7px 16px', fontSize: '15px' }}
                        >
                            <span>Confermare l'operazione?</span>
                        </Modal.Body>
                        {this.state.alertError ? <Alert bsStyle='danger'><p>{this.state.alertText}</p></Alert> : <div></div>}
                        <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
                            <CustomButton
                                className='btn-color-blue'
                                bsStyle='primary'
                                onClick={closeConfirm}
                            >
                                Annulla
            </CustomButton>
                            <CustomButton
                                bsStyle={this.state.error ? 'danger' : 'success'}
                                onClick={() => {
                                    this.selectOperation(this.state.operationToConfirm);
                                }}
                            >
                                Conferma
            </CustomButton>
                        </Modal.Footer>
                    </Modal>

                </Grid>




            </div>
        )
    }
}

export default Valutation;