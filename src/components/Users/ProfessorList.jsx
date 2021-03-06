import React, { Component } from "react";
import {
  Grid,
  Row,
  Table,
  Col,
  Modal,
  Glyphicon,
  FormControl,
  Alert
} from "react-bootstrap";
import Button from "../CustomButton/CustomButton";
import axios from "axios";
import Fuse from "fuse.js";

export class ProfessorList extends Component {
  state = {
    header: [],
    professors: [],
    isLoading: true,
    show: false,
    showInsertEmail: false,
    selectedProfessor: "",
    professorsSearch: [],
    search: false,
    showErrorAlert: false,
    alertErrorText: ''
  };


  handleSearch(e) {
    const { professors } = this.state;

    var options = {
      shouldSort: true,
      threshold: 0.05,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["email"]
    };
    var fuse = new Fuse(professors, options); // "list" is the item array
    var result = fuse.search(e.target.value);

    if (e.target.value === "") {
      this.setState({
        search: false
      });
    } else {
      this.setState({
        professorsSearch: result,
        search: true
      });
    }
  }

  searchProfessor() {
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
              placeholder="Cerca professore"
              onChange={e => this.handleSearch(e)}
            />
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    //Set the header of a professor table
    this.setState({
      header: ["E-mail", "Nome", "Cognome"]
    });
    //data use to server call
    let data = {
      param: {
        role: "Professor"
      }
    };
    //headers to authenticate user
    let headers = {
      Authorization: localStorage.getItem("token")
    };
    //Take all professor.
    axios
      .post("http://localhost:3001/api/users/search", data, {
        headers: headers
      })
      .then(blob => {
        this.setState({
          professors: blob.data.list
        });
      });
  }
  render() {
    //Insert email professor verfied.
    const setEmailVerified = emailVerified => {
      const emailProfessorExp = /^[a-z]+\.?[a-z]+[0-9]*@unisa\.it$/;

      if (!emailProfessorExp.test(emailVerified)) {

        return this.setState({
          showErrorAlert: true,
          alertErrorText: 'L\'email non rispetta il formato @unisa.it'
        })
      }
      const headers = {
        Authorization: localStorage.getItem("token")
      };
      axios
        .post(
          "http://localhost:3001/api/auth/verified",
          { email: emailVerified },
          { headers: headers }
        )
        .then(blob => {
          handleCloseEmail();

        })
        .catch(error => {
          this.setState({
            showErrorAlert: true,
            alertErrorText: error.response.data.error
          })
        })
    };

    //Delete professor selected.
    const deleteProfessor = () => {
      //Search the professor to delete.

      const id = this.state.selectedProfessor.email;
      let url = "http://localhost:3001/api/users/" + id;
      axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(blob => {
          this.setState({
            selectedProfessor: blob.data.user
          });
          //headers to authenticate user
          const headers = {
            Authorization: localStorage.getItem("token")
          };

          //Delete the user selected.
          axios
            .delete(
              "http://localhost:3001/api/users/" +
              this.state.selectedProfessor.email,
              {
                headers: headers
              }
            )
            .then(blob => {
              this.setState({
                professors: professors.filter(
                  el => el.email !== this.state.selectedProfessor.email
                )
              });
            });
        });
      handleClose();
    };

    const { professors } = this.state;

    const handleClose = () =>
      this.setState({
        show: false
      });

    const handleShow = professor =>
      this.setState({
        show: true,
        selectedProfessor: professor
      });
    const handleCloseEmail = () =>
      this.setState({
        showInsertEmail: false,
        showErrorAlert: false
      });

    const handleShowEmail = () =>
      this.setState({
        showInsertEmail: true
      });
    const inputTextStyle = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    };

    const { header, professorsSearch, search } = this.state;

    const styleIconTrash = {
      fontSize: "20px",
      color: "#274F77"
    };

    if (search === false) {
      return (
        <div className="content">
          <Grid fluid>
            <span
              style={{ position: "absolute", right: "40px", paddingTop: "5px" }}
            >
              <Button
                onClick={handleShowEmail}
                className="btn-color-blue"
                bsStyle="primary"
              >
                Inserisci email verificata professore
              </Button>
            </span>
            {this.searchProfessor()}
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
                    {professors &&
                      professors.map(element => {
                        return (
                          <tr key={element.serialNumber}>
                            <td>{element.email}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
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
              show={this.state.show}
              onHide={handleClose}
              animation={false}
            >
              <Modal.Header style={{ width: '350px' }} closeButton>
                <Modal.Title style={{ color: '#274F77', fontSize: '25px', fontWeight: '20px' }}>
                  Elimina professore
            </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{ width: '350px', padding: '7px', fontSize: '15px' }}
              >

                <span style={{ paddingLeft: '12px' }}>Confermare l'operazione?</span>
              </Modal.Body>
              <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
                <Button
                  className='btn-color-blue'
                  bsStyle='primary'

                  onClick={handleClose}
                >
                  Annulla
            </Button>
                <Button
                  className=''
                  bsStyle='danger'
                  onClick={deleteProfessor}
                >
                  Conferma
            </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal to insert comment */}
            <Modal
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                marginTop: '13%',
                left: '10%',
                position: 'absolute'
              }}
              dialogClassName="myClass"
              show={this.state.showInsertEmail}
              onHide={handleCloseEmail}
              animation={false}
            >
              <Modal.Header style={{ width: '350px' }} closeButton>
                <Modal.Title style={{ color: '#274F77' }}>
                  Inserire un'email
            </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ width: '350px', padding: '7px' }}>
                <input
                  id="emailText"
                  type="text"
                  style={inputTextStyle}
                >

                </input>
                {
                  this.state.showErrorAlert ?
                    <Alert
                      bsStyle="danger"
                    >
                      <p>{this.state.alertErrorText}</p>
                    </Alert>
                    :
                    <div></div>

                }
              </Modal.Body>
              <Modal.Footer style={{ width: '350px' }}>
                <Button
                  bsStyle='primary'

                  className='btn-color-blue'
                  onClick={handleCloseEmail}
                >
                  Annulla
            </Button>
                <Button
                  bsStyle='success'
                  onClick={() => {
                    setEmailVerified(
                      document.getElementById("emailText").value
                    );
                  }}
                >
                  Inserisci email
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
            <span
              style={{ position: "absolute", right: "40px", paddingTop: "5px" }}
            >
              <Button
                onClick={handleShowEmail}
                style={{ border: "1px solid #274F77", padding: "top" }}
                className="buttonHover"
                bsStyle="primary"
              >
                Inserisci professore
              </Button>
            </span>
            {this.searchProfessor()}
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
                    {professorsSearch &&
                      professorsSearch.map(element => {
                        return (
                          <tr key={element.serialNumber}>
                            <td>{element.email}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
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

            <Modal
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "15%",
                left: "45%",
                position: "absolute",
                height: "210px",
                width: "350px"
              }}
              show={this.state.show}
              onHide={handleClose}
              animation={false}
            >
              <Modal.Header style={{ width: "350px" }} closeButton>
                <Modal.Title style={{ color: "#274F77" }}>
                  Elimina professore
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
                  onClick={deleteProfessor}
                >
                  Elimina
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Modal to insert an email */}
            <Modal
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "15%",
                left: "45%",
                position: "absolute",
                height: "210px",
                width: "350px"
              }}
              show={this.state.showInsertEmail}
              onHide={handleCloseEmail}
              animation={false}
            >
              <Modal.Header style={{ width: "350px" }} closeButton>
                <Modal.Title style={{ color: "#274F77" }}>
                  Inserisci email
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ width: "350px", padding: "7px" }}>
                <input
                  id="emailText"
                  type="text"
                  style={inputTextStyle}
                ></input>
                <div id="errorEmail"></div>
              </Modal.Body>

              <Modal.Footer style={{ width: "350px" }}>
                <Button
                  className="buttonHover button"
                  variant="secondary"
                  onClick={handleCloseEmail}
                >
                  Annulla
                </Button>
                <Button
                  className="buttonHover button"
                  variant="primary"
                  onClick={() => {
                    setEmailVerified(
                      document.getElementById("emailText").value
                    );
                  }}
                >
                  Inserisci
                </Button>
              </Modal.Footer>
            </Modal>
          </Grid>
        </div>
      );
    }
  }
}
export default ProfessorList;
