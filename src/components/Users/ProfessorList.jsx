import React,{Component} from 'react';
import {Grid, Row, Table, Col} from 'react-bootstrap';
import { students } from "static/students";
import { professors } from '../../static/professors';
import Button from '../CustomButton/CustomButton';
import PopupDelete from '../Popups/PopupDelete'
import PopupInsertEmail from '../Popups/PopupInsertEmail'

export class ProfessorList extends Component{
    state={
        header:[],
        content:[],
        isLoading: true,
        showPopupDelete: false,
        showPopupInsertEmail: false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        
        this.setState({
            header:['E-mail','Nome','Cognome','Matricola','Data di Nascita']
        });
    }
    render(){
      const togglePopupDelete=()=>{
        this.setState({
          showPopupDelete: !this.state.showPopupDelete
        });
      }          
      const togglePopupInsertEmail=()=>{
        this.setState({
          showPopupInsertEmail: !this.state.showPopupInsertEmail
        });
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
                    <Button style={{border:'1px solid #274F77'}} className='buttonHover' onClick={()=>{togglePopupInsertEmail();}} bsStyle="primary"  bsSize="xs">Inserisci professore</Button>
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
                            {students &&
                              professors.map(element => {
                                return (
                                  <tr
                                    key={element.serialNumber}
                               
                                  >
                                    <td>{element.email}</td>
                                    <td>{element.name}</td>
                                    <td>{element.surname}</td>                                    
                                    <td>{element.serialNumber}</td>
                                    <td>{element.birthDate}</td>
                                    <td onClick={()=>{togglePopupDelete();}}><i className="pe-7s-trash trashIcon" style={styleIconTrash}></i></td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                  </Col>
                </Row>
                {
                    this.state.showPopupDelete ?
                      <PopupDelete
                        text="Confermare l'eliminazione?"
                        closePopup={()=>{togglePopupDelete();}}
                      />
                      :null
                  }
                  {
                    this.state.showPopupInsertEmail ?
                      <PopupInsertEmail
                        text="Inserire e-mail professore"
                        closePopup={()=>{togglePopupInsertEmail();}}
                      />
                      :null
                  }
                    
              </Grid>
            </div>
          );
        }

      }
export default ProfessorList;