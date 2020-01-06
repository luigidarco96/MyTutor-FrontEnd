import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import CreateNotice from '../components/NoticeComponents/CreateNotice'
import CreateApplication from '../components/NoticeComponents/CreateApplication'
import Card from 'components/Card/Card.jsx';

export default class draftNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'bando'
        };
    }

    handleTabSelect(e) {

        this.setState({
            selectedTab: e
        });
    }

    render() {
        const { selectedTab } = this.state;
        return (
            <div className='content' style={{height:'30vw', overflowY:'scroll'}}>
                <Card
                    title={selectedTab == 'bando' ? 'Crea Bando' : 'Crea Domanda'}
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                        <div className='container-fluid'> 
                            <Tabs
                                id='users-tabs'
                                defaultActiveKey={selectedTab}
                                onSelect={e => this.handleTabSelect(e)}
                                animation={false}>
                                <Tab eventKey={'bando'} title={'bando'} key={1}>
                                    <CreateNotice {...this.props}></CreateNotice>
                                </Tab>
                                <Tab eventKey={'domanda'} title={'domanda'} key={2}>
                                    <CreateApplication></CreateApplication>
                                </Tab>
                            </Tabs>
                        </div>
                    }
                />
            </div>
        )
    }
}