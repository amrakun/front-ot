import React from 'react';
import { Tabs, notification, Icon } from 'antd';
import FinancialForm from './forms/Financial';
import EnvironmentalForm from './forms/Environmental';
import BusinessForm from './forms/Business';
import HealthForm from './forms/Health';
import Panes from '../Panes';

class PrequalificationForms extends Panes {
  componentDidMount() {
    if (this.props.company.isSentPrequalificationInfo) {
      notification.open({
        message: 'Changes disabled',
        description:
          'You have already submitted your pre-qualification form and changes are disabled.',
        icon: <Icon type="warning" style={{ color: '#f47721' }} />,
        duration: 10
      });
    }
  }

  render() {
    const { currentTabKey } = this.state;
    const { productsInfo } = this.props.company || {};
    const { send } = this.props;

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
          FinancialForm
        )}
        {this.renderPane(
          '2',
          'Business integrity & human resource',
          'businessInfo',
          BusinessForm
        )}
        {this.renderPane(
          '3',
          'Environmental management',
          'environmentalInfo',
          EnvironmentalForm
        )}
        {this.renderPane(
          '4',
          'Health & safety management system',
          'healthInfo',
          HealthForm,
          { productsInfo: productsInfo, send: send }
        )}
      </Tabs>
    );
  }
}

export default PrequalificationForms;
