import React, { Component, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { SignUpStudent } from '../components/SignUp/SignUpStudent';
import { SignUpProfessor } from '../components/SignUp/SignUpProfessor';
import Card from "components/Card/Card.jsx";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

export class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
        }
    }

    render() {
        const { activeTab } = this.state;


        const setActiveTab = tab => {
            this.setState({
                activeTab: tab
            });
        }

        return (
            <div style={{
                position: 'absolute',
                width: '98vw',
                padding: '3vw 0',
                margin: '0'
            }}>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <Card
                            title='Registrati alla piattaforma'
                            content={
                                <div>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                onClick={() => { setActiveTab('1'); }}
                                            >
                                                Studente
                                    </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                onClick={() => { setActiveTab('2'); }}
                                            >
                                                Docente
                                    </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent id='tabContent' activeTab={activeTab}>
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
        )
    }
}

export default SignUp;