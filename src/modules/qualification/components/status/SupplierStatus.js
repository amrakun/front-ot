import React from 'react';
import { Tabs } from 'antd';
import StatusTab from './StatusTab';
import TierTypeTab from './TierTypeTab';
import { Panes } from 'modules/common/components';

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
        {this.renderPane({
          key: 1,
          title: 'Financial information',
          name: 'financialInfo',
          Component: StatusTab,
          data: extraProps('financialInfo')
        })}

        {this.renderPane({
          key: 2,
          title: 'Business integrity & human resource',
          name: 'businessInfo',
          Component: StatusTab,
          data: extraProps('businessInfo')
        })}

        {this.renderPane({
          key: 3,
          title: 'Environmental management',
          name: 'environmentalInfo',
          Component: StatusTab,
          data: extraProps('environmentalInfo')
        })}

        {this.renderPane({
          key: 4,
          title: 'Health & safety management system',
          name: 'healthInfo',
          Component: StatusTab,
          data: extraProps('healthInfo')
        })}

        {this.renderPane({
          key: 5,
          title: 'Select supplier tier type',
          name: 'tierType',
          Component: TierTypeTab,
          data: extraProps('tierType')
        })}
      </Tabs>
    );
  }
}

export default Status;
