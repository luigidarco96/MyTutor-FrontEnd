import React, { Component } from 'react';
import { Row, Col, Table} from 'reactstrap';
import {Modal} from 'react-bootstrap'
import Card from 'components/Card/Card.jsx';
import { Grid } from 'react-bootstrap';
import Axios from 'axios';
import CustomButton from '../components/CustomButton/CustomButton';


const headers = {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
};



const user = JSON.parse(localStorage.getItem('user'));

class Valutation extends Component {
    state = {
        header: [],
        valutations: [],
        assignments: [],
        operationToConfrim: '',
        selectedValutation: '',
        selectedAssignment:'',
        showConfirm: false
    }

    constructor(props) {
        super(props);
       
    }

    componentDidMount() {
        //Take the notice protocol from the params.
        const noticeProtocol = this.props.match.params.id;

        //Set the header of the table.
        this.setState({
            header: ['Nome', 'Cognome', 'Matricola', 'Punteggio', 'Id Assegno', 'Azione']
        })
        //Call service to take all the valutation from table rating
        Axios
            .post('http://localhost:3001/api/ratings', { noticeProtocol: this.props.match.params.id }, headers)
            .then(blob => {

                console.log(blob.data);
                //Set the state valutations to show the table of valutations.
                this.setState({
                    valutations: blob.data.result
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
                    assignments: blob.data.list
                });
            })
            .catch(error => {
                //TODO gestire l'errore con un popup
            });



    }

    setShowConfirm(){
        this.setState({
            showConfirm: true
        })
        console.log(this.state.showConfirm)
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
                    <div style={{position:'relative', right:'50px'}}>
                    <CustomButton
                        block
                        bsStyle='success'
                        onClick = {
                            ()=>{
                                
                                this.setState({
                                    operationToConfrim: 'Assegna incarico',
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
        else if(stateCurrentAssignment === 'Unassigned'){
            return (
                <div style={{position:'relative', right:'50px'}}>
                <CustomButton
                    block
                    bsStyle='primary'
                    onClick = {
                        ()=>{
                            
                            this.setState({
                                operationToConfrim: 'Invia richiesta',
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
        else{
            return (
                <div style={{position:'relative', right:'50px'}}>
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
    assignStudent(){
        const closeConfirm = ()=>{
            this.setState({
                showConfirm: false
            })
        }
        Axios
        .post('http://localhost:3001/api/assignments/assign',{assignment:this.state.selectedAssignment},headers)
        .then(blob=>{
            console.log(blob.data);
            this.setState({
                valutations:this.state.valutations.filter(val=>
                    val.assignment_id != this.state.selectedAssignment.id
                ),
                assignments: this.state.assignments.filter(ass=>
                    ass.id != this.state.selectedAssignment.assignment_id
                )
                
            //TODO compare un modal.
            })
            closeConfirm();
        })
        .catch(error=>{
        //TODO gestire errore 
        })

    }
    //Send request for assignment to selected student.
    sendRequest(){
        const closeConfirm = ()=>{
            this.setState({
                showConfirm : false
            })
        }
        const objToSend = {
            assignment:this.state.selectedAssignment,
            emailStudent: this.state.selectedValutation.student.email
        }

        Axios
        .post('http://localhost:3001/api/assignments/request',objToSend,headers)
        .then(blob=>{
            console.log(blob.data);
            this.setState({
                valutations:this.state.valutations.filter(val=>
                    val.assignment_id != this.state.selectedAssignment.id
                ),
                assignments: this.state.assignments.filter(ass=>
                    ass.id != this.state.selectedAssignment.assignment_id
                )
                
            //TODO compare un modal.
            })
            closeConfirm();
        })
        .catch(error=>{

        })
    }

    //Select operation to confirm.
    selectOperation(){
        const {operationToConfrim} = this.state;
        switch(operationToConfrim){
            case 'Assegna incarico':
                this.assignStudent();
                break;
            case 'Invia richiesta':
                this.sendRequest();
                break;
        }
    }
    render() {
        let currentAssignment;
        const { valutations, header } = this.state;
        //Function to close popup
        const closeConfirm = ()=>{
            this.setState({
                showConfirm:false   
            })
        }
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
                                                        <th style={{paddingLeft:'20px'}}key={key}>
                                                            {prop}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {valutations &&
                                                valutations.map(element => {
                                                    currentAssignment=this.state.assignments.filter(el=>
                                                        el.id === element.assignment_id
                                                    )[0]
                                                    
                                                    return (
                                                        <tr key={element.assignment_id}>
                                                            <td >{element.student.name}</td>
                                                            <td style={{paddingLeft:'15px'}}>
                                                                {element.student.surname}
                                                            </td>
                                                            <td style={{paddingLeft:'15px'}}>
                                                                {element.student.registration_number}
                                                            </td>
                                                            <td style={{paddingLeft:'45px'}}>
                                                                {parseInt(element.interview_score) + parseInt(element.titles_score)}
                                                            </td>
                                                            <td style={{paddingLeft:'45px'}}>
                                                                {element.assignment_id}
                                                            </td>
                                                            <td style={{width:'200px'}}>
                                                                {this.showButtons(element,currentAssignment)}
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
                {this.state.operationToConfrim}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{ width: '350px', padding: '7px', fontSize: '25px' }}
            >
              Confermare l'operazione?
            </Modal.Body>
            <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
              <CustomButton
                className='buttonHover button'
                variant='secondary'
                onClick={closeConfirm}
              >
                Annulla
              </CustomButton>
              <CustomButton
                className='buttonHover button'
                variant='primary'
                onClick={() => {
                  this.selectOperation(this.state.operationToConfrim);
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