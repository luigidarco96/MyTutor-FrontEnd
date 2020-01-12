import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import DetailNotice from './DetailsNotice'
import Rating from './Rating'
import Card from 'components/Card/Card.jsx';
import axios from 'axios';

export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            selectedTab: 'bando',
            isProfessor: false,
            isClosed: false
        };
    }

    handleTabSelect(e) {

        this.setState({
            selectedTab: e
        });
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        var user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token')

        if (
            user != null &&
            (user.role === 'Professor')
        ) {
            this.setState({ isProfessor: true })

            axios(`http://localhost:3001/api/notices/${params.id}`, {
                headers: {
                    Authorization: token
                },
                method: 'GET'
            }).then(res => {
                let closed = res.data.notices[0].state == 'Expired' ? true:false
                this.setState({
                    isClosed: closed
                })
            })
        }
    }

    render() {
        const { selectedTab, noticeJSON, isClosed, isProfessor } = this.state;
        if (isProfessor && isClosed) {
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
                                    <Tab eventKey={'bando'} title={'Bando'} key={1}>
                                        <DetailNotice {...this.props}></DetailNotice>
                                    </Tab>
                                    <Tab eventKey={'Tabella valutazioni'} title={'Tabella valutazioni'} key={2}>
                                        <Rating {...this.props}></Rating>
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