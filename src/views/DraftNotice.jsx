import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CreateNotice from './CreateNotice'

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
        const {selectedTab} = this.state;
        return (
        <Tabs
            id='users-tabs'
            defaultActiveKey={selectedTab}
            onSelect={e => this.handleTabSelect(e)}
            animation={false}>
            <Tab eventKey={'bando'} title={'bando'} key={1}>
                <CreateNotice {...this.props}></CreateNotice>
            </Tab>
        </Tabs>
            
        )
    }
}