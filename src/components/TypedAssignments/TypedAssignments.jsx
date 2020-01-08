import React, { Component } from "react";
import { Table, Modal } from "react-bootstrap";
import { StateAssignmentDictionary } from "../../static/dicts";
import CustomButton from "../CustomButton/CustomButton";

export default class TypedAssignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  closedAssignment(element) {
    console.log(element);
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
                  <td>{StateAssignmentDictionary[element.state]}</td>
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
