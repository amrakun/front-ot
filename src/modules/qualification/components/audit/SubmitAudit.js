import React from 'react';
import { Tabs } from 'antd';
import SupplierProfile from './forms/SupplierProfile';
import CoreHSEQ from './forms/CoreHSEQ';
import HumanResourceManagement from './forms/HumanResourceManagement';
import BusinessIntegriy from './forms/BusinessIntegriy';
import { HelpModal, Panes } from 'modules/common/components';

class AuditForms extends Panes {
  render() {
    const { currentTabKey } = this.state;
    const { supplierInfo, company } = this.props;
    const { qualifiedStatus, isEditable } = company;

    const commonProps = {
      qualifiedStatus,
      isSubmitDisabled: !isEditable,
    };

    return (
      <div>
        <HelpModal videoId="audit" />

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
            data: { supplierInfo, ...commonProps },
          })}

          {this.renderPane({
            key: 2,
            title: 'Core HSEQ',
            name: 'coreHseqInfo',
            Component: CoreHSEQ,
            data: commonProps,
          })}

          {this.renderPane({
            key: 3,
            title: 'Human resource management',
            name: 'hrInfo',
            Component: HumanResourceManagement,
            data: commonProps,
          })}

          {this.renderPane({
            key: 4,
            title: 'Business integrity',
            name: 'businessInfo',
            Component: BusinessIntegriy,
            data: commonProps,
          })}
        </Tabs>
      </div>
    );
  }
}

export default AuditForms;
