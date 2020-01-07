import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'react-bootstrap';

import TypedNotices from '../TypedNotices/TypedNotices';
import { StateNoticeDictionary } from '../../static/dicts';

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
    const { notices } = this.props;

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
  }

  componentWillMount() {
    const { tabs, notices } = this.props;
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
        {tabs.map((tab, index) => {
          if (tab === 'Bozza') {
            return (
              <Tab eventKey={tab} title={tab} key={index}>
                <Link className='link' to='draftNotice'>
                  Crea bando
                </Link>
                <TypedNotices
                  pathname={pathname}
                  notices={filteredNotices}
                  type={selectedTab}
                />
              </Tab>
            );
          }
          return (
            <Tab eventKey={tab} title={tab} key={index}>
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
  }
}
