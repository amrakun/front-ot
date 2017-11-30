import React from 'react';
import { withRouter } from 'react-router';
import CompanyInfoForm from './forms/CompanyInfo';
import ContactForm from './forms/Contact';
import ManagementForm from './forms/ManagementTeam';
import ShareholderForm from './forms/Shareholder';
import CertificateForm from './forms/Certificate';
import ProductsForm from './forms/Products';
import GroupForm from './forms/Group';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';

const propTypes = {
  companyData: PropTypes.object,
  contactData: PropTypes.object,
  managementData: PropTypes.object,
  shareholderData: PropTypes.object,
  groupData: PropTypes.object,
  productData: PropTypes.object,
  certificateData: PropTypes.object
};
const TabPane = Tabs.TabPane;

function isEmpty(data) {
  return Object.keys(data).length === 0 && data.constructor === Object;
}

function RegistrationForms({
  companyData,
  contactData,
  managementData,
  shareholderData,
  groupData,
  productData,
  certificateData
}) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              Company info {isEmpty(companyData) ? '' : <Icon type="check" />}
            </span>
          }
          key="1"
        >
          <CompanyInfoForm data={companyData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Contact details{' '}
              {isEmpty(contactData) ? '' : <Icon type="check" />}
            </span>
          }
          key="2"
        >
          <ContactForm data={contactData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Management Team{' '}
              {isEmpty(managementData) ? '' : <Icon type="check" />}
            </span>
          }
          key="3"
        >
          <ManagementForm data={managementData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Company shareholder information{' '}
              {isEmpty(shareholderData) ? '' : <Icon type="check" />}
            </span>
          }
          key="4"
        >
          <ShareholderForm data={shareholderData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Group information{' '}
              {isEmpty(groupData) ? '' : <Icon type="check" />}
            </span>
          }
          key="5"
        >
          <GroupForm data={groupData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Products & services{' '}
              {isEmpty(productData) ? '' : <Icon type="check" />}
            </span>
          }
          key="6"
        >
          <ProductsForm data={productData} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Capacity building certificate{' '}
              {isEmpty(certificateData) ? '' : <Icon type="check" />}
            </span>
          }
          key="7"
        >
          <CertificateForm data={certificateData} />
        </TabPane>
      </Tabs>
    </div>
  );
}

RegistrationForms.propTypes = propTypes;

export default withRouter(RegistrationForms);
