import React, { Component, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

import Card from 'components/Card/Card.jsx';
import UsersTabs from '../components/UsersTabs/UsersTabs';

import { UserLists } from '../static/dicts';

/**
 * Notices.jsx
 * This component display all notices for a specific user.
 *
 * @component
 * @author Federico Allegretti
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

class Notices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.location.pathname.split('/')[1],
      notices: [],
      isLoaded: false
    };
  }

  handleDifferentUsers(pathname, notices) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      return (
        <UsersTabs
          pathname={pathname}
          notices={notices}
          tabs={UserLists[user.role]}
        />
      );
    } else {
      return (
        <UsersTabs
          pathname={pathname}
          notices={notices}
          tabs={UserLists['Student']}
        />
      );
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');

    if (Boolean(token)) {
      // Fetch the notices
      Axios.get('http://localhost:3001/api/notices', {
        headers: {
          Authorization: token
        }
      })
        .then(blob => blob.data)
        .then(result => {
          this.setState({
            isLoaded: true,
            notices: result.notices
          });
        });
    } else {
      Axios.get('http://localhost:3001/api/notices')
        .then(blob => blob.data)
        .then(result => {
          this.setState({
            isLoaded: true,
            notices: result.notices
          });
        });
    }
  }

  render() {
    const { pathname, isLoaded, notices } = this.state;

    if (!isLoaded) {
      return (
        <div className='container-fluid'>
          <h1>Caricamento...</h1>
        </div>
      );
    } else {
      return (
        <div className='content'>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title='Lista Bandi'
                  ctTableFullWidth
                  ctTableResponsive
                  content={this.handleDifferentUsers(pathname, notices)}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Notices;
