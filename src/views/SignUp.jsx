import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { SignUpStudent } from '../components/SignUp/SignUpStudent';
import { SignUpProfessor } from '../components/SignUp/SignUpProfessor';
import Card from "components/Card/Card.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import bg from '../assets/img/background-image2.jpg'
import GuestNavbar from '../components/Navbars/GuestNavbar';

const SignUp = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
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

    const setBackground = ()=>{
        document.body.style.backgroundImage = 'url('+bg+')'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
    }

    return (
        <div onLoad={() => { toggle('1'); setBackground();}}>
            <GuestNavbar />
            <div style={{
                position: 'absolute',
                width: '98vw',
                margin:'auto'
            }}>
                <Row style={{
                    width: '100%',
                    overflowY: 'hidden',
                    marginLeft:'1px'
                }}>
                    <Col md="2" lg='2' sm='1'></Col>
                    <Col md="8" lg='8' sm='10'>
                        <Card
                            title='Registrati'
                            content={
                                <div>
                                    <Nav tabs>
                                        <NavItem id='1'>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' }), 'tabLink'}
                                                onClick={() => { toggle('1'); }}
                                            >
                                                Studente
                                                    </NavLink>
                                        </NavItem>
                                        <NavItem id='2'>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' }), 'tabLink'}
                                                onClick={() => { toggle('2'); }}
                                            >
                                                Docente
                                                    </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <SignUpStudent />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <SignUpProfessor />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SignUp;