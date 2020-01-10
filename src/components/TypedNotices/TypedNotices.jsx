import React, { Component } from 'react';
import { Table, Modal } from 'react-bootstrap';

import { StateNoticeDictionary } from '../../static/dicts';
import CustomButton from '../CustomButton/CustomButton';
import '../../assets/css/detailNotice.css';
import axios from 'axios';

export default class TypedNotices extends Component {
  constructor(props) {
    super(props);
    this.getDetailNotice = this.getDetailNotice.bind(this);

    this.state = {
      pathname: '',
      type: '',
      notices: '',
      show: false,
      showComment: false,
      showConfirm: false,
      selectedNotice: '',
      selectedComment: '',
      operationToConfrim: '',
      disabled: "",
      isLoadedButton: true,

    };
  }

  //Show the modal to confirm an operation.
  showConfirm() {
    this.setState({
      showConfirm: true
    });
  }

  getDetailNotice = e => {
    let { pathname } = this.props;
    let path = 'http://localhost:3000/';
    path = path.concat(pathname + '/detailNotices/' + e.protocol);
    window.location.replace(path);
  };
  //Operation on draft notices.
  draftOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    //Show the comment of a notice
    const showComment = (e, element) => {
      e.stopPropagation();
      e.preventDefault();
      axios
        .post(
          'http://localhost:3001/api/comment',
          { noticeProtocol: element.protocol },
          { headers: headers }
        )
        .then(blob => {
          if (blob.data.comment != null) {
            this.setState({
              showComment: true,
              selectedComment: blob.data.comment.text
            });
          } else {
            this.setState({
              showComment: true,
              selectedComment: 'Nessun commento disponibile'
            });
          }
        });
    };
    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <i
            className='pe-7s-comment commentHover'
            onClick={e => {
              showComment(e, element);
            }}
            style={{ fontSize: '20px' }}
          ></i>
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

              // Take the notice's protocol and element index
              let id = e.target.parentElement.parentElement.id;
              let noticeIndex = Number(
                e.target.parentElement.parentElement.children[0].innerHTML
              );

              // Take the target element
              let notices = new Array(this.props.notices);
              let deletedNotice = this.props.notices[noticeIndex];
              this.setState({
                selectedNotice: deletedNotice,
                operationToConfrim: 'Elimina bando'
              });
              this.showConfirm();
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

              this.setState({
                selectedNotice: element,
                operationToConfrim: 'Inoltra al professore'
              });

              this.showConfirm();
            }}
          >
            Inoltra al professore
          </CustomButton>
        </td>
      );
    }
  }

  //Operation on published notices.
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

  //Operation on accepted notices.
  acceptedOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      Authorization: localStorage.getItem('token')
    };

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                operationToConfrim: 'Inoltra al DDI',
                selectedNotice: element
              });
              this.showConfirm();
            }}
          >
            Inoltra al DDI
          </CustomButton>
        </td>
      );
    }
  }

  //Operation on approved notices.
  approvedOperation(element) {
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

              this.setState({
                selectedNotice: element,
                operationToConfrim: 'Pubblica bando'
              });

              this.showConfirm();
            }}
          >
            Pubblica bando
          </CustomButton>
        </td>
      );
    }
  }

  expiredOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));

    if (Boolean(user) && user.role === 'Teaching Office') {
      console.log(element);
      const headers = {
        'Authorization' : localStorage.getItem('token')
      }
      if(this.state.isLoadedButton ===true){

      axios
      .post('http://localhost:3001/api/ratings/exists',{noticeProtocol:element.protocol},{headers:headers})
      .then(blob=>{
       this.setState({
          disabled: !blob.data.exists,
          isLoadedButton: false,
        })
       
        
       })
      .catch(error=>{
        console.log('error');
        //TODO: inserire modal errore.
      })
    }
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              window.location.replace('http://localhost:3000/admin/candidatures/'+element.protocol);
            }}
          >
            Visualizza candidature
          </CustomButton>
          
          <CustomButton
          bsStyle='primary'
          pullRight
          disabled={this.state.disabled}
         
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({
              operationToConfrim: 'Inoltra graduatoria',
              selectedNotice: element,
            })
            this.showConfirm();
          }}
        >
          Inoltra graduatoria
        </CustomButton>
        
        </td>   
      )
  

    } else {
      return this.publishedOperation();
    }
  }

  waitingForGradedListOperation(element) {
    return (
      <td>

      </td>
    )
  }

  closedOperation(element) {
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
              window.location.replace('http://localhost:3000/admin/valutations/'+element.protocol);
            }}
          >
            Visualizza tabella
          </CustomButton>
        </td>
      );
    } else {
      return this.publishedOperation();
    }
  }
  //Operation to accepting noteces.
  acceptingOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));

    if (
      Boolean(user) &&
      user.role === 'Professor' &&
      element.referent_professor === user.email
    ) {
      return (
        <td>
          <CustomButton
            bsStyle='success'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedNotice: element,
                operationToConfrim: 'Accetta'
              });
              this.showConfirm();
            }}
          >
            Accetta
          </CustomButton>

          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              this.setState({
                selectedNotice: element,
                operationToConfrim: 'Non accetta'
              });
              this.showConfirm();
            }}
          >
            Non accetta
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
  //Operation to approving notices
  approvingOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));

    //Show the modal to comment a notice.
    const showModalComment = element => {
      console.log(element);
      console.log('Initial show:' + this.state.show);
      this.setState({
        show: true,
        selectedNotice: element
      });
      console.log('Show changed ' + this.state.show);
      console.log('Slected notice: ' + this.state.selectedNotice);
    };

    if (Boolean(user) && user.role === 'DDI') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              showModalComment(element);
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
              const headers = {
                'Authorization': localStorage.getItem('token'),
              }
              axios
              .get('http://localhost:3001/api/notices/pdf/'+element.protocol,{headers:headers, responseType: 'blob'})
              .then(blob=>{
                console.log(blob);
                const fileName = blob.headers['content-disposition'].split(';')[1].trim().split('"')[1];
                let a = document.createElement('a');
                var url = window.URL.createObjectURL(blob.data);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();                          

              })
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
              window.open(
                'http://localhost:3000/ddi/uploadNotice/' + element.protocol,
                '_blank'
              );
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
   
    switch (type) {
      case 'Bozza':
        return this.draftOperation(element);
      case 'Pubblicato':
        return this.publishedOperation();
      case 'Accettato':
        return this.acceptedOperation(element);
      case 'Approvato':
        return this.approvedOperation(element);
      case 'Scaduto':
        return this.expiredOperation(element);
      case 'In attesa della graduatoria':
        return this.waitingForGradedListOperation(element);
      case 'Chiuso':
        return this.closedOperation(element);
      case 'In accettazione':
        return this.acceptingOperation(element);
      case 'In Approvazione':
        return this.approvingOperation(element);
      default:
        return <td></td>;
    }
  }
  //To accept the notice.
  acceptedNotice(element) {
    //Close the modal show to confirm the operation.
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };

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
        this.setState({
          notices: this.props.notices
        });
        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });
        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }
  //Notice not accepted by professor.
  notAcceptNotice(element) {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };

    console.log(element);
    element.state = 'Draft';
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
        this.setState({
          notices: this.props.notices
        });
        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });
        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }

  //Send a notice to professor.
  sendToProfessor(element) {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    element.state = 'In Acceptance';
    element.deadline = element.deadline.split('T')[0];
    axios
      .patch(
        'http://localhost:3001/api/notices/state',
        { notice: element },
        { headers: headers }
      )
      .then(blob => {
        this.setState({
          notices: this.props.notices
        });

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }

  //Send a notice to DDI
  sendNoticeToDDI(element) {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    element.state = 'In Approval';
    element.deadline = element.deadline.split('T')[0];
    axios
      .patch(
        'http://localhost:3001/api/notices/state',
        { notice: element },
        { headers: headers }
      )
      .then(blob => {
        this.setState({
          notices: this.props.notices
        });

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }
  //Publish a notice
  publishNotice(element) {
    //Close the modal to confrim an operation
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    element.state = 'Published';
    element.deadline = element.deadline.split('T')[0];

    axios
      .patch(
        'http://localhost:3001/api/notices/state',
        { notice: element },
        { headers: headers }
      )
      .then(blob => {
        this.setState({
          notices: this.props.notices
        });

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }
  deleteDraftNotice(deletedNotice) {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    // Retrieve from localStorage the user token
    let token = localStorage.getItem('token');

    axios({
      method: 'DELETE',
      url: `http://localhost:3001/api/notices/${deletedNotice.protocol}`,
      data: {
        notice: deletedNotice
      },
      headers: {
        Authorization: token
      }
    }).then(blob => {
      let error = blob.data.error;
      window.location.replace('http://localhost:3000/admin/notices');
      if (error) {
        console.log(error);
      }
    });

    closeConfirm();
  }

  //Send a ranking to DDI
  sendRankingToDDI(element) {
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    element.state = 'Waiting for Graded List';
    element.deadline = element.deadline.split('T')[0];
    axios
      .patch(
        'http://localhost:3001/api/notices/state',
        { notice: element },
        { headers: headers }
      )
      .then(blob => {
        this.setState({
          notices: this.props.notices
        });

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        closeConfirm();
      });
  }
  //Select the operation to do when user confirm an operation.
  selectOperation(operation) {
    switch (operation) {
      case 'Inoltra al professore':
        this.sendToProfessor(this.state.selectedNotice);
        break;
      case 'Accetta':
        this.acceptedNotice(this.state.selectedNotice);
        break;
      case 'Non accetta':
        this.notAcceptNotice(this.state.selectedNotice);
        break;
      case 'Inoltra al DDI':
        this.sendNoticeToDDI(this.state.selectedNotice);
        break;
      case 'Pubblica bando':
        this.publishNotice(this.state.selectedNotice);
        break;
      case 'Elimina bando':
        this.deleteDraftNotice(this.state.selectedNotice);
        break;
      case 'Inoltra graduatoria':
        this.sendRankingToDDI(this.state.selectedNotice);
        break;
    }
  }

  render() {
    //Close the modal when you try to show or insert a comment.
    const closeModalComment = () => {
      this.setState({
        show: false,
        showComment: false
      });
    };
    //Close the modal show when you try to confirm an operation
    const closeConfirm = () => {
      this.setState({
        showConfirm: false
      });
    };
    //Disapprove notice
    const disapproveNotice = element => {
      let user = JSON.parse(localStorage.getItem('user'));

      const headers = {
        Authorization: localStorage.getItem('token')
      };
      let comment = {
        notice: element.protocol,
        author: user,
        text: '' + document.getElementById('comment').value
      };
      element.state = 'Draft';
      element.deadline = element.deadline.split('T')[0];
      axios
        .put(
          'http://localhost:3001/api/comment',
          { comment: comment },
          { headers: headers }
        )
        .then(blob => {
          axios
            .patch(
              'http://localhost:3001/api/notices/state',
              { notice: element },
              { headers: headers }
            )
            .then(result => {
              this.setState({
                notices: this.props.notices
              });
              this.state.notices.forEach(el => {
                if (el.protocol === element.protocol) {
                  el = element;
                }
              });
              this.setState({
                notices: this.state.notices
              });
              closeModalComment();
            });
        });
    };

    let noticesForProf;
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('Tab selezionato ' + this.props.type);
    let acceptingNotice;
    if (user && this.props.type === 'In accettazione') {
      noticesForProf = this.props.notices.filter(notice => {
        return notice.referent_professor === user.email;
      });
      acceptingNotice = noticesForProf;
    }
    const { type, notices } = this.props;

    let noticeList = Boolean(acceptingNotice) ? acceptingNotice : notices;

    //console.log(noticeList);

    return (
      <div>
        <Table key={type} striped bordered hover>
          <thead>
            <tr>
              <th>N.</th>
              <th>Protocollo</th>
              <th>Data termine</th>
              <th>Tipo</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((element, index) => {
              return (
                <tr
                  id={element.protocol}
                  key={element.protocol}
                  onClick={() => this.getDetailNotice(element)}
                >
                  <td>{index}</td>
                  <td>{element.protocol}</td>
                  <td>{element.deadline}</td>
                  <td>{element.type}</td>
                  <td>{StateNoticeDictionary[element.state]}</td>
                  {this.displayButtons(type, element)}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* Modal to insert comment */}
        <Modal
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            marginTop: '13%',
            left: '10%',
            position: 'absolute'
          }}
          dialogClassName="myClass"
          show={this.state.show}
          onHide={closeModalComment}
          animation={false}
        >
          <Modal.Header style={{ width: '350px' }} closeButton>
            <Modal.Title style={{ color: '#274F77' }}>
              Inserire un Commento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: '350px', padding: '7px' }}>
            <textarea
              id='comment'
              style={{ height: '55px', width: '341px' }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer style={{ width: '350px' }}>
            <CustomButton
              className='buttonHover button'
              variant='secondary'
              onClick={closeModalComment}
            >
              Annulla
            </CustomButton>
            <CustomButton
              className='buttonHover button'
              variant='primary'
              onClick={() => {
                disapproveNotice(this.state.selectedNotice);
              }}
            >
              Invia commento
            </CustomButton>
          </Modal.Footer>
        </Modal>
        {/* Modal to show comment */}
        <Modal
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            marginTop: '13%',
            left: '10%',
            position: 'absolute'
          }}
          dialogClassName="myClass"
          show={this.state.showComment}
          onHide={closeModalComment}
          animation={false}
        >
          <Modal.Header style={{ width: '350px' }} closeButton>
            <Modal.Title style={{ color: '#274F77' }}>Commento</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ width: '350px', padding: '7px' }}>
            {this.state.selectedComment}
          </Modal.Body>
        </Modal>
        {/* Modal to confirm operation */}
        <Modal
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            marginTop: '13%',
            left: '10%',
            position: 'absolute'
          }}
          dialogClassName="myClass"
          show={this.state.showConfirm}
          onHide={closeConfirm}
          animation={false}
        >
          <Modal.Header style={{ width: '350px' }} closeButton>
            <Modal.Title style={{ color: '#274F77' }}>
              {this.state.operationToConfrim}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ width: '350px', padding: '7px', fontSize: '25px' }}
          >
            Confermare l'operazione?
          </Modal.Body>
          <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
            <CustomButton
              className='buttonHover button'
              variant='secondary'
              onClick={closeConfirm}
            >
              Annulla
            </CustomButton>
            <CustomButton
              className='buttonHover button'
              variant='primary'
              onClick={() => {
                this.selectOperation(this.state.operationToConfrim);
              }}
            >
              Conferma
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
