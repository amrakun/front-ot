import React from 'react';
import { readFileUrl } from 'modules/common/utils';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';

const generateItems = () => {
  return [
    'organizationChartFile',
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
    'pepName',
    'isSubContractor',
  ];
};

const renderFile = value => {
  if (!value) {
    return null;
  }

  return (
    <span>
      file:
      <a href={readFileUrl(value.url)} target="__blank">
        {value.name}
      </a>
    </span>
  );
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
    description = value.toString();
  }

  if (item === 'hasConvictedLabourLaws') {
    description = businessInfo.hasConvictedLabourLawsDescription;
  }

  if (item === 'hasConvictedForHumanRights') {
    description = businessInfo.hasConvictedForHumanRightsDescription;
  }

  if (item === 'hasConvictedForBusinessIntegrity') {
    description = businessInfo.proveHasNotConvicted;
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

  const fileFields = [
    'doesMeetMinimumStandarts',
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
