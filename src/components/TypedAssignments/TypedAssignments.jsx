import React, { Component } from "react";
import { Table, Modal } from "react-bootstrap";
import { StateAssignmentDictionary } from "../../static/dicts";
import CustomButton from "../CustomButton/CustomButton";
import Axios from "axios";

export default class TypedAssignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: [],
      showConfirm: false,
      showInsertComment: false,
      selectedAssignment: "",
      showDetails: false,
      operationToConfirm: ""
    };
  }

  //Show the modal to confirm an operation.
  showInsertComment() {
    this.setState({
      showInsertComment: true
    });
  }
  showConfirm() {
    this.setState({
      showConfirm: true
    });
  }

  showDetails() {
    this.setState({
      showDetails: true
    })
  }

  assignedOperation(element) {
    let user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div>
          <CustomButton
            bsStyle="primary"
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedAssignment: element
              })
              this.showDetails();
            }}
          >
            Dettagli
          </CustomButton>
          <CustomButton
            bsStyle="danger"
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();

              this.setState({
                selectedAssignment: element
              });

              this.showInsertComment();
            }}
          >
            Chiudi
          </CustomButton>
        </div>
      );
    }
  }

  closedOperation(element) {
    let user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div>
          <CustomButton
            bsStyle="primary"
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedAssignment: element
              })
              this.showDetails();
            }}
          >
            Dettagli
          </CustomButton>
        </div>
      );
    }
  }

  requestOperation(element){
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Authorization' : localStorage.getItem('token')
    }
    if(user.role=='Student'){
        //TODO: inserire logica richieste.
        return(
          <div>
            
            <CustomButton
              bsStyle = 'success'
              
            
              onClick={
                ()=>{
                  this.setState({
                    selectedAssignment: element,
                    operationToConfirm: "Prenota firma"
                  })
                  this.showConfirm();
              }}
            >
              Prenota firma    
            </CustomButton>
  
            <CustomButton
              bsStyle = 'primary'
              onClick = {
                ()=>{

                  this.setState({
                    selectedAssignment : element
                  })

                  this.showDetails();
                }
              }
            >
              Dettagli    
            </CustomButton>
  
            <CustomButton
              bsStyle='danger'
              onClick ={
                ()=>{
                  this.setState({
                    selectedAssignment: element,
                    operationToConfirm: 'Rifiuta'
                  })
                  this.showConfirm();
                }
              }
            >
              Rifiuta    
            </CustomButton>
            
          </div>
        )
      

    }
  }

  bookedAssignmnent(){
    const closeConfirm = ()=>{
      this.setState({
        showConfirm: false,
      })
    }

    const headers = {
      'Authorization' : localStorage.getItem('token'),
    }
    
    Axios
    .post('http://localhost:3001/api/assignments/book',{assignment:this.state.selectedAssignment},{headers:headers})
    .then(blob=>{
      console.log(blob.data);
      //TODO inserisci modal di successo.
      this.setState({
        assignments: this.props.assignments
      })

      this.props.assignments.forEach((el) => {
        if (el.id == this.state.selectedAssignment.id && el.student == this.state.selectedAssignment.student) {
          this.state.selectedAssignment.state = 'Booked';
          el = this.state.selectedAssignment;
        }
      })
      let td = document.getElementById(this.state.selectedAssignment.id);
      td.style.color = 'red';
      this.setState({
        assignments: this.state.assignments
      })

      closeConfirm();
      
    })
    .catch(error=>{
      //TODO gestire errore.
      console.log(error);
    })
  
  }


//Set the state of an assignment to Over.
closedAssignment(element) {

  const closeModalComment = () => {
    this.setState({
      showInsertComment: false
    })
  }
  const headers = {
    'Authorization': localStorage.getItem('token')
  }
  element.note = '' + document.getElementById('comment').value;
  console.log(element);
  Axios
    .post('http://localhost:3001/api/assignments/close', { assignment: element }, { headers: headers })
    .then(blob => {
      console.log(blob.data);
      this.setState({
        assignments: this.props.assignments
      })
      this.props.assignments.forEach((el) => {
        if (el.id == element.id && el.student == element.student) {
          element.state = 'Over';
          el = element;
        }
      })
      let td = document.getElementById(element.id);
      td.style.color = 'red';
      this.setState({
        assignments: this.state.assignments
      })
      closeModalComment();
    })
}

rejectAssignment(){
  const headers = {
    'Authorization' : localStorage.getItem('token')
  }
  const closeConfirm = ()=>{
    this.setState({
      showConfirm: false
    })
  }

  Axios
  .post('http://localhost:3001/api/assignments/decline',{assignment:this.state.selectedAssignment},{headers:headers})
  .then(blob=>{
    this.setState({
      assignments: this.props.assignments
    })

    this.props.assignments.forEach((el) => {
      if (el.id == this.state.selectedAssignment.id && el.student == this.state.selectedAssignment.student) {
        this.state.selectedAssignment.state = 'Over';
        el = this.state.selectedAssignment;
      }
    })
    let td = document.getElementById(this.state.selectedAssignment.id);
    td.style.color = 'red';
    this.setState({
      assignments: this.state.assignments
    })

    closeConfirm();
    
  })
  .catch(error=>{
    //TODO errorr modal
  })
}
  displayButtons(type, element) {
    switch (type) {
      case "Assegnato":
        return this.assignedOperation(element);

      case "Terminato":
        return this.closedOperation(element);
        
      case "Richiesto":
        return this.requestOperation(element);
     // case "Assegnato":
     //   return this.assignedOperation(element);
    }
  }

  selectOperation(operation){
    switch(operation){
      case 'Prenota firma':
        this.bookedAssignmnent();
        break;
      case 'Rifiuta':
        this.rejectAssignment();
    }

  }
  



  render() {

    const closeModalComment = () => {
      this.setState({
        showInsertComment: false
      });
    };

    const closeModalDetails = () => {
      this.setState({
        showDetails: false
      })  
    }

    const closeConfirm = () =>{
      this.setState({
        showConfirm : false
      })
    }

    const { type, assignments } = this.props;
    return (
      <div>
        <Table key={type} striped bordered hover>
          <thead>
            <tr>
              <th>N.</th>
              <th>Protocollo</th>
              <th>Codice</th>
              <th>Descrizione</th>
              <th>Stato</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((element, index) => {
              return (
                <tr
                  id={element.protocol}
                  key={element.protocol}
                  onClick={e => e.preventDefault()}
                >
                  <td>{index}</td>
                  <td>{element.notice_protocol}</td>
                  <td>{element.code}</td>
                  <td>{element.activity_description}</td>
                  <td id={'' + element.id}>{StateAssignmentDictionary[element.state]}</td>
                  <td>{this.displayButtons(type, element)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Modal to insert comment */}
        <Modal
          style={{
            borderRadius: "6px",
            overflow: "hidden",
            marginTop: "13%",
            left: "10%",
            position: "absolute"
          }}
          dialogClassName="myClass"
          size='sm'
          show={this.state.showInsertComment}
          onHide={closeModalComment}
          animation={false}
        >
          <Modal.Header style={{ width: "350px" }} closeButton>
            <Modal.Title style={{ color: "#274F77" }}>
              Inserire un Commento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "350px", padding: "7px" }}>
            <textarea
              id="comment"
              style={{ resize: "none", height: "55px", width: "341px" }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer style={{ width: "350px" }}>
            <CustomButton
              className="buttonHover button"
              variant="secondary"
              onClick={closeModalComment}
            >
              Annulla
            </CustomButton>
            <CustomButton
              className="buttonHover button"
              variant="primary"
              onClick={() => {
                this.closedAssignment(this.state.selectedAssignment);
              }}
            >
              Invia commento
            </CustomButton>
          </Modal.Footer>
        </Modal>

        {/* Modal to show details */}
        <Modal
          style={{
            borderRadius: "6px",
            overflow: "hidden",
            marginTop: "13%",
            left: "10%",
            position: "absolute",


          }}
          size='lg'

          show={this.state.showDetails}
          onHide={closeModalDetails}
          animation={false}
        >

          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#274F77" }}>
              Dettagli assegno
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table key={type} striped bordered hover>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Ore totali</th>
                  <th>Titolo</th>
                  <th>Costo orario</th>
                  <th>Commento</th>

                </tr>
              </thead>
              <tbody>
                <tr
                  id={this.state.selectedAssignment.protocol}
                  key={this.state.selectedAssignment.protocol}
                  onClick={e => e.preventDefault()}
                >

                  <td>{this.state.selectedAssignment.student}</td>
                  <td>{this.state.selectedAssignment.total_number_hours}</td>
                  <td>{this.state.selectedAssignment.title}</td>
                  <td>{this.state.selectedAssignment.hourly_cost}</td>
                  <td style={{wordBreak:'break-all'}}>
                    <div style={{overflowY: 'scroll',maxHeight:'100px'}}>
                      {this.state.selectedAssignment.note}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <CustomButton
              className="buttonHover button"
              variant="secondary"
              onClick={closeModalDetails}
            >
              Chiudi
            </CustomButton>
          </Modal.Footer>
        </Modal>
     
          {/* Modal to confirm operation */ }
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
                this.selectOperation(this.state.operationToConfirm);
              }}
            >
              Conferma
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
