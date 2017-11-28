import React from 'react'
import {withRouter} from 'react-router'
import CompanyInfoForm from './forms/CompanyInfo'
import ContactForm from './forms/Contact'
import ManagementForm from './forms/ManagementTeam'
import ShareholderForm from './forms/Shareholder'
import CertificateForm from './forms/Certificate'
import PropTypes from 'prop-types'
import { Tabs, Icon } from 'antd';

const propTypes = {
  data: PropTypes.object.isRequired
};
const TabPane = Tabs.TabPane;

function isEmpty(data) {
  return Object.keys(data).length === 0 && data.constructor === Object;
}

function RegistrationForms({
  data
}) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab={<span>Company Info { isEmpty(data) ? '' : <Icon type="check" />}</span>} key="1">
          <CompanyInfoForm data={data} />
        </TabPane>
        <TabPane tab="Contact details" key="2">
          <ContactForm />
        </TabPane>
        <TabPane tab="Management team" key="3">
          <ManagementForm />
        </TabPane>
        <TabPane tab="Company shareholder information" key="4">
          <ShareholderForm />
        </TabPane>
        <TabPane tab="Group information" key="5">

        </TabPane>
        <TabPane tab="Products & services" key="6">

        </TabPane>
        <TabPane tab="Capacity building certificate" key="7">
          <CertificateForm />
        </TabPane>
      </Tabs>
    </div>
  );
}

RegistrationForms.propTypes = propTypes;

export default withRouter(RegistrationForms);
