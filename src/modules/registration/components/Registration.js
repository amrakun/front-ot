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
  company: PropTypes.object.isRequired
};
const TabPane = Tabs.TabPane;

function isEmpty(data) {
  try {
    return Object.keys(data).length === 0 && data.constructor === Object;
  } catch (e) {
    return false;
  }
}

function RegistrationForms({ company }) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              Company info{' '}
              {isEmpty(company.basicInfo) ? '' : <Icon type="check" />}
            </span>
          }
          key="1"
        >
          <CompanyInfoForm data={company.basicInfo} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Contact details {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="2"
        >
          <ContactForm data={{}} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Management Team {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="3"
        >
          <ManagementForm data={{}} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Company shareholder information{' '}
              {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="4"
        >
          <ShareholderForm data={{}} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Group information {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="5"
        >
          <GroupForm data={{}} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Products & services {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="6"
        >
          <ProductsForm data={{}} />
        </TabPane>
        <TabPane
          tab={
            <span>
              Capacity building certificate{' '}
              {isEmpty({}) ? '' : <Icon type="check" />}
            </span>
          }
          key="7"
        >
          <CertificateForm data={{}} />
        </TabPane>
      </Tabs>
    </div>
  );
}

RegistrationForms.propTypes = propTypes;

export default withRouter(RegistrationForms);
