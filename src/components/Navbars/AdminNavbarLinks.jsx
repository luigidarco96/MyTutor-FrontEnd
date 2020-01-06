import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { logout } from '../../utils/auth';
import { Link } from 'react-router-dom';

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
        <MenuItem eventKey={2.1} href='profile'>
          Visualizza profilo
        </MenuItem>
      );
    }
  }

  divider() {
    const { hasProfile } = this.state;

    if (hasProfile) {
      return <MenuItem divider />;
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && (user.role === 'Student' || user.role === 'Professor')) {
      this.setState({
        hasProfile: true
      });
    }
  }

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title={
              <span>
                <i className='pe-7s-user pe-custom-32px' />
              </span>
            }
            id='basic-nav-dropdown-right'
          >
            {this.showProfile()}
            {this.divider()}
            <MenuItem eventKey={2.5} onClick={logout}>
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
