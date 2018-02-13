import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { PropTypes } from 'prop-types';
import { T } from 'modules/common/components';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  rfqandeoi: {
    id: 'b_rfq-and-eoi',
    defaultMessage: 'RFQ and EOI'
  },
  tender: {
    id: 'b_tender',
    defaultMessage: 'Tenders and EOI'
  },
  prequalification: {
    id: 'b_prequalification',
    defaultMessage: 'Prequalification'
  },
  profile: {
    id: 'b_profile',
    defaultMessage: 'My Profile'
  },
  registration: {
    id: 'b_registration',
    defaultMessage: 'Registration'
  },
  qualification: {
    id: 'b_qualification',
    defaultMessage: 'Qualification/audit'
  },
  changePassword: {
    id: 'b_changePassword',
    defaultMessage: 'Change Password'
  },
  capacityBuilding: {
    id: 'b_capacity-building',
    defaultMessage: 'Capacity Building'
  }
});

const BreadcrumbItem = Breadcrumb.Item;

const Breadcrumbs = location => {
  const { formatMessage } = location.intl;
  const routes = {
    'rfq-and-eoi': formatMessage(messages.rfqandeoi),
    dashboard: 'Dashboard',
    companies: 'Suppliers',
    rfq: 'RFQ Responses',
    eoi: 'EOI Responses',
    tender: formatMessage(messages.tender),
    publish: 'Publish',
    prequalification: formatMessage(messages.prequalification),
    registration: formatMessage(messages.registration),
    'capacity-building': formatMessage(messages.capacityBuilding),
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
    'my-profile': formatMessage(messages.profile),
    'change-password': formatMessage(messages.changePassword),
    templates: 'Templates',
    'manage-expiry-dates': 'Manage Expiry Dates',
    qualification: formatMessage(messages.qualification),
    settings: 'Settings',
    'responses-physical': 'Physical audit responses'
  };
  const breadcrumbItems = [
    <BreadcrumbItem key={0}>
      <Icon type="home" /> <T id="home">Home</T>
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
