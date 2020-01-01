import React,{Component} from 'react';
import {Grid, Row, Table, Col, Modal} from 'react-bootstrap';
import Button from '../CustomButton/CustomButton'
import axios from 'axios'

export class StudentList extends Component{
    state={
        header:[],
        students:[],
        selectedStudent: '',
        show: false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        //Headers sends to the search request for authentication.
        const headers = {
          'Authorization': localStorage.getItem('token'),
        }
        //Data sends to the search request.
        let data={
          param:{
            role: 'Student',
          } 
        };
        
        this.setState({
            header:['E-mail','Nome','Cognome','Matricola','Data di Nascita'],
        });

        axios
        .post('http://localhost:3001/api/users/search',data,
        {
          headers:headers,
        })
        .then(blob => {
          this.setState({
            students: blob.data.list,
          })
        });

    }

    render(){
      //Function to delete selected student.
    
      const deleteStudent = ()=>{
        //Search the student to delete.
       
        const id = this.state.selectedStudent.email; 
        let url ='http://localhost:3001/api/users/'+id;
        axios
        .get(url,{
          headers:{
            'Authorization': localStorage.getItem('token'),
          },
        })
        .then(blob => {
          this.setState({
            selectedStudent: blob.data.user,
          })
        });

        const headers={
          'Authorization': localStorage.getItem('token'),
        }
        //Delete the user selected.
        axios.
        delete('http://localhost:3001/api/users/'+this.state.selectedStudent.email,{
          headers: headers,
        },)
        .then(blob=>{
          students.pop(students.filter((el)=>el.email===this.state.selectedStudent.email)[0]);
          this.setState({
            students:students,
          })

        });
        handleClose();
        
      }
      
    
      const handleClose = () => this.setState({
        show:false,
      });

    
      const handleShow = (student) => this.setState({
        show:true,
        selectedStudent: student,
      });

      const{students} = this.state;
           
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
                                    <td>{element.registration_number}</td>
                                    <td>{element.birth_date}</td>
                                    <td onClick={()=>{handleShow(element)}} ><i className="pe-7s-trash trashIcon" style={styleIconTrash}></i></td>
                                  </tr>
                                );
                                
                              })}
                          </tbody>
                        </Table>
                  </Col>
                </Row>
                 
                  {/*This is the popup shown when you try to delete a student*/}
                  <Modal style={{borderRadius:'6px',overflow:'hidden',marginTop:'15%',left:'45%',position:'absolute',height:'200px',width:'350px'}} show={this.state.show} onHide={handleClose} animation={false}>
                    <Modal.Header style={{width:'350px'}} closeButton>
                      <Modal.Title style={{color:'#274F77'}}>Elimina studente</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body style={{width:'350px'}}>Confermare l'eliminazione?</Modal.Body>
                      <Modal.Footer style={{width:'350px'}}>
                        <Button className='buttonHover button' variant="secondary" onClick={handleClose}>Annulla</Button>
                            <Button className='buttonHover button' variant="primary" onClick={deleteStudent}>Elimina</Button>
                    </Modal.Footer>
                  </Modal>
                  
              </Grid>
            </div>
          );
        }

      }
export default StudentList;