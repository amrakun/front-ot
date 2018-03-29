import React from 'react';
import { Tabs } from 'antd';
import SupplierProfile from './forms/SupplierProfile';
import CoreHSEQ from './forms/CoreHSEQ';
import HumanResourceManagement from './forms/HumanResourceManagement';
import BusinessIntegriy from './forms/BusinessIntegriy';
import { Panes } from 'modules/companies/components';

class AuditForms extends Panes {
  render() {
    const { currentTabKey } = this.state;
    const { supplierInfo, saveEvidenceChecks, company } = this.props;
    const { qualifiedStatus } = company;

    return (
      <Tabs
        activeKey={currentTabKey}
        onTabClick={this.moveToTab}
        tabPosition="left"
        className="supplier-forms"
      >
        {this.renderPane(
          '1',
          'Supplier profile',
          'basicInfo',
          SupplierProfile,
          { supplierInfo, qualifiedStatus }
        )}
        {this.renderPane('2', 'Core HSEQ', 'coreHseqInfo', CoreHSEQ, {
          qualifiedStatus
        })}
        {this.renderPane(
          '3',
          'Human resource management',
          'hrInfo',
          HumanResourceManagement,
          { qualifiedStatus }
        )}
        {this.renderPane(
          '4',
          'Business integrity',
          'businessInfo',
          BusinessIntegriy,
          { saveEvidenceChecks, qualifiedStatus }
        )}
      </Tabs>
    );
  }
}

export default AuditForms;
