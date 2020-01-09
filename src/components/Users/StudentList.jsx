import React, { Component } from "react";
import {
  Grid,
  Row,
  Table,
  Col,
  Modal,
  Glyphicon,
  FormControl
} from "react-bootstrap";
import Button from "../CustomButton/CustomButton";
import axios from "axios";
import Fuse from "fuse.js";

export class StudentList extends Component {
  state = {
    header: [],
    students: [],
    selectedStudent: "",
    show: false,
    studentSearch: [],
    search: false
  };

  constructor(props) {
    super(props);
  }

  handleSearch(e) {
    const { students } = this.state;

    var options = {
      shouldSort: true,
      threshold: 0.05,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["email", "name", "registation_number"]
    };
    var fuse = new Fuse(students, options); // "list" is the item array
    var result = fuse.search(e.target.value);

    if (e.target.value === "") {
      this.setState({
        search: false
      });
    } else {
      this.setState({
        studentSearch: result,
        search: true
      });
    }
  }

  searchStudent() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (Boolean(user) && user.role === "Teaching Office") {
      return (
        <div className="container-fluid">
          <div className="search-group">
            <Glyphicon glyph="search" />
            <FormControl
              className="search-bar"
              type="text"
              name="search"
              placeholder="Cerca studente"
              onChange={e => this.handleSearch(e)}
            />
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    //Headers sends to the search request for authentication.
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    //Data sends to the search request.
    let data = {
      param: {
        role: "Student"
      }
    };

    this.setState({
      header: ["E-mail", "Nome", "Cognome", "Matricola", "Data di Nascita"]
    });

    axios
      .post("http://localhost:3001/api/users/search", data, {
        headers: headers
      })
      .then(blob => {
        this.setState({
          students: blob.data.list
        });
      });
  }

  render() {
    //Function to delete selected student.

    const deleteStudent = () => {
      //Search the student to delete.

      const id = this.state.selectedStudent.email;
      let url = "http://localhost:3001/api/users/" + id;
      axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(blob => {
          this.setState({
            selectedStudent: blob.data.user
          });

          const headers = {
            Authorization: localStorage.getItem("token")
          };
          //Delete the user selected.
          axios
            .delete(
              "http://localhost:3001/api/users/" +
                this.state.selectedStudent.email,
              {
                headers: headers
              }
            )
            .then(blob => {
              this.setState({
                students: students.filter(
                  el => el.email != this.state.selectedStudent.email
                )
              });
            });
        });
      handleClose();
    };

    const handleClose = () =>
      this.setState({
        show: false
      });

    const handleShow = student =>
      this.setState({
        show: true,
        selectedStudent: student
      });

    const { students, studentSearch, search } = this.state;

    const { header } = this.state;

    const styleIconTrash = {
      fontSize: "20px",
      color: "#274F77"
    };

    if (search === false) {
      return (
        <div className="content">
          <Grid fluid>
            {this.searchStudent()}
            <Row>
              <Col md={12}>
                <Table hover>
                  <thead>
                    <tr>
                      {header.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {students &&
                      students.map(element => {
                        return (
                          <tr key={element.serialNumber}>
                            <td>{element.email}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
                            <td>{element.registration_number}</td>
                            <td>{element.birth_date.split("T")[0]}</td>
                            <td
                              onClick={() => {
                                handleShow(element);
                              }}
                            >
                              <i
                                className="pe-7s-trash trashIcon"
                                style={styleIconTrash}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/*This is the popup shown when you try to delete a student*/}
            <Modal
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "15%",
                left: "45%",
                position: "absolute",
                height: "200px",
                width: "350px"
              }}
              show={this.state.show}
              onHide={handleClose}
              animation={false}
            >
              <Modal.Header style={{ width: "350px" }} closeButton>
                <Modal.Title style={{ color: "#274F77" }}>
                  Elimina studente
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ width: "350px", padding: "7px" }}>
                Confermare l'eliminazione?
              </Modal.Body>
              <Modal.Footer style={{ width: "350px" }}>
                <Button
                  className="buttonHover button"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Annulla
                </Button>
                <Button
                  className="buttonHover button"
                  variant="primary"
                  onClick={deleteStudent}
                >
                  Elimina
                </Button>
              </Modal.Footer>
            </Modal>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="content">
          <Grid fluid>
            {this.searchStudent()}
            <Row>
              <Col md={12}>
                <Table hover>
                  <thead>
                    <tr>
                      {header.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {studentSearch &&
                      studentSearch.map(element => {
                        return (
                          <tr key={element.serialNumber}>
                            <td>{element.email}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
                            <td>{element.registration_number}</td>
                            <td>{element.birth_date.split("T")[0]}</td>
                            <td
                              onClick={() => {
                                handleShow(element);
                              }}
                            >
                              <i
                                className="pe-7s-trash trashIcon"
                                style={styleIconTrash}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/*This is the popup shown when you try to delete a student*/}
            <Modal
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "15%",
                left: "45%",
                position: "absolute",
                height: "200px",
                width: "350px"
              }}
              show={this.state.show}
              onHide={handleClose}
              animation={false}
            >
              <Modal.Header style={{ width: "350px" }} closeButton>
                <Modal.Title style={{ color: "#274F77" }}>
                  Elimina studente
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ width: "350px", padding: "7px" }}>
                Confermare l'eliminazione?
              </Modal.Body>
              <Modal.Footer style={{ width: "350px" }}>
                <Button
                  className="buttonHover button"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Annulla
                </Button>
                <Button
                  className="buttonHover button"
                  variant="primary"
                  onClick={deleteStudent}
                >
                  Elimina
                </Button>
              </Modal.Footer>
            </Modal>
          </Grid>
        </div>
      );
    }
  }
}
export default StudentList;
