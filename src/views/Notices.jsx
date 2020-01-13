import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, FormControl } from 'react-bootstrap';
import Axios from 'axios';

import Card from 'components/Card/Card.jsx';
import UsersTabs from '../components/UsersTabs/UsersTabs';

import { UserNoticeLists } from '../static/dicts';

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

  handleSearch(e) {}

  handleDifferentUsers(pathname, notices) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      return (
        <div className='container-fluid'>
          <div className='search-group'>
            <Glyphicon glyph='search' />
            <FormControl
              className='search-bar'
              type='text'
              name='search'
              placeholder='Cerca bando...'
              onChange={e => this.handleSearch(e)}
            />
          </div>
          <UsersTabs
            pathname={pathname}
            notices={notices}
            tabs={UserNoticeLists[user.role]}
            history={this.props.history}
          />
        </div>
      );
    } else {
      return (
        <div className='container-fluid'>
          <div className='search-group'>
            <Glyphicon glyph='search' />
            <FormControl
              className='search-bar'
              type='text'
              name='search'
              placeholder='Cerca bando...'
              onChange={e => this.handleSearch(e)}
            />
          </div>
          <UsersTabs
            pathname={pathname}
            notices={notices}
            tabs={UserNoticeLists['Student']}
            history={this.props.history}
          />
        </div>
      );
    }
  }

  componentDidMount() {
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
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.location = '/signin';
          }
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
