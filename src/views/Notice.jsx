import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import DetailNotice from './DetailsNotice'
import Rating from './Rating'
import Card from 'components/Card/Card.jsx';
import Axios from 'axios';

export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            selectedTab: 'bando',
            noticeJSON: {},
            assignmentsJSON: {},
            isProfessor: false
        };
    }

    handleTabSelect(e) {

        this.setState({
            selectedTab: e
        });
    }

    componentDidMount() {
        console.info('Notice mounted')
        const {
            match: { params }
        } = this.props;

        var user = JSON.parse(localStorage.getItem('user'));
        if (user)
            if (user.role == 'Professor') {
                this.setState({ isProfessor: true })
            }

        if (
            user != null &&
            (user.role === 'Teaching Office' ||
                user.role === 'DDI' ||
                user.role === 'Professor')
        ) {
            Axios.get(`http://localhost:3001/api/notices/${params.id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(blob => {
                this.setState({
                    isLoaded: true,
                    noticeJSON: blob.data.notices[0],
                    assignmentsJSON: blob.data.notices[0].assignments
                });
            });
        } else {
            Axios.get(`http://localhost:3001/api/notices/${params.id}`).then(blob => {
                this.setState({
                    isLoaded: true,
                    noticeJSON: blob.data.notices[0],
                    assignmentsJSON: blob.data.notices[0].assignments
                });
            });
        }
    }

    render() {
        const { selectedTab, noticeJSON, assignmentsJSON, isProfessor } = this.state;
        if (isProfessor) {
            return (
                <div className='content' style={{ height: '30vw', overflowY: 'scroll' }}>
                    <Card
                        title={selectedTab == 'bando' ? 'Visualizza Bando' : 'Visualizza Tabella Valutazioni'}
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
                                        <DetailNotice {...this.props} noticeJSON={noticeJSON}></DetailNotice>
                                    </Tab>
                                    <Tab eventKey={'Tabella valutazioni'} title={'Tabella valutazioni'} key={2}>
                                        <Rating {...this.props} assignmentsJSON={assignmentsJSON}></Rating>
                                    </Tab>
                                </Tabs>
                            </div>
                        }
                    />
                </div>
            )
        } else {
            return (
                <DetailNotice {...this.props} noticeJSON={noticeJSON}></DetailNotice>
            )
        }
    }
}