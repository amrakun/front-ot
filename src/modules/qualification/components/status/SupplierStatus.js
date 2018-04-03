import React from 'react';
import { Tabs } from 'antd';
import StatusTab from './StatusTab';
import TierTypeTab from './TierTypeTab';
import { Panes } from 'modules/companies/components';

class Status extends Panes {
  render() {
    const { currentTabKey } = this.state;
    const supplierInputs = this.props.supplierInputs || {};
    const prequalifiedStatus = supplierInputs.prequalifiedStatus || {};
    const saveTierType = this.props.saveTierType || {};
    const prequalifySupplier = this.props.prequalifySupplier || {};
    const enableSupplierForm = this.props.enableSupplierForm || {};

    const extraProps = name => ({
      statusData: {
        ...supplierInputs.basicInfo,
        isPrequalified: supplierInputs.isPrequalified,
        isSentPrequalificationInfo: supplierInputs.isSentPrequalificationInfo,
        supplierInputs: supplierInputs[name] || {},
        tabQualified: prequalifiedStatus[name]
      },
      prequalifySupplier: prequalifySupplier,
      enableSupplierForm: enableSupplierForm,
      saveTierType: saveTierType
    });

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
          StatusTab,
          extraProps('financialInfo')
        )}
        {this.renderPane(
          '2',
          'Business integrity & human resource',
          'businessInfo',
          StatusTab,
          extraProps('businessInfo')
        )}
        {this.renderPane(
          '3',
          'Environmental management',
          'environmentalInfo',
          StatusTab,
          extraProps('environmentalInfo')
        )}
        {this.renderPane(
          '4',
          'Health & safety management system',
          'healthInfo',
          StatusTab,
          extraProps('healthInfo')
        )}
        {this.renderPane(
          '5',
          'Select supplier tier type',
          'tierType',
          TierTypeTab,
          extraProps('tierType')
        )}
      </Tabs>
    );
  }
}

export default Status;
