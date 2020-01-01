import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { StateDictionary } from '../../static/dicts';
import CustomButton from '../CustomButton/CustomButton';
import '../../assets/css/detailNotice.css';

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

  componentDidMount() {
    const { type } = this.props;
    let buttons;

    switch (type) {
      case 'Bozza':
        buttons = (
          <td>
            <CustomButton
              bsStyle='primary'
              pullRight
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                console.log(
                  e.target.parentElement.parentElement.id,
                  'Da fare!'
                );
              }}
            >
              Modifica
            </CustomButton>
            <CustomButton
              bsStyle='warning'
              pullRight
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                console.log(
                  e.target.parentElement.parentElement.id,
                  'Da fare!'
                );
              }}
            >
              Elimina
            </CustomButton>
            <CustomButton
              bsStyle='success'
              pullRight
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                console.log(
                  e.target.parentElement.parentElement.id,
                  'Da fare!'
                );
              }}
            >
              Inoltra al professore
            </CustomButton>
          </td>
        );
        break;
      case 'Pubblicato':
        buttons = (
          <td>
            <CustomButton
              bsStyle='primary'
              pullRight
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                const notice = {
                  protocol: e.target.parentElement.parentElement.id
                };
                this.getDetailNotice(notice);
              }}
            >
              Visualizza dettaglio
            </CustomButton>
          </td>
        );
        break;
      case 'Accettato':
        buttons = (
          <td>
            <CustomButton
              bsStyle='primary'
              pullRight
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                console.log(
                  e.target.parentElement.parentElement.id,
                  'Da fare!'
                );
              }}
            >
              Inoltra al DDI
            </CustomButton>
          </td>
        );
    }

    this.setState({
      buttons: buttons
    });
  }

  render() {
    const { type, notices } = this.props;

    return (
      <Table key={type} striped bordered hover>
        <thead>
          <tr>
            <th>Protocollo</th>
            <th>Data termine</th>
            <th>Tipo</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(element => {
            return (
              <tr
                id={element.protocol}
                key={element.protocol}
                onClick={() => this.getDetailNotice(element)}
              >
                <td>{element.protocol}</td>
                <td>{element.deadline.split('T')[0]}</td>
                <td>{element.type}</td>
                <td>{StateDictionary[element.state]}</td>
                {this.state.buttons}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
