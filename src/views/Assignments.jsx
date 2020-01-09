import React, { Component } from "react";
import Axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import UsersTabs from "../components/UsersTabs/UsersTabs";

import { UserAssignmentLists } from "../static/dicts.js";

class Assignmets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.location.pathname.split("/")[1],
      assignments: [],
      isLoaded: false
    };
  }

  handleDifferentUsers(pathname, assignments) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      return (
        <div className="container-fluid">
          <UsersTabs
            pathname={pathname}
            assignments={assignments}
            tabs={UserAssignmentLists[user.role]}
          />
        </div>
      );
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem("token");

    if (Boolean(token)) {
      // Fetch the assignments
      const headers = {
        Authorization: token
      };

      Axios.get("http://localhost:3001/api/assignments/search", {
        headers: headers
      })
        .then(blob => {
          this.setState({
            isLoaded: true,
            assignments: blob.data.list
          });
        })
        .catch(error => {
          console.log(error);
          if (error) {
            window.location = "/signin";
          }
        });
    }
  }

  render() {
    const { pathname, isLoaded, assignments } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!isLoaded) {
      return (
        <div className="container-fluid">
          <h1>Caricamento...</h1>
        </div>
      );
    } else {
      console.log(isLoaded);
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title={user.role==="Student"?"Lista incarichi":"Lista assegni"}
                  ctTableFullWidth
                  ctTableResponsive
                  content={this.handleDifferentUsers(pathname, assignments)}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Assignmets;
