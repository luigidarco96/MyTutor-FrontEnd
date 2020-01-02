import React,{Component} from 'react';
import {Grid, Row, Table, Col,Modal} from 'react-bootstrap';
import { students } from "static/students";
import Button from '../CustomButton/CustomButton';
import { login, logout } from '../../utils/auth';
import axios from 'axios';

export class ProfessorList extends Component{
    state={
        header:[],
        professors:[],
        isLoading: true,
        show: false,
        showInsertEmail:false,
        selectedProfessor:'',
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        
        this.setState({
            header:['E-mail','Nome','Cognome']
        });
        let data ={
          param:{
            role:'Professor',
          }
        }

        let headers ={
          'Authorization':localStorage.getItem('token'),
        }
        axios.post('http://localhost:3001/api/users/search',data,{
          headers:headers,
        })
        .then(blob=>{
          this.setState({
            professors: blob.data.list,
          })
        });


        
    }
    render(){
      const deleteProfessor = ()=>{
        //Search the professor to delete.
       
        const id = this.state.selectedProfessor.email; 
        let url ='http://localhost:3001/api/users/'+id;
        axios
        .get(url,{
          headers:{
            'Authorization': localStorage.getItem('token'),
          },
        })
        .then(blob => {
          this.setState({
            selectedProfessor: blob.data.user,
          })
        });

        const headers={
          'Authorization': localStorage.getItem('token'),
        }
        //Delete the user selected.
        axios.
        delete('http://localhost:3001/api/users/'+this.state.selectedProfessor.email,{
          headers: headers,
        },)
        .then(blob=>{
          professors.pop(professors.filter((el)=>el.email===this.state.selectedProfessor.email)[0]);
          this.setState({
            professors:professors,
          })

        });
        handleClose();
        
      }


      const {professors} = this.state;

      const handleClose = () => this.setState({
        show:false,
      });

      const handleShow = (professor) => this.setState({
        show:true,
        selectedProfessor:professor,
      });
      const handleCloseEmail = () => this.setState({
        showInsertEmail:false,
      });

      const handleShowEmail = () => this.setState({
        showInsertEmail:true,
      });
      const inputTextStyle={
        height: '18px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid #274F77',
        paddingLeft: '5px',
      }

     
      const {
            header,
        }=this.state;
        
      const styleIconTrash={
        fontSize:'20px',
        color:'#274F77',
      }
        return (
            <div className='content'>
              <Grid fluid>
              <div>   
                  <input className='inputSearchBar' type='text' placeholder='Cerca...'/>
                  <span><i className='pe-7s-search iconSearchBar'></i></span>
                  <span style={{position:"absolute",right:"40px"}}>
                    <Button onClick={handleShowEmail} style={{border:'1px solid #274F77'}} className='buttonHover'  bsStyle="primary"  bsSize="xs">
                      Inserisci professore
                    </Button>
                  </span>

                </div> 

                <Row>
                  <Col md={12}>
                        <Table hover>
                          <thead>
                            <tr>
                              {header.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {professors &&
                              professors.map(element => {
                                return (
                                  <tr
                                    key={element.serialNumber}
                               
                                  >
                                    <td>{element.email}</td>
                                    <td>{element.name}</td>
                                    <td>{element.surname}</td>                                    
                                    <td onClick={()=>{handleShow(element)}}><i className="pe-7s-trash trashIcon" style={styleIconTrash}></i></td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                  </Col>
                </Row>
                
                <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute',height:'200px',width:'350px'}} show={this.state.show} onHide={handleClose} animation={false}>
                    <Modal.Header style={{width:'350px'}} closeButton>
                      <Modal.Title style={{color:'#274F77'}}>Elimina professore</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body style={{width:'350px',padding:'7px'}}>Confermare l'eliminazione?</Modal.Body>
                      <Modal.Footer style={{width:'350px'}}>
                        <Button className='buttonHover button' variant="secondary" onClick={handleClose}>Annulla</Button>
                        <Button className='buttonHover button' variant="primary" onClick={deleteProfessor}>Elimina</Button>
                    </Modal.Footer>
                </Modal>              
                <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute',height:'200px',width:'350px'}} show={this.state.showInsertEmail} onHide={handleCloseEmail} animation={false}>
                    <Modal.Header style={{width:'350px'}} closeButton>
                      <Modal.Title style={{color:'#274F77'}}>Inserisci email</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body style={{width:'350px', padding:'7px'}}><input type='text' style={inputTextStyle}></input></Modal.Body>
                      <Modal.Footer style={{width:'350px'}}>
                        <Button className='buttonHover button' variant="secondary" onClick={handleCloseEmail}>Annulla</Button>
                        <Button className='buttonHover button' variant="primary" onClick={handleCloseEmail}>Inserisci</Button>
                    </Modal.Footer>
                </Modal>              
                              
            
            </Grid>

            </div>
          );
        }

      }
export default ProfessorList;