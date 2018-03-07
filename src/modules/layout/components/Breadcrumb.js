import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import { T } from 'modules/common/components';
import { intlShape, injectIntl } from 'react-intl';

const BreadcrumbItem = Breadcrumb.Item;

const Breadcrumbs = location => {
  const { formatMessage } = location.intl;
  const routes = {
    'rfq-and-eoi': formatMessage({
      id: 'RFQ and EOI',
      defaultMessage: 'RFQ and EOI'
    }),
    dashboard: 'Dashboard',
    companies: 'Suppliers',
    rfq: 'RFQ Responses',
    eoi: 'EOI Responses',
    tender: formatMessage({
      id: 'Tenders and EOI',
      defaultMessage: 'Tenders and EOI'
    }),
    publish: 'Publish',
    prequalification: formatMessage({
      id: 'Prequalification',
      defaultMessage: 'Prequalification'
    }),
    registration: formatMessage({
      id: 'Registration',
      defaultMessage: 'Registration'
    }),
    'capacity-building': formatMessage({
      id: 'Capacity Building',
      defaultMessage: 'Capacity Building'
    }),
    'prequalification-status': 'Pre-qualification status',
    audit: formatMessage({
      id: 'Supplier qualification',
      defaultMessage: 'Supplier qualification'
    }),
    validation: 'Validation',
    difot: 'DIFOT',
    'due-diligence': 'Due diligence',
    feedback: formatMessage({
      id: 'Feedback',
      defaultMessage: 'Feedback'
    }),
    responses: 'Responses',
    blocking: 'Blocking',
    reports: 'Reports & Improvement plans',
    'user-list': 'Manage Users',
    'my-profile': formatMessage({
      id: 'My Profile',
      defaultMessage: 'My Profile'
    }),
    'change-password': formatMessage({
      id: 'Change Password',
      defaultMessage: 'Change Password'
    }),
    templates: 'Templates',
    'manage-expiry-dates': 'Manage Expiry Dates',
    qualification: formatMessage({
      id: 'Qualification/audit',
      defaultMessage: 'Qualification/audit'
    }),
    settings: 'Settings',
    'responses-physical': 'Physical audit responses'
  };
  const breadcrumbItems = [
    <BreadcrumbItem key={0}>
      <Icon type="home" />
      <T id="Home">Home</T>
    </BreadcrumbItem>
  ];

  location.pathname.split('/').forEach((path, index) => {
    const title = routes[path];
    breadcrumbItems.push(
      <BreadcrumbItem key={index}>{title || ''}</BreadcrumbItem>
    );
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

Breadcrumbs.propTypes = {
  location: PropTypes.object,
  intl: intlShape.isRequired
};

export default injectIntl(Breadcrumbs);
