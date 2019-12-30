import React, { Component } from 'react';

import Card from 'components/Card/Card.jsx';
import TypedNotices from '../components/AdminNotices/TypedNotices';

import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const dictionaryState = {
  Draft: 'Bozza',
  Published: 'Pubblicato'
};

class Notices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.location.pathname.split('/')[1],
      selectedTab: 'Bozza',
      notices: {},
      isLoaded: false
    };
  }

  componentDidMount() {
    const { selectedTab } = this.state;
    // Fetch the notices
    fetch('http://localhost:3001/api/notices', { authorization: 'Bello' })
      .then(blob => blob.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          notices: result.notices,
          filteredNotices: result.notices.filter(notice => {
            return dictionaryState[notice.state] === selectedTab;
          })
        });
      });
  }

  handleTabSelect(e) {
    const { notices } = this.state;

    let filteredNotices = notices.filter(notice => {
      return dictionaryState[notice.state] === e;
    });

    this.setState({
      selectedTab: e,
      filteredNotices: filteredNotices
    });
  }

  render() {
    const { selectedTab, pathname, isLoaded, filteredNotices } = this.state;

    if (!isLoaded) {
      return <h1>Caricamento...</h1>;
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
                  content={
                    <Tabs
                      defaultActiveKey='Bozza'
                      onSelect={e => this.handleTabSelect(e)}
                      transition={false}
                    >
                      <Tab eventKey='Bozza' title='Bozza'>
                        <Grid fluid>
                          <Row style={{ padding: '5px', marginTop: '10px' }}>
                            <Col md={12}>
                              <Link
                                to={'createNotice'}
                                style={{ fontSize: '25px' }}
                              >
                                <i
                                  className='pe-7s-plus'
                                  style={{
                                    margin: 'auto 10px',
                                    fontSize: '20px'
                                  }}
                                ></i>
                                Crea bando
                              </Link>
                            </Col>
                          </Row>
                          <Row>
                            <TypedNotices
                              pathname={pathname}
                              notices={filteredNotices}
                              type={selectedTab}
                            />
                          </Row>
                        </Grid>
                      </Tab>
                      <Tab eventKey='Pubblicato' title='Pubblicati'>
                        <TypedNotices
                          pathname={pathname}
                          notices={filteredNotices}
                          type={selectedTab}
                        />
                      </Tab>
                    </Tabs>
                  }
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
