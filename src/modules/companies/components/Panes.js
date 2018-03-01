import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import queryString from 'query-string';

export default class Panes extends React.Component {
  constructor(props) {
    super(props);

    const queryParams = queryString.parse(this.props.location.search);

    this.state = {
      currentTabKey: queryParams.tab || '1'
    };

    this.nextTab = this.nextTab.bind(this);
    this.previousTab = this.previousTab.bind(this);
    this.moveToTab = this.moveToTab.bind(this);
  }

  nextTab() {
    const { currentTabKey } = this.state;
    const incerementedKeyInt = parseInt(currentTabKey, 10) + 1;
    this.moveToTab(incerementedKeyInt.toString());
  }

  previousTab() {
    const { currentTabKey } = this.state;
    const decerementedKeyInt = parseInt(currentTabKey, 10) - 1;
    this.moveToTab(decerementedKeyInt.toString());
  }

  moveToTab(currentTabKey) {
    this.setState({ currentTabKey });
    window.scrollTo(0, 0);
  }

  isEmpty(data) {
    try {
      return Object.keys(data).length === 0 && data.constructor === Object;
    } catch (e) {
      return true;
    }
  }

  renderPane(key, title, name, Component, extraProps) {
    const company = this.props.company || {};
    const save = this.props.save || {};
    const { __ } = this.context;

    const saveAction = doc => {
      save(name, doc);
    };

    const componenetProps = {
      data: company[name] || {},
      save: saveAction,
      title: title,
      nextTab: this.nextTab,
      previousTab: this.previousTab,
      ...extraProps
    };

    return (
      <Tabs.TabPane
        tab={
          <span>
            {__(title)}{' '}
            {this.isEmpty(company[name]) ? '' : <Icon type="check" />}
          </span>
        }
        key={key}
      >
        <Component {...componenetProps} />
      </Tabs.TabPane>
    );
  }
}

Panes.propTypes = {
  company: PropTypes.object,
  save: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

Panes.contextTypes = {
  __: PropTypes.func
};
