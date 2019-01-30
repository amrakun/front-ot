import React from 'react';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import { renderFile, renderBoolean } from './utils';

const generateItems = () => {
  return [
    'doesMeetMinimumStandarts',
    'doesHaveJobDescription',
    'doesConcludeValidContracts',
    'employeeTurnoverRate',
    'doesHaveLiabilityInsurance',
    'doesHaveCodeEthics',
    'doesHaveResponsiblityPolicy',
    'hasConvictedLabourLaws',
    'hasConvictedForHumanRights',
    'hasConvictedForBusinessIntegrity',
    'hasLeadersConvicted',
    'doesEmployeePoliticallyExposed',
    'organizationChartFile',
    'isSubContractor',
  ];
};

const renderDescription = props => {
  const { item, companyInfo } = props;
  const businessInfo = companyInfo.businessInfo || {};
  const value = businessInfo[item];

  let description;

  if (['string', 'number'].includes(typeof value)) {
    description = value;
  }

  if (typeof value === 'boolean') {
    description = renderBoolean(value);
  }

  if (item === 'hasConvictedLabourLaws') {
    description = businessInfo.hasConvictedLabourLawsDescription || 'No';
  }

  if (item === 'hasConvictedForHumanRights') {
    description = businessInfo.hasConvictedForHumanRightsDescription || 'No';
  }

  if (item === 'hasConvictedForBusinessIntegrity') {
    description = businessInfo.proveHasNotConvicted || 'No';
  }

  if (item === 'hasLeadersConvicted') {
    description = (businessInfo.investigations || []).map((v, i) => {
      return (
        <div key={i}>
          <span>name: {v.name}</span>
          <br />
          <span>date: {moment(new Date(v.date)).format(dateFormat)}</span>
          <br />
          <span>status: {v.status}</span>
          <br />
          <span>status date: {moment(new Date(v.statusDate)).format(dateFormat)}</span>
          <br />
        </div>
      );
    });
  }

  if (item === 'doesEmployeePoliticallyExposed') {
    description = 'No';

    if (value) {
      description = businessInfo.pepName;
    }
  }

  const fileFields = [
    'doesHaveCodeEthics',
    'doesMeetMinimumStandarts',
    'doesConcludeValidContracts',
    'doesHaveJobDescription',
    'doesHaveLiabilityInsurance',
    'doesHaveResponsiblityPolicy',
  ];

  if (fileFields.includes(item)) {
    description = renderFile(businessInfo[`${item}File`]);
  }

  if (item === 'organizationChartFile') {
    description = renderFile(value);
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
