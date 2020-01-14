import React, { Component } from "react";
import { Table, Modal, Alert } from "react-bootstrap";
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
      operationToConfirm: "",
      error: false,
      alertError: false,
      alertText: ""
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
    });
  }

  assignedOperation(element) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div>
          <CustomButton
            bsStyle="primary"
            className="btn-color-blue"
            style={{
              float: "right"
            }}
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedAssignment: element
              });
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
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div>
          <CustomButton
            bsStyle="primary"
            className="btn-color-blue"
            style={{
              float: "right"
            }}
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedAssignment: element
              });
              this.showDetails();
            }}
          >
            Dettagli
          </CustomButton>
        </div>
      );
    }
  }

  requestOperation(element) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "Student") {
      return (
        <div>
          <CustomButton
            bsStyle="success"
            pullRight
            onClick={() => {
              this.setState({
                selectedAssignment: element,
                operationToConfirm: "Prenota firma"
              });
              this.showConfirm();
            }}
          >
            Prenota firma
          </CustomButton>

          <CustomButton
            bsStyle="primary"
            className="btn-color-blue"
            style={{
              float: "right"
            }}
            onClick={() => {
              this.setState({
                selectedAssignment: element
              });

              this.showDetails();
            }}
          >
            Dettagli
          </CustomButton>

          <CustomButton
            bsStyle="danger"
            pullRight
            onClick={() => {
              this.setState({
                selectedAssignment: element,
                operationToConfirm: "Rifiuta",
                error: true
              });
              this.showConfirm();
            }}
          >
            Rifiuta
          </CustomButton>
        </div>
      );
    }
  }

  bookedAssignmnent() {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false,
        alertError: false
      });
    };

    const headers = {
      Authorization: localStorage.getItem("token")
    };

    Axios.post(
      "http://localhost:3001/api/assignments/book",
      { assignment: this.state.selectedAssignment },
      { headers: headers }
    )
      .then(blob => {
        this.setState({
          assignments: this.props.assignments
        });

        this.props.assignments.forEach(el => {
          if (
            el.id === this.state.selectedAssignment.id &&
            el.student === this.state.selectedAssignment.student
          ) {
            this.setState({
              selectedAssignment: "Booked"
            });
            el = this.state.selectedAssignment;
          }
        });

        closeConfirm();
        window.location.reload();
      })
      .catch(error => {
        this.setState({
          alertError: true,
          alertText: "Impossibile prenotare la firma per questo incarico"
        });
      });
  }

  //Set the state of an assignment to Over.
  closedAssignment(element) {
    const closeModalComment = () => {
      this.setState({
        showInsertComment: false
      });
    };
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    element.note = "" + document.getElementById("comment").value;

    Axios.post(
      "http://localhost:3001/api/assignments/close",
      { assignment: element },
      { headers: headers }
    ).then(blob => {
      this.setState({
        assignments: this.props.assignments
      });
      this.props.assignments.forEach(el => {
        if (el.id === element.id && el.student === element.student) {
          element.state = "Over";
          el = element;
        }
      });
      let td = document.getElementById(element.id);
      td.style.color = "red";
      this.setState({
        assignments: this.state.assignments
      });
      closeModalComment();
      window.location.reload();
    });
  }

  rejectAssignment() {
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    const closeConfirm = () => {
      this.setState({
        showConfirm: false,
        error: false,
        alertError: false
      });
    };

    Axios.post(
      "http://localhost:3001/api/assignments/decline",
      { assignment: this.state.selectedAssignment },
      { headers: headers }
    )
      .then(blob => {
        this.setState({
          assignments: this.props.assignments
        });

        this.props.assignments.forEach(el => {
          if (
            el.id === this.state.selectedAssignment.id &&
            el.student === this.state.selectedAssignment.student
          ) {
            this.setState({
              selectedAssignment: "Over"
            });
            el = this.state.selectedAssignment;
          }
        });

        closeConfirm();
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          alertError: true,
          alertText:
            "Impossibile effettuare operazione controllare che la procedura sia stata eseguita correttamente"
        });
      });
  }
  displayButtons(type, element) {
    switch (type) {
      case "Assegnato":
        return this.assignedOperation(element);

      case "Terminato":
        return this.closedOperation(element);

      case "Richiesto":
        return this.requestOperation(element);
      default:
        return;
      // case "Assegnato":
      //   return this.assignedOperation(element);
    }
  }

  selectOperation(operation) {
    switch (operation) {
      case "Prenota firma":
        this.bookedAssignmnent();
        break;
      case "Rifiuta":
        this.rejectAssignment();
        break;
      default:
        break;
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
      });
    };

    const closeConfirm = () => {
      this.setState({
        showConfirm: false,
        alertError: false
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
                  <td id={"" + element.id}>
                    {StateAssignmentDictionary[element.state]}
                  </td>
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
          size="sm"
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
              className="btn-color-blue"
              bsStyle="primary"
              onClick={closeModalComment}
            >
              Annulla
            </CustomButton>
            <CustomButton
              bsStyle="success"
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
            position: "absolute"
          }}
          size="lg"
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
                  <td style={{ wordBreak: "break-all" }}>
                    <div style={{ overflowY: "scroll", maxHeight: "100px" }}>
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
        {/* Modal to confirm operation */}
        <Modal
          style={{
            borderRadius: "6px",
            overflow: "hidden",
            marginTop: "13%",
            left: "10%",
            position: "absolute"
          }}
          dialogClassName="myClass"
          show={this.state.showConfirm}
          onHide={closeConfirm}
          animation={false}
        >
          <Modal.Header style={{ width: "350px" }} closeButton>
            <Modal.Title style={{ color: "#274F77" }}>
              {this.state.operationToConfirm}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              width: "350px",
              padding: "7px 7px 7px 16px",
              fontSize: "15px"
            }}
          >
            <span>Confermare l'operazione?</span>
          </Modal.Body>
          {this.state.alertError ? (
            <Alert bsStyle="danger">
              <p>{this.state.alertText}</p>
            </Alert>
          ) : (
            <div></div>
          )}
          <Modal.Footer style={{ width: "350px", paddingTop: "20px" }}>
            <CustomButton
              className="btn-color-blue"
              bsStyle="primary"
              onClick={closeConfirm}
            >
              Annulla
            </CustomButton>
            <CustomButton
              bsStyle={this.state.error ? "danger" : "success"}
              onClick={() => {
                this.selectOperation(this.state.operationToConfirm);
              }}
            >
              Conferma
            </CustomButton>
          </Modal.Footer>
        </Modal>{" "}
      </div>
    );
  }
}
