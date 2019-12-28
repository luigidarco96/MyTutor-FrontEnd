import React,{Component} from 'react';
import {Grid, Row, Table, Col, Modal} from 'react-bootstrap';
import { students } from 'static/students';
import Button from '../CustomButton/CustomButton'



export class StudentList extends Component{
    state={
        header:[],
        content:[],
        isLoading: true,
        show: false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        
        this.setState({
            header:['E-mail','Nome','Cognome','Matricola','Data di Nascita'],
        });
    }
    render(){
      const handleClose = () => this.setState({
          show:false,
      });

      const handleShow = () => this.setState({
        show:true,
      });

                
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
                            {students &&
                              students.map(element => {
                                return (
                                  <tr
                                    key={element.serialNumber}
                               
                                  >
                                    <td>{element.email}</td>
                                    <td>{element.name}</td>
                                    <td>{element.surname}</td>                                    
                                    <td>{element.serialNumber}</td>
                                    <td>{element.birthDate}</td>
                                    <td onClick={handleShow} ><i className="pe-7s-trash trashIcon" style={styleIconTrash}></i></td>
                                  </tr>
                                );
                                
                              })}
                          </tbody>
                        </Table>
                  </Col>
                </Row>
                  
                  <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute',height:'200px',width:'350px'}} show={this.state.show} onHide={handleClose} animation={false}>
                    <Modal.Header style={{width:'350px'}} closeButton>
                      <Modal.Title style={{color:'#274F77'}}>Elimina studente</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body style={{width:'350px'}}>Confermare l'eliminazione?</Modal.Body>
                      <Modal.Footer style={{width:'350px'}}>
                        <Button className='buttonHover button' variant="secondary" onClick={handleClose}>Annulla</Button>
                        <Button className='buttonHover button' variant="primary" onClick={handleClose}>Elimina</Button>
                    </Modal.Footer>
                  </Modal>
                  
              </Grid>
            </div>
          );
        }

      }
export default StudentList;