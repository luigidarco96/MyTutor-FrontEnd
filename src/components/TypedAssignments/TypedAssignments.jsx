import React, { Component } from "react";
import { Table, Modal } from "react-bootstrap";
import { StateAssignmentDictionary } from "../../static/dicts";
import CustomButton from "../CustomButton/CustomButton";

export default class TypedAssignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false,
      operationToConfrim: ""
    };
  }

  //Show the modal to confirm an operation.
  showConfirm() {
    this.setState({
      showConfirm: true
    });
  }

  draftOperation(element) {
    let user = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div>
          <CustomButton
            bsStyle="success"
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();

              this.setState({
                selectedNotice: element,
                operationToConfrim: "Invia Richiesta"
              });

              this.showConfirm();
            }}
          >
            Inoltra al professore
          </CustomButton>
        </div>
      );
    }
  }

  displayButtons(type, element) {
    switch (type) {
      case "Non assegnato":
        return this.draftOperation(element);
      default:
        return <td></td>;
    }
  }

  selectOperation(operation) {
    switch (operation) {
      case "Inoltra al professore":
        this.sendToProfessor(this.state.selectedNotice);
        break;
    }
  }

  render() {
    const closeConfirm = () => {};
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
        {/* Modal to confirm operation */}
        <Modal
          style={{
            borderRadius: "6px",
            overflow: "hidden",
            marginTop: "13%",
            left: "35%",
            position: "absolute"
          }}
          show={this.state.showConfirm}
          onHide={closeConfirm}
          animation={false}
        >
          <Modal.Header style={{ width: "350px" }} closeButton>
            <Modal.Title style={{ color: "#274F77" }}>
              {this.state.operationToConfrim}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ width: "350px", padding: "7px", fontSize: "25px" }}
          >
            Confermare l'operazione?
          </Modal.Body>
          <Modal.Footer style={{ width: "350px", paddingTop: "20px" }}>
            <CustomButton
              className="buttonHover button"
              variant="secondary"
              onClick={closeConfirm}
            >
              Annulla
            </CustomButton>
            <CustomButton
              className="buttonHover button"
              variant="primary"
              onClick={() => {
                this.selectOperation(this.state.operationToConfrim);
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
