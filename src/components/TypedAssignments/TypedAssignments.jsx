import React, { Component } from "react";
import { Table, Modal } from "react-bootstrap";
import { StateAssignmentDictionary } from "../../static/dicts";
import CustomButton from "../CustomButton/CustomButton";
import Axios from "axios";
import ts from "typescript";

export default class TypedAssignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: [],
      showInsertComment: false,
      selectedAssignment: ""
    };
  }

  //Show the modal to confirm an operation.
  showInsertComment() {
    this.setState({
      showInsertComment: true
    });
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

              //Inserisci logica
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

              //Inserisci logica
            }}
          >
            Dettagli
          </CustomButton>
        </div>
      );
    }
  }

  displayButtons(type, element) {
    switch (type) {
      case "Assegnato":
        return this.assignedOperation(element);
        break;
      case "Terminato":
        return this.closedOperation(element);
        break;
    }
  }
  //Set the state of an assignment to Over.
  closedAssignment(element) {
    console.log("Ciao");
    const closeModalComment = ()=>{
      this.setState({
        showInsertComment: false
      })
    }
    const headers = {
      'Authorization': localStorage.getItem('token')
    }
    element.note =''+ document.getElementById('comment').value;
    console.log(element);
    Axios
    .post('http://localhost:3001/api/assignments/close', {assignment:element},{headers:headers})
    .then(blob=>{
      console.log(blob.data);
      this.setState({
        assignments: this.props.assignments
      })
      this.props.assignments.forEach((el)=>{
        if(el.id == element.id && el.student== element.student){
          element.state='Over';
          el = element;
        }
      })
      let td = document.getElementById(element.notice_protocol);
      td.style.color = 'red';
      this.setState({
        assignments: this.state.assignments
      })
      closeModalComment();
    })
  }

  render() {
    const closeModalComment = () => {
      this.setState({
        showInsertComment: false
      });
    };
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
                  <td id={''+element.notice_protocol}>{StateAssignmentDictionary[element.state]}</td>
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
            left: "35%",
            position: "absolute"
          }}
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
      </div>
    );
  }
}
