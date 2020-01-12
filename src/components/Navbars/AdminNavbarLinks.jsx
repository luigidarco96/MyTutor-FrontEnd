import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { logout } from "../../utils/auth";
import Button from "components/CustomButton/CustomButton";

class AdminNavbarLinks extends Component {
  constructor() {
    super();

    this.state = {
      hasProfile: false
    };
  }

  showProfile() {
    const { hasProfile } = this.state;

    if (hasProfile) {
      return (
        <Button
          bsStyle="primary"
          simple
          href="profile"
          style={{ color: "#274F77" }}
        >
          Profilo
        </Button>
      );
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && (user.role === "Student" || user.role === "Professor")) {
      this.setState({
        hasProfile: true
      });
    }
  }

  render() {
    return (
      <div>
        <Nav pullRight className="auth_buttons">
          {this.showProfile()}
          <Button
            bsStyle="danger"
            fill
            onClick={() => logout()}
            style={{ color: "white" }}
          >
            {" "}
            Logout
          </Button>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
