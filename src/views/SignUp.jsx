import React, {Component} from 'react';
import {
    Col,
    TabContent,
    TabContainer,
    Row,
    Nav,
    NavItem,
    TabPane
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { SignUpStudent } from '../components/SignUp/SignUpStudent';
import '../../src/assets/css/Tabs.css'

export class SignUp extends Component{

    render() {
        return(
            <TabContainer 
                id='registrationTabs' 
                defaultActiveKey="student"
                style={{'margin':'2rem'}}>
                <Row>
                    <Col>
                        <Nav variant='tabs'>
                            <NavItem className='tabItem'>
                                <NavLink
                                    className='tabLink'
                                    eventKey="student" 
                                    to='student'>
                                    Studente</NavLink>
                            </NavItem>
                            <NavItem className='tabItem'>
                                <NavLink
                                    className='tabLink'
                                    eventKey="professor"
                                    to='professor'>
                                    Docente</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent className='tabContent'>
                            <TabPane eventKey='student' id='student' className='tabPane'>
                                <SignUpStudent/>
                            </TabPane>
                            <TabPane eventKey='professor' id ='professor' className='tabPane'>
                                <SignUpStudent/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </TabContainer>
        )}
}

export default SignUp;