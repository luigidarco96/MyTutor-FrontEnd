import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { StateDictionary } from '../../static/dicts';
import CustomButton from '../CustomButton/CustomButton';
import '../../assets/css/detailNotice.css';
import axios from 'axios';

export default class TypedNotices extends Component {
  constructor(props) {
    super(props);
    this.getDetailNotice = this.getDetailNotice.bind(this);
  }

  getDetailNotice = e => {
    let { pathname } = this.props;
    let path = 'http://localhost:3000/';
    path = path.concat(pathname + '/detailNotices/' + e.protocol);
    window.location.replace(path);
  };

  draftOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              // Prevent propagation and the default action
              e.stopPropagation();
              e.preventDefault();

              // Take the notice's protocol
              let id = e.target.parentElement.parentElement.id;

              // Redirect to the modifications page
              window.location = `manageNotice/${id}`;
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
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
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
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Inoltra al professore
          </CustomButton>
        </td>
      );
    }
  }

  publishedOperation() {
    return (
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
  }

  acceptedOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Inoltra al DDI
          </CustomButton>
        </td>
      );
    }
  }

  approvedOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Pubblica bando
          </CustomButton>
        </td>
      );
    }
  }

  expiredOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Visualizza candidature
          </CustomButton>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Inoltra graduatoria
          </CustomButton>
        </td>
      );
    } else {
      return this.publishedOperation();
    }
  }

  waitingForGradedListOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Pubblica graduatoria
          </CustomButton>
        </td>
      );
    } else {
      return this.publishedOperation();
    }
  }

  closedOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Scarica graduatoria
          </CustomButton>
        </td>
      );
    } else {
      return this.publishedOperation();
    }
  }

  acceptingOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
    let acceptedNotice = (e, element) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(element);
      element.state = 'Accepted';
      element.deadline = element.deadline.split('T')[0];
      const headers = {
        Authorization: localStorage.getItem('token')
      };
      axios
        .patch(
          'http://localhost:3001/api/notices/state',
          { notice: element },
          { headers: headers }
        )
        .then(blob => {
          this.state.notices.forEach(el => {
            if (el.protocol === element.protocol) {
              console.log(el);
              el = element;
            }
          });
          this.setState({
            notices: this.state.notices
          });
        });
    };
    if (Boolean(user) && user.role === 'Professor') {
      return (
        <td>
          <CustomButton
            bsStyle='success'
            pullRight
            onClick={e => {
              acceptedNotice(e, element);
            }}
          >
            Accetta bando
          </CustomButton>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Compila tabelle valutazioni
          </CustomButton>
        </td>
      );
    }
  }

  approvingOperation() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'DDI') {
      console.log('Ciao');
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Non Approvare
          </CustomButton>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Scarica bando
          </CustomButton>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e.target.parentElement.parentElement.id, 'Da fare!');
            }}
          >
            Carica bando
          </CustomButton>
        </td>
      );
    }
  }

  //element is the notice selected
  displayButtons(type, element) {
    console.log(type);
    switch (type) {
      case 'Bozza':
        return this.draftOperation();
      case 'Pubblicato':
        return this.publishedOperation();
      case 'Accettato':
        return this.acceptedOperation();
      case 'Approvato':
        return this.approvedOperation();
      case 'Scaduto':
        return this.expiredOperation();
      case 'In attesa di graduatoria':
        return this.waitingForGradedListOperation();
      case 'Chiuso':
        return this.closedOperation();
      case 'In accettazione':
        return this.acceptingOperation(element);
      case 'In Approvazione':
        return this.approvingOperation();
      default:
        return <td></td>;
    }
  }

  render() {
    this.state = {
      pathname: '',
      type: this.props.type,
      notices: this.props.notices
    };
    const { type, notices } = this.state;

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
                {this.displayButtons(type, element)}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
