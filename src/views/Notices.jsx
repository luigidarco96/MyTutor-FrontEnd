import React, { Component } from 'react';

import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';

class Notices extends Component {
  state = {
    header: [],
    content: {},
    isLoading: true
  };
  constructor(props) {
    super(props);
    this.getDetailNotice = this.getDetailNotice.bind(this);
  }

  componentDidMount() {
    this.setState({
      header: ['protocollo', 'data scadenza', 'tipo', 'stato']
    });
    fetch('http://localhost:3001/api/notices')
      .then(blob => blob.json())
      .then(
        result => {
          this.setState({
            content: result,
            isLoading: false
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  getDetailNotice = e => {
    let pathname = this.props.location.pathname;
    let path = 'http://localhost:3000/';
    path = path.concat(pathname.split('/')[1] + '/detailNotices/' + e.protocol);
    window.location.replace(path);
  };

  render() {
    const {
      header,
      content: { notices }
    } = this.state;

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
                  <Table hover>
                    <thead>
                      <tr>
                        {header.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {notices &&
                        notices.map(element => {
                          return (
                            <tr
                              key={element.protocol}
                              onClick={() => this.getDetailNotice(element)}
                            >
                              <td>{element.protocol}</td>
                              <td>{element.deadline.split('T')[0]}</td>
                              <td>{element.type}</td>
                              <td>{element.state}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Notices;
