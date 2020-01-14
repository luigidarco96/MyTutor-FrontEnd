import React, { Component } from "react";
import { Grid, Row, Table, Col, Button } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import axios from "axios";
import { StateNoticeDictionary } from "../static/dicts.js";

class Rankings extends Component {
  state = {
    header: [],
    notices: []
  };
  componentDidMount() {
    //Set the header of the table.
    this.setState({
      header: [
        "Protocollo",
        "Stato",
        "Carica graduatoria",
        "Scarica graduatoria"
      ]
    });
    //Set the headers for the authantication
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    //Call to search the notices with state 'waiting for graded list'.
    axios
      .post(
        "http://localhost:3001/api/notices/search",
        { state: "Waiting for Graded List" },
        { headers: headers }
      )
      .then(blob => {
        this.setState({
          notices: blob.data.notices
        });
      });
  }

  render() {
    const { header, notices } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Graduatorie"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr style={{ marginLeft: "115px" }}>
                        {header.map((prop, key) => {
                          return (
                            <th
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "20px"
                              }}
                              key={key}
                            >
                              {prop}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {notices &&
                        notices.map(element => {
                          return (
                            <tr key={element.notice_protocol}>
                              {
                                //Controllare i campi da inserire nella tabella
                              }
                              <td
                                style={{
                                  paddingLeft: "27px",
                                  paddingRight: "0px"
                                }}
                              >
                                {" "}
                                {element.protocol}{" "}
                              </td>
                              <td
                                style={{
                                  paddingLeft: "0px",
                                  position: "relative",
                                  right: "14px"
                                }}
                              >
                                {" "}
                                {StateNoticeDictionary[element.state]}{" "}
                              </td>
                              <td style={{ paddingLeft: "42px" }}>
                                <Button
                                  style={{
                                    border: "1px solid #274F77",
                                    position: "relative",
                                    right: "18px"
                                  }}
                                  className="btn-color-blue"
                                  bsStyle="primary"
                                  onClick={() => {
                                    this.props.history.push(
                                      "/ddi/uploadRanking/" + element.protocol
                                    );
                                  }}
                                >
                                  Carica graduatoria
                                </Button>
                              </td>
                              <td style={{ paddingLeft: "0px" }}>
                                <Button
                                  style={{
                                    border: "1px solid #274F77",
                                    position: "relative",
                                    left: "20px"
                                  }}
                                  className="btn-color-blue"
                                  bsStyle="primary"
                                  onClick={() => {
                                    const headers = {
                                      Authorization: localStorage.getItem(
                                        "token"
                                      )
                                    };
                                    //Call servise to download graded list

                                    axios
                                      .get(
                                        "http://localhost:3001/api/notices/grades/pdf/" +
                                          element.protocol,
                                        {
                                          headers: headers,
                                          responseType: "blob"
                                        }
                                      )
                                      .then(blob => {
                                        const fileName = blob.headers[
                                          "content-disposition"
                                        ]
                                          .split(";")[1]
                                          .trim()
                                          .split('"')[1];
                                        let a = document.createElement("a");
                                        var url = window.URL.createObjectURL(
                                          blob.data
                                        );
                                        a.href = url;
                                        a.download = fileName;
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                        a.remove();
                                      });
                                  }}
                                >
                                  Scarica graduatoria
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                }
              ></Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Rankings;
