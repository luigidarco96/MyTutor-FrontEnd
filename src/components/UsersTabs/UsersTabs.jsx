import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Tabs, Tab } from "react-bootstrap";

import TypedNotices from "../TypedNotices/TypedNotices";
import {
  StateNoticeDictionary,
  StateAssignmentDictionary
} from "../../static/dicts";
import TypedAssignments from "../TypedAssignments/TypedAssignments";

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
      selectedTab: "",
      tabs: [],
      filteredNotices: [],
      filteredAssignments: []
    };
  }
  handleTabSelect(e) {
    const { notices, assignments } = this.props;

    if (window.location.pathname.split("/")[2] === "notices") {
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
    } else if (window.location.pathname.split("/")[2] === "assignments") {
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
    const { tabs, notices, assignments } = this.props;
    if (window.location.pathname.split("/")[2] === "notices") {
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
    } else if (window.location.pathname.split("/")[2] === "assignments") {
      console.log("CIAOOOOOOOOOOOOOOOOOOOOOO");

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
    if (window.location.pathname.split("/")[2] === "notices") {
      return (
        <Tabs
          id="users-tabs"
          defaultActiveKey={selectedTab}
          onSelect={e => this.handleTabSelect(e)}
          animation={false}
        >
          {tabs.map((tab, index) => {
            if (tab === "Bozza") {
              return (
                <Tab eventKey={tab} title={tab} key={index}>
                  <Link className="link" to="draftNotice">
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
    } else if (window.location.pathname.split("/")[2] === "assignments") {
      console.log(filteredAssignments);
      console.log("PEPPPEEEEEEEEEEEEEEEEEE");
      return (
        <Tabs
          id="users-tabs"
          defaultActiveKey={selectedTab}
          onSelect={e => this.handleTabSelect(e)}
          animation={false}
        >
          {tabs.map((tab, index) => {
            return (
              <Tab eventKey={tab} title={tab} key={index}>
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
