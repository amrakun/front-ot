import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';

export default class Panes extends React.Component {
  isEmpty(data) {
    try {
      return Object.keys(data).length === 0 && data.constructor === Object;
    } catch (e) {
      return false;
    }
  }

  renderPane(key, title, name, Component) {
    const { company, save } = this.props;

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
        <Component data={company[name] || {}} save={saveAction} />
      </Tabs.TabPane>
    );
  }
}

Panes.propTypes = {
  company: PropTypes.object,
  save: PropTypes.func.isRequired
};
