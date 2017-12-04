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

function RegistrationForms({ company }) {
  const isEmpty = data => {
    try {
      return Object.keys(data).length === 0 && data.constructor === Object;
    } catch (e) {
      return false;
    }
  };

  const renderPane = (key, title, name, Compnent) => {
    return (
      <Tabs.TabPane
        tab={
          <span>
            {title} {isEmpty(company[name]) ? '' : <Icon type="check" />}
          </span>
        }
        key={key}
      >
        <Compnent data={company[name] || {}} />
      </Tabs.TabPane>
    );
  };

  return (
    <div className="card-container">
      <Tabs type="card">
        {renderPane('1', 'Company info', 'basicInfo', CompanyInfoForm)}
        {renderPane('2', 'Contact details', 'contactInfo', ContactForm)}
        {renderPane('3', 'Management Team', 'managementTeam', ManagementForm)}
        {renderPane(
          '4',
          'Company shareholder information',
          'shareholderInfo',
          ShareholderForm
        )}
        {renderPane('5', 'Group information', 'groupInfo', GroupForm)}
        {renderPane('6', 'Products & services', 'productsInfo', ProductsForm)}
        {renderPane(
          '7',
          'Capacity building certificate',
          'certificateInfo',
          CertificateForm
        )}
      </Tabs>
    </div>
  );
}

RegistrationForms.propTypes = propTypes;

export default withRouter(RegistrationForms);
