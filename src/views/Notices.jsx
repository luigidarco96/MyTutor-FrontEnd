import React, { Component, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import Fuse from 'fuse.js';

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

  handleSearch(e) {
    const { notices } = this.state;

    var options = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['protocol', 'description']
    };
    var fuse = new Fuse(notices, options); // "list" is the item array
    var result = fuse.search(e.target.value);

    console.log(e.target.value);
    console.log(result);
  }

  handleDifferentUsers(pathname, notices) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      return (
        <div className='container-fluid'>
          <input
            type='text'
            name='search'
            placeholder='Cerca bando...'
            onChange={e => this.handleSearch(e)}
          />
          <UsersTabs
            pathname={pathname}
            notices={notices}
            tabs={UserLists[user.role]}
          />
        </div>
      );
    } else {
      return (
        <div className='container-fluid'>
          <input
            type='text'
            name='search'
            placeholder='Cerca bando...'
            onChange={e => this.handleSearch(e)}
          />
          <UsersTabs
            pathname={pathname}
            notices={notices}
            tabs={UserLists['Student']}
          />
        </div>
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
