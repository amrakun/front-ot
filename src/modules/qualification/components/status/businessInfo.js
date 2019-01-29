import React from 'react';
import { readFileUrl } from 'modules/common/utils';

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
    'proveHasNotConvicted',
    'hasLeadersConvicted',
    'doesEmployeePoliticallyExposed',
    'pepName',
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
    description = value.toString();
  }

  if (item === 'organizationChartFile') {
    description = (
      <span>
        file:
        <a href={readFileUrl(value.url)} target="__blank">
          {value.name}
        </a>
      </span>
    );
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
