import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { SignUpStudent } from '../components/SignUp/SignUpStudent';
import { SignUpProfessor } from '../components/SignUp/SignUpProfessor';
import Card from "components/Card/Card.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import bg from '../assets/img/background-image2.jpg'
import GuestNavbar from '../components/Navbars/GuestNavbar';
import '../assets/css/nav-tabs.css'

const SignUp = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const setBackground = () => {
        document.body.style.backgroundImage = 'url(' + bg + ')'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
    }

    return (
        <div onLoad={() => { toggle('1'); setBackground(); }}>
            <GuestNavbar />
            <div className='container-div'>
                    <Row className='container-row'>
                        <Col md="2" lg='2' sm='1'></Col>
                        <Col md="8" lg='8' sm='10'>
                            <Card
                                className='card'
                                title={<b style={{ color: '#274F77' }}>Registrati</b>}
                                content={
                                    <div>
                                        <Nav tabs>
                                            <NavItem id='1'>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '1' })}
                                                    onClick={() => { toggle('1'); }}
                                                >
                                                    Studente
                                                    </NavLink>
                                            </NavItem>
                                            <NavItem id='2'>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '2' })}
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