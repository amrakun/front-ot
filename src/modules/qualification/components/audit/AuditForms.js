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
          'supplierProfile',
          SupplierProfile
        )}
        {this.renderPane('2', 'Core HSEQ', 'coreHSEQ', CoreHSEQ)}
        {this.renderPane(
          '3',
          'Human resource management',
          'humanResourceManagement',
          HumanResourceManagement
        )}
        {this.renderPane(
          '4',
          'Business integrity',
          'businessIntegriy',
          BusinessIntegriy
        )}
      </Tabs>
    );
  }
}

export default AuditForms;
