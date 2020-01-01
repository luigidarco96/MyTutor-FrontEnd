import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'react-bootstrap';

import TypedNotices from '../TypedNotices/TypedNotices';
import { StateDictionary } from '../../static/dicts';

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
      filteredNotices: []
    };
  }

  handleTabSelect(e) {
    const { notices, tabs } = this.props;

    let filteredNotices = [];

    if (Boolean(notices)) {
      filteredNotices = this.props.notices.filter(notice => {
        return StateDictionary[notice.state] === e;
      });
    }

    this.setState({
      selectedTab: e,
      filteredNotices: filteredNotices
    });
  }

  componentWillMount() {
    const { tabs, notices } = this.props;
    let filteredNotices = [];

    if (Boolean(notices)) {
      filteredNotices = this.props.notices.filter(notice => {
        return StateDictionary[notice.state] === tabs[0];
      });
    }

    this.setState({
      selectedTab: tabs[0],
      tabs: tabs,
      filteredNotices: filteredNotices
    });
  }

  render() {
    const { selectedTab, filteredNotices, tabs } = this.state;
    const { pathname } = this.props;

    return (
      <Tabs
        id='users-tabs'
        defaultActiveKey={selectedTab}
        onSelect={e => this.handleTabSelect(e)}
        animation={false}
      >
        {' '}
        {tabs.map((tab, index) => {
          return (
            <Tab eventKey={tab} title={tab} key={index}>
              <TypedNotices
                pathname={pathname}
                notices={filteredNotices}
                type={selectedTab}
              />
            </Tab>
          );
        })}{' '}
      </Tabs>
    );
  }
}
