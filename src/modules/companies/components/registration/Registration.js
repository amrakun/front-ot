import React from 'react';
import { withRouter } from 'react-router';
import CompanyInfoForm from './forms/CompanyInfo';
import ContactForm from './forms/Contact';
import ManagementForm from './forms/ManagementTeam';
import ShareholderForm from './forms/Shareholder';
import ProductsForm from './forms/Products';
import GroupForm from './forms/Group';
import { Tabs } from 'antd';
import { HelpModal } from 'modules/common/components';
import { Panes } from 'modules/common/components';

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
          {this.renderPane({
            key: 1,
            title: 'Company information',
            name: 'basicInfo',
            Component: CompanyInfoForm,
            data: { isSentRegistrationInfo, exportForm }
          })}
          {this.renderPane({
            key: 2,
            title: 'Contact details',
            name: 'contactInfo',
            Component: ContactForm,
            data: { basicInfo: basicInfo }
          })}

          {!soleTrader &&
            this.renderPane({
              key: 3,
              title: 'Management Team',
              name: 'managementTeamInfo',
              Component: ManagementForm
            })}

          {!soleTrader &&
            this.renderPane({
              key: 4,
              title: 'Company shareholder information',
              name: 'shareholderInfo',
              Component: ShareholderForm
            })}

          {!soleTrader &&
            this.renderPane({
              key: 5,
              title: 'Group information',
              name: 'groupInfo',
              Component: GroupForm
            })}

          {this.renderPane({
            key: soleTrader ? 3 : 6,
            title: 'Products & services',
            name: 'productsInfo',
            Component: ProductsForm,
            data: { send }
          })}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(RegistrationForms);
