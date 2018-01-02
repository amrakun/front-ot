import React from 'react';
import { withRouter } from 'react-router';
import CompanyInfoForm from './forms/CompanyInfo';
import ContactForm from './forms/Contact';
import ManagementForm from './forms/ManagementTeam';
import ShareholderForm from './forms/Shareholder';
import ProductsForm from './forms/Products';
import GroupForm from './forms/Group';
import Panes from '../Panes';
import { Tabs, Col } from 'antd';

class RegistrationForms extends Panes {
  render() {
    const { currentTabKey } = this.state;

    return (
      <Col md={24} lg={20} xl={{ span: 14, offset: 1 }}>
        <Tabs
          activeKey={currentTabKey}
          onTabClick={this.moveToTab}
          tabPosition="left"
          className="supplier-forms"
        >
          {this.renderPane('1', 'Company info', 'basicInfo', CompanyInfoForm)}
          {this.renderPane('2', 'Contact details', 'contactInfo', ContactForm)}
          {this.renderPane(
            '3',
            'Management Team',
            'managementTeamInfo',
            ManagementForm
          )}
          {this.renderPane(
            '4',
            'Company shareholder information',
            'shareholderInfo',
            ShareholderForm
          )}
          {this.renderPane('5', 'Group information', 'groupInfo', GroupForm)}
          {this.renderPane(
            '6',
            'Products & services',
            'productsInfo',
            ProductsForm
          )}
        </Tabs>
      </Col>
    );
  }
}

export default withRouter(RegistrationForms);
