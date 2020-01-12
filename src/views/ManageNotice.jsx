import React, { Component } from 'react';
import { Tabs, Tab} from 'react-bootstrap';
import CreateNotice from '../components/NoticeComponents/CreateNotice'
import CreateApplication from '../components/NoticeComponents/CreateApplication'
import Card from 'components/Card/Card.jsx';
import axios from 'axios';

export default class draftNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'bando',
            applicationSheet: {}
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        const {
            match: { params }
        } = this.props;

        //check if the id params of the applicationSheet is passed
        if (params.id) {
            if (user != null &&
                (user.role === 'Teaching Office')) {
                //fetch applicationSheet information
                axios
                .get(`http://localhost:3001/api/notices/${params.id}`, {
                    headers: {
                      Authorization: token
                    }
                  })
                  .then(response => {
                        if (response.status === '200') {
                            this.setState({applicationSheet : response.data.notices[0].application_sheet});
                        }
                    }).catch(err => {
                      
                    })
            }
        }
    }

    handleTabSelect(e) {

        this.setState({
            selectedTab: e
        });
    }

    render() {
        const { selectedTab, applicationSheet } = this.state;
        return (
            <div className='content' style={{height:'30vw', overflowY:'scroll'}}>
                <Card
                    title={selectedTab === 'bando' ? 'Modifica Bando' : 'Modifica Domanda'}
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                        <div className='container-fluid'> 
                            <Tabs
                                id='users-tabs'
                                defaultActiveKey={selectedTab}
                                onSelect={e => this.handleTabSelect(e)}
                                animation={false}>
                                <Tab eventKey={'bando'} title={'Bando'} key={1}>
                                    <CreateNotice {...this.props}></CreateNotice>
                                </Tab>
                                <Tab eventKey={'domanda'} title={'Domanda'} key={2}>
                                    <CreateApplication {...this.props} applicationSheet = {applicationSheet}></CreateApplication>
                                </Tab>
                            </Tabs>
                        </div>
                    }
                />
            </div>
        )
    }
}