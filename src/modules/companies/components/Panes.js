import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';

export default class Panes extends React.Component {
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
  save: PropTypes.func
};
