import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, notification, Icon } from 'antd';
import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import { Panes } from 'modules/common/components';

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
    const { productsInfo, isSentPrequalificationInfo, prequalifiedStatus } =
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
        {this.renderPane({
          key: 1,
          title: 'Financial information',
          name: 'financialInfo',
          Component: FinancialForm,
          data: { disabled, prequalifiedStatus }
        })}

        {this.renderPane({
          key: 2,
          title: 'Business integrity & human resource',
          name: 'businessInfo',
          Component: BusinessForm,
          data: { disabled, prequalifiedStatus }
        })}

        {this.renderPane({
          key: 3,
          title: 'Environmental management',
          name: 'environmentalInfo',
          Component: EnvironmentalForm,
          data: { disabled, prequalifiedStatus }
        })}

        {this.renderPane({
          key: 4,
          title: 'Health & safety management system',
          name: 'healthInfo',
          Component: HealthForm,
          data: {
            productsInfo: productsInfo,
            send: send,
            disabled,
            prequalifiedStatus
          }
        })}
      </Tabs>
    );
  }
}

PrequalificationForms.contextTypes = {
  __: PropTypes.func
};

export default PrequalificationForms;
