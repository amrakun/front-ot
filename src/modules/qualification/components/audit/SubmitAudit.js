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
    const { supplierInfo, saveEvidenceChecks } = this.props;

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
          { supplierInfo }
        )}
        {this.renderPane('2', 'Core HSEQ', 'coreHseqInfo', CoreHSEQ)}
        {this.renderPane(
          '3',
          'Human resource management',
          'hrInfo',
          HumanResourceManagement
        )}
        {this.renderPane(
          '4',
          'Business integrity',
          'businessInfo',
          BusinessIntegriy,
          { saveEvidenceChecks }
        )}
      </Tabs>
    );
  }
}

export default AuditForms;
