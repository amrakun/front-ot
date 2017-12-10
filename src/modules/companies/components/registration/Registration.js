import React from 'react';
import { withRouter } from 'react-router';
import CompanyInfoForm from './forms/CompanyInfo';
import ContactForm from './forms/Contact';
import ManagementForm from './forms/ManagementTeam';
import ShareholderForm from './forms/Shareholder';
import CertificateForm from './forms/Certificate';
import ProductsForm from './forms/Products';
import GroupForm from './forms/Group';
import Panes from '../Panes';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const propTypes = {
  company: PropTypes.object,
  save: PropTypes.func.isRequired
};

class RegistrationForms extends Panes {
  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          {this.renderPane('1', 'Company info', 'basicInfo', CompanyInfoForm)}
          {this.renderPane('2', 'Contact details', 'contactInfo', ContactForm)}
          {this.renderPane(
            '3',
            'Management Team',
            'managementTeam',
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
          {this.renderPane(
            '7',
            'Capacity building certificate',
            'certificateInfo',
            CertificateForm
          )}
        </Tabs>
      </div>
    );
  }
}

RegistrationForms.propTypes = propTypes;

export default withRouter(RegistrationForms);
