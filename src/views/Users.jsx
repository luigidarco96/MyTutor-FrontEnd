
import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { StudentList } from '../components/Users/StudentList';
import Card from "components/Card/Card.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProfessorList from '../components/Users/ProfessorList';
import '../assets/css/nav-tabs.css'



const Users = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    
    const toggle = tab => {
        
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
   }
   
  
    return (
        <div onLoad={()=>{toggle('1');}}> 
            <div> 
                <Row style={{
                    width: '100%',
                    overflowY: 'hidden'
                }}>
                    <Col md="2"></Col>
                    <div style={{width: '-webkit-fill-available',marginLeft:'30px', marginTop:'30px'}}>
                        <Card
                            title='Lista utenti'
                            content={
                                <div> 
                                    <Nav tabs>
                                        <NavItem id='1'>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggle('1'); }}
                                            
                                            >
                                                Studenti
                                            </NavLink>
                                        </NavItem>
                                        <NavItem id='2'>
                                            <NavLink
                                            
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggle('2'); }}
                                            >
                                                Professori
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <StudentList />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <ProfessorList />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            }
                        />
                    </div>
                </Row>
            </div>
        </div>
        
    )
    
}

export default Users;