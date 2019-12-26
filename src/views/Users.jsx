
import React, { useState, Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { StudentList } from '../components/Users/StudentList';
import Card from "components/Card/Card.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProfessorList from '../components/Users/ProfessorList';




const Users = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    
    const toggle = tab => {
        console.log("FUNZIONA")
        if (activeTab !== tab) {
            setActiveTab(tab);
        }

        if (tab == 1) {
            document.getElementById('1').style.backgroundColor = '#f0f0f0'
            document.getElementById('1').style.borderTopStyle = 'solid'
            document.getElementById('1').style.borderLeftStyle = 'solid'
            document.getElementById('1').style.borderRightStyle = 'solid'
            document.getElementById('1').style.borderWidth = '1px'
            document.getElementById('1').style.borderColor = '#81818175'
            document.getElementById('1').style.borderRadius = '3px'

            document.getElementById('2').style.backgroundColor = 'white'
            document.getElementById('2').style.borderTopStyle = 'none'
            document.getElementById('2').style.borderLeftStyle = 'none'
            document.getElementById('2').style.borderRightStyle = 'none'
            document.getElementById('2').style.borderWidth = '0px'
            document.getElementById('2').style.borderColor = 'white'
            document.getElementById('2').style.borderRadius = '3px'
        } else {
            document.getElementById('2').style.backgroundColor = '#f0f0f0'
            document.getElementById('2').style.borderTopStyle = 'solid'
            document.getElementById('2').style.borderLeftStyle = 'solid'
            document.getElementById('2').style.borderRightStyle = 'solid'
            document.getElementById('2').style.borderWidth = '1px'
            document.getElementById('2').style.borderColor = '#81818175'
            document.getElementById('2').style.borderRadius = '3px'

            document.getElementById('1').style.backgroundColor = 'white'
            document.getElementById('1').style.borderTopStyle = 'none'
            document.getElementById('1').style.borderLeftStyle = 'none'
            document.getElementById('1').style.borderRightStyle = 'none'
            document.getElementById('1').style.borderWidth = '0px'
            document.getElementById('1').style.borderColor = 'white'
            document.getElementById('1').style.borderRadius = '3px'
        }
   }
   
    const styileInitialTab={
        backgroundColor: '#f0f0f0',
        border: '1px solid #81818175',
        borderBottom: 'none',
        borderRadius: '3px',
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
                            title=''
                            content={
                                <div> 
                                    <Nav tabs>
                                        <NavItem id='1' style={styileInitialTab}>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' }), 'tabLink'}
                                                onClick={() => { toggle('1'); }}
                                            
                                            >
                                                Studenti
                                            </NavLink>
                                        </NavItem>
                                        <NavItem id='2'>
                                            <NavLink
                                            
                                                className={classnames({ active: activeTab === '2' }), 'tabLink'}
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