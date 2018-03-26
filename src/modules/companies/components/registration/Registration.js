import React from 'react';
import { withRouter } from 'react-router';
import CompanyInfoForm from './forms/CompanyInfo';
import ContactForm from './forms/Contact';
import ManagementForm from './forms/ManagementTeam';
import ShareholderForm from './forms/Shareholder';
import ProductsForm from './forms/Products';
import GroupForm from './forms/Group';
import Panes from '../Panes';
import { Tabs } from 'antd';
import { HelpModal } from 'modules/common/components';

class RegistrationForms extends Panes {
  render() {
    const { currentTabKey } = this.state;
    const { location, send, exportForm } = this.props;
    const viewMode = location.pathname.includes('view-registration');
    const company = this.props.company || {};
    const basicInfo = company.basicInfo || {};
    const soleTrader = basicInfo.corporateStructure === 'Sole Trader';

    const { isSentRegistrationInfo } = company;

    return (
      <div>
        <HelpModal videoId="registration" />
        {viewMode && <h2 className="registration-title">{basicInfo.enName}</h2>}
        <Tabs
          activeKey={currentTabKey}
          onTabClick={this.moveToTab}
          tabPosition="left"
          className={`supplier-forms ${viewMode && 'disabled-inputs'}`}
        >
          {this.renderPane(
            '1',
            'Company information',
            'basicInfo',
            CompanyInfoForm,
            { isSentRegistrationInfo, exportForm }
          )}
          {this.renderPane('2', 'Contact details', 'contactInfo', ContactForm, {
            basicInfo: basicInfo
          })}

          {!soleTrader &&
            this.renderPane(
              '3',
              'Management Team',
              'managementTeamInfo',
              ManagementForm
            )}

          {!soleTrader &&
            this.renderPane(
              '4',
              'Company shareholder information',
              'shareholderInfo',
              ShareholderForm
            )}

          {!soleTrader &&
            this.renderPane('5', 'Group information', 'groupInfo', GroupForm)}

          {this.renderPane(
            soleTrader ? '3' : '6',
            'Products & services',
            'productsInfo',
            ProductsForm,
            { send }
          )}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(RegistrationForms);
