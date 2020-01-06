import React, { Component } from 'react';
import { Table, Modal } from 'react-bootstrap';

import { StateDictionary } from '../../static/dicts';
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
      showComment:false,
      selectedNotice: '',
      selectedComment: '',
    };
  
  }
 

  getDetailNotice = e => {
    let { pathname } = this.props;
    let path = 'http://localhost:3000/';
    path = path.concat(pathname + '/detailNotices/' + e.protocol);
    window.location.replace(path);
  };

  draftOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Authorization':localStorage.getItem('token'),
    }
    //Show the comment of a notice
    const showComment=(e,element)=>{
        e.stopPropagation();
        e.preventDefault();
        axios
        .post('http://localhost:3001/api/comment',{noticeProtocol:element.protocol},{headers:headers})
        .then(blob=>{
          if(blob.data.comment!=null){
            this.setState({
              showComment: true,
              selectedComment: blob.data.comment.text,
            })
          }
          else{
            this.setState({
              showComment: true,
              selectedComment: 'Nessun commento disponibile',
            })
          }
        })
    }
    const sendToProfessor = (element)=>{
      element.state = "In Acceptance";
      element.deadline = element.deadline.split('T')[0];
      axios
      .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
      .then(blob=>{
        this.setState({
          notices: this.props.notices,
        })

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        
      })
    }
    if (Boolean(user) && user.role === 'Teaching Office') {
        return (
          <td>
            <i className='pe-7s-comment commentHover' onClick={(e)=>{showComment(e,element)}}style={{fontSize:'20px'}}></i>
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
                }
              }
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
                }
              }
            >
              Elimina
            </CustomButton>
          
            <CustomButton
              bsStyle='success'
              pullRight
              onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  sendToProfessor(element);
                }
              }
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

  acceptedOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
    const headers = {
      'Authorization':localStorage.getItem('token'),
    }
    const sendToDDI = (element)=>{
      element.state = "In Approval";
      element.deadline = element.deadline.split('T')[0];
      axios
      .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
      .then(blob=>{
        this.setState({
          notices: this.props.notices,
        })

        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
            el = element;
          }
        });

        this.setState({
          notices: this.state.notices
        });
        
      })
    }

    if (Boolean(user) && user.role === 'Teaching Office') {
      return (
        <td>
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              sendToDDI(element);
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
    //Update state notice to Accepted.
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
          this.setState({
            notices: this.props.notices,
          })
          this.state.notices.forEach(el => {
            if (el.protocol === element.protocol) {
              el = element;
            }
          });
          this.setState({
            notices: this.state.notices
          });
        });
        
    };
    //Notice not accepted by professor.
    let notAcceptNotice=(e,element)=>{
      e.stopPropagation();
      e.preventDefault();
      console.log(element);
      element.state = 'Draft';
      element.deadline = element.deadline.split('T')[0];
      const headers = {
        Authorization: localStorage.getItem('token')
      };
     
      axios
      .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
      .then(blob=>{
        this.setState({
          notices: this.props.notices,
        })
        this.state.notices.forEach(el => {
          if (el.protocol === element.protocol) {
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
            Accetta
          </CustomButton>
         
          <CustomButton
            bsStyle='primary'
            pullRight
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              notAcceptNotice(e,element);
              
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

  approvingOperation(element) {
    let user = JSON.parse(localStorage.getItem('user'));
   
    
    const showModalComment = (element)=>{
      console.log(element);
      console.log('Initial show:'+ this.state.show);
      this.setState({
        show:true,
        selectedNotice: element,
      })
      console.log('Show changed '+this.state.show);
      console.log('Slected notice: '+ this.state.selectedNotice );
    }
    
   
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
              //disapproveNotice(element);
              
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
              window.open('http://localhost:3000/ddi/uploadNotice/'+element.protocol,'_blank');
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
        return this.expiredOperation();
      case 'In attesa di graduatoria':
        return this.waitingForGradedListOperation();
      case 'Chiuso':
        return this.closedOperation();
      case 'In accettazione':
        return this.acceptingOperation(element);
      case 'In Approvazione':
        return this.approvingOperation(element);
      default:
        return <td></td>;
    }
  }

  render() {
    const closeModalComment = ()=>{
      this.setState({
        show:false,
        showComment:false,
      })
    }
       
    const disapproveNotice = (element)=>{
      let user = JSON.parse(localStorage.getItem('user'));

     const headers = {
       'Authorization': localStorage.getItem('token'),
     }
     let comment={
       notice:element.protocol,
       author: user,
       text: ''+document.getElementById('comment').value,
     }
     element.state='Draft'; 
     element.deadline = element.deadline.split('T')[0];
     axios
       .put('http://localhost:3001/api/comment',{comment:comment},{headers:headers})
       .then(blob=>{
          axios
          .patch('http://localhost:3001/api/notices/state',{notice:element},{headers:headers})
          .then(result=>{
            this.setState({
              notices: this.props.notices,
            })
            this.state.notices.forEach(el => {
              if (el.protocol === element.protocol) {
                el = element;
              }
            });
            this.setState({
              notices: this.state.notices
            });
            closeModalComment();

          })
       })
   }
  
    const { type, notices } = this.props;  

    return (
      <div>
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
      <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute'}} show={this.state.show} onHide={closeModalComment} animation={false}>
        <Modal.Header style={{width:'350px'}} closeButton>
          <Modal.Title style={{color:'#274F77'}}>Inserire un Commento</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{width:'350px', padding:'7px'}}><textarea id='comment' style={{height:'55px',width:'341px'}}></textarea></Modal.Body>
          <Modal.Footer style={{width:'350px'}}>
            <CustomButton className='buttonHover button' variant="secondary" onClick={closeModalComment}>Annulla</CustomButton>
                <CustomButton className='buttonHover button' variant="primary" onClick={()=>{disapproveNotice(this.state.selectedNotice)}}>Invia commento</CustomButton>
        </Modal.Footer>
      </Modal>
      {/* Modal to show comment */}
      <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute'}} show={this.state.showComment} onHide={closeModalComment} animation={false}>
        <Modal.Header style={{width:'350px'}} closeButton>
          <Modal.Title style={{color:'#274F77'}}>Commento</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{width:'350px', padding:'7px'}}>{this.state.selectedComment}</Modal.Body>
      </Modal>
      </div>


        
    );
  }
}
