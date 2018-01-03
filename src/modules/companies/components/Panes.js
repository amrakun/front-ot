import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';

const preqPath = '/prequalification';

export default class Panes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTabKey: '1'
    };

    this.nextTab = this.nextTab.bind(this);
    this.moveToTab = this.moveToTab.bind(this);
  }

  nextTab() {
    const { currentTabKey } = this.state;
    const { history } = this.props;
    const pathname = history.location.pathname;

    let lastTabKey = '6';
    if (history.location.pathname === preqPath) lastTabKey = '4';

    if (lastTabKey === currentTabKey) {
      pathname === preqPath
        ? history.push('/capacity-building')
        : history.push(preqPath);
    } else {
      const incerementedKeyInt = parseInt(currentTabKey, 10) + 1;

      this.moveToTab(incerementedKeyInt.toString());

      window.scrollTo(0, 0);
    }
  }

  moveToTab(currentTabKey) {
    this.setState({ currentTabKey });
  }

  isEmpty(data) {
    try {
      return Object.keys(data).length === 0 && data.constructor === Object;
    } catch (e) {
      return true;
    }
  }

  renderPane(key, title, name, Component) {
    const company = this.props.company || {};
    const save = this.props.save || {};

    const saveAction = doc => {
      save(name, doc);
    };

    return (
      <Tabs.TabPane
        tab={
          <span>
            {title} {this.isEmpty(company[name]) ? '' : <Icon type="check" />}
          </span>
        }
        key={key}
      >
        <Component
          nextTab={this.nextTab}
          data={company[name] || {}}
          save={saveAction}
          productsInfo={name === 'healthInfo' ? company.productsInfo : {}}
        />
      </Tabs.TabPane>
    );
  }
}

Panes.propTypes = {
  company: PropTypes.object,
  save: PropTypes.func,
  history: PropTypes.object
};
