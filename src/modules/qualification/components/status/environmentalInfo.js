import React from 'react';
import { readFileUrl } from 'modules/common/utils';

const generateItems = () => {
  return [
    'doesHavePlan',
    'hasEnvironmentalRegulatorInvestigated',
    'dateOfInvestigation',
    'reasonForInvestigation',
    'actionStatus',
    'investigationDocumentation',
    'hasConvictedForEnvironmentalLaws',
    'proveHasNotConvicted',
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
  const environmentalInfo = companyInfo.environmentalInfo || {};
  const value = environmentalInfo[item];

  let description;

  if (['string', 'number'].includes(typeof value)) {
    description = value;
  }

  if (typeof value === 'boolean') {
    description = value.toString();
  }

  if (item === 'investigationDocumentation') {
    description = renderFile(value);
  }

  const fileFields = ['doesHavePlan'];

  if (fileFields.includes(item)) {
    description = renderFile(environmentalInfo[`${item}File`]);
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
