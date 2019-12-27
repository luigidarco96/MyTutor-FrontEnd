import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

const dictionaryState = {
  Draft: 'Bozza',
  Published: 'Pubblicato'
};

export default class TypedNotices extends Component {
  constructor(props) {
    super(props);
    this.getDetailNotice = this.getDetailNotice.bind(this);
    this.state = {
      pathname: ''
    };
  }

  getDetailNotice = e => {
    let { pathname } = this.props;
    let path = 'http://localhost:3000/';
    path = path.concat(pathname + '/detailNotices/' + e.protocol);
    window.location.replace(path);
  };

  render() {
    const { type, notices } = this.props;

    return (
      <Table key={type} hover>
        <thead>
          <tr>
            <th>Protocollo</th>
            <th>Data termine</th>
            <th>Tipo</th>
            <th>Stato</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(element => {
            return (
              <tr
                key={element.protocol}
                onClick={() => this.getDetailNotice(element)}
              >
                <td>{element.protocol}</td>
                <td>{element.deadline.split('T')[0]}</td>
                <td>{element.type}</td>
                <td>{dictionaryState[element.state]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
