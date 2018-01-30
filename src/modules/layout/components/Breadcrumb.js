import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { PropTypes } from 'prop-types';

const BreadcrumbItem = Breadcrumb.Item;

const routes = {
  'rfq-and-eoi': 'RFQ and EOI',
  dashboard: 'Dashboard',
  companies: 'Suppliers',
  rfq: 'RFQ Responses',
  eoi: 'EOI Responses',
  tender: 'Tenders and EOI',
  publish: 'Publish',
  prequalification: 'Prequalification',
  registration: 'Registration',
  'capacity-building': 'Capacity building',
  'prequalification-status': 'Pre-qualification status',
  audit: 'Supplier qualification',
  validation: 'Validation',
  difot: 'DIFOT',
  'due-diligence': 'Due diligence',
  feedback: 'Feedback',
  responses: 'Responses',
  blocking: 'Blocking',
  reports: 'Reports & Improvement plans',
  'user-list': 'Manage Users',
  'my-profile': 'My Profile',
  'change-password': 'Change Password',
  templates: 'Templates',
  'manage-expiry-dates': 'Manage Expiry Dates',
  qualification: 'Qualification/audit',
  settings: 'Settings',
  'responses-physical': 'Physical audit responses'
};

const Breadcrumbs = location => {
  const breadcrumbItems = [
    <BreadcrumbItem key={0}>
      <Icon type="home" /> Home
    </BreadcrumbItem>
  ];

  location.pathname.split('/').forEach((path, index) => {
    const title = routes[path];
    breadcrumbItems.push(<BreadcrumbItem key={index}>{title}</BreadcrumbItem>);
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

Breadcrumbs.propTypes = {
  location: PropTypes.object
};

export default Breadcrumbs;
