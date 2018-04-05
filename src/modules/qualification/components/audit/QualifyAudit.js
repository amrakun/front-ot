import React from 'react';
import { Tabs } from 'antd';
import SupplierProfile from './forms/SupplierProfile';
import CoreHSEQ from './forms/CoreHSEQ';
import HumanResourceManagement from './forms/HumanResourceManagement';
import BusinessIntegriy from './forms/BusinessIntegriy';
import { Panes } from 'modules/common/components';

class AuditForms extends Panes {
  render() {
    const { currentTabKey } = this.state;
    const { supplierInfo, exportFiles } = this.props;
    const response = this.props.response || {};
    const common = {
      supplierInfo: supplierInfo,
      isQualified: response.isQualified
    };

    return (
      <Tabs
        activeKey={currentTabKey}
        onTabClick={this.moveToTab}
        tabPosition="left"
        className="supplier-forms"
      >
        {this.renderPane({
          key: 1,
          title: 'Supplier profile',
          name: 'basicInfo',
          Component: SupplierProfile,
          data: { response: response.basicInfo, ...common }
        })}

        {this.renderPane({
          key: 2,
          title: 'Core HSEQ',
          name: 'coreHseqInfo',
          Component: CoreHSEQ,
          data: {
            response: response.coreHseqInfo,
            ...common
          }
        })}

        {this.renderPane({
          key: 3,
          title: 'Human resource management',
          name: 'hrInfo',
          Component: HumanResourceManagement,
          data: { response: response.hrInfo, ...common }
        })}

        {this.renderPane({
          key: 4,
          title: 'Business integrity',
          name: 'businessInfo',
          Component: BusinessIntegriy,
          data: {
            response: response.businessInfo,
            exportFiles: exportFiles,
            ...common
          }
        })}
      </Tabs>
    );
  }
}

export default AuditForms;
