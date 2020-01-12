import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Tab, Glyphicon } from 'react-bootstrap';

import TypedNotices from '../TypedNotices/TypedNotices';
import {
  StateNoticeDictionary,
  StateAssignmentDictionary
} from '../../static/dicts';
import TypedAssignments from '../TypedAssignments/TypedAssignments';
import '../../assets/css/tabs.css';

/**
 * DefaultTabs.jsx
 * This component represent the student and guest notices view.
 *
 * @author Federico Allegretti
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 *
 */

export default class DefaultTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      tabs: [],
      filteredNotices: [],
      filteredAssignments: []
    };
  }
  handleTabSelect(e) {
    const { notices } = this.props;

    if (
      window.location.pathname.split('/')[2] === 'notices' ||
      window.location.pathname === '/home'
    ) {
      let filteredNotices = [];
      if (Boolean(notices)) {
        filteredNotices = this.props.notices.filter(notice => {
          return StateNoticeDictionary[notice.state] === e;
        });
      }

      this.setState({
        selectedTab: e,
        filteredNotices: filteredNotices
      });
    } else if (window.location.pathname.split('/')[2] === 'assignments') {
      let filteredAssignments = [];
      filteredAssignments = this.props.assignments.filter(assignment => {
        return StateAssignmentDictionary[assignment.state] === e;
      });
     

      this.setState({
        selectedTab: e,
        filteredAssignments: filteredAssignments
      });
    }
  }

  componentWillMount() {
    const { tabs, notices} = this.props;
    if (
      window.location.pathname.split('/')[2] === 'notices' ||
      window.location.pathname === '/home'
    ) {
      let filteredNotices = [];

      if (Boolean(notices)) {
        filteredNotices = this.props.notices.filter(notice => {
          return StateNoticeDictionary[notice.state] === tabs[0];
        });
      }

      this.setState({
        selectedTab: tabs[0],
        tabs: tabs,
        filteredNotices: filteredNotices
      });
    } else if (window.location.pathname.split('/')[2] === 'assignments') {
      let filteredAssignments = [];
      filteredAssignments = this.props.assignments.filter(assignment => {
        return StateAssignmentDictionary[assignment.state] === tabs[0];
      });

      this.setState({
        selectedTab: tabs[0],
        tabs: tabs,
        filteredAssignments: filteredAssignments
      });
    }
  }

  render() {
    const {
      selectedTab,
      filteredNotices,
      filteredAssignments,
      tabs
    } = this.state;

    const { pathname } = this.props;
    if (
      window.location.pathname.split('/')[2] === 'notices' ||
      window.location.pathname === '/home'
    ) {
      return (
        <Tabs
          id='users-tabs'
          defaultActiveKey={selectedTab}
          onSelect={e => this.handleTabSelect(e)}
          animation={false}
        >
          {tabs.map((tab, index) => {
            if (tab === 'Bozza') {
              return (
                <Tab eventKey={tab} title={tab} key={index} name={tab}>
                  <div className='link'>
                    <Link to='draftNotice'>
                      <Glyphicon glyph='plus' />
                      Crea bando
                    </Link>
                  </div>
                  <TypedNotices
                    pathname={pathname}
                    notices={filteredNotices}
                    type={selectedTab}
                  />
                </Tab>
              );
            }
            return (
              <Tab eventKey={tab} title={tab} key={index} name={tab}>
                <TypedNotices
                  pathname={pathname}
                  notices={filteredNotices}
                  type={selectedTab}
                />
              </Tab>
            );
          })}
        </Tabs>
      );
    } else if (window.location.pathname.split('/')[2] === 'assignments') {
      return (
        <Tabs
          id='users-tabs'
          defaultActiveKey={selectedTab}
          onSelect={e => this.handleTabSelect(e)}
          animation={false}
        >
          {tabs.map((tab, index) => {
            return (
              <Tab eventKey={tab} title={tab} key={index} name={tab}>
                <TypedAssignments
                  pathname={pathname}
                  assignments={filteredAssignments}
                  type={selectedTab}
                />
              </Tab>
            );
          })}
        </Tabs>
      );
    }
  }
}
