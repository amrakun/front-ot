import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, notification, Icon } from 'antd';
import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import Panes from '../Panes';

class PrequalificationForms extends Panes {
  componentDidMount() {
    const { __ } = this.context;
    if (this.props.company.isSentPrequalificationInfo) {
      notification.open({
        message: __('Changes disabled'),
        description: __(
          'You have already submitted your pre-qualification form and changes are disabled.'
        ),
        icon: <Icon type="warning" style={{ color: '#f47721' }} />,
        duration: 10
      });
    }
  }

  render() {
    const { currentTabKey } = this.state;
    const { productsInfo, isSentPrequalificationInfo } =
      this.props.company || {};
    const { send } = this.props;
    const disabled = isSentPrequalificationInfo;

    return (
      <Tabs
        activeKey={currentTabKey}
        onTabClick={this.moveToTab}
        tabPosition="left"
        className="supplier-forms"
      >
        {this.renderPane(
          '1',
          'Financial information',
          'financialInfo',
          FinancialForm,
          { disabled }
        )}
        {this.renderPane(
          '2',
          'Business integrity & human resource',
          'businessInfo',
          BusinessForm,
          { disabled }
        )}
        {this.renderPane(
          '3',
          'Environmental management',
          'environmentalInfo',
          EnvironmentalForm,
          { disabled }
        )}
        {this.renderPane(
          '4',
          'Health & safety management system',
          'healthInfo',
          HealthForm,
          { productsInfo: productsInfo, send: send, disabled }
        )}
      </Tabs>
    );
  }
}

PrequalificationForms.contextTypes = {
  __: PropTypes.func
};

export default PrequalificationForms;
