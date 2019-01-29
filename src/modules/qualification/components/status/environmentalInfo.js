import React from 'react';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import { renderFile } from './utils';

const generateItems = () => {
  return [
    'doesHavePlan',
    'hasEnvironmentalRegulatorInvestigated',
    'actionStatus',
    'investigationDocumentation',
    'hasConvictedForEnvironmentalLaws',
  ];
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

  if (item === 'hasEnvironmentalRegulatorInvestigated') {
    description = 'false';

    if (value) {
      description = (
        <div>
          <span>
            Date of investigation:{' '}
            {moment(new Date(environmentalInfo.dateOfInvestigation)).format(dateFormat)}
          </span>{' '}
          <br />
          <span>Reason for investigation: {environmentalInfo.reasonForInvestigation}</span> <br />
        </div>
      );
    }
  }

  if (item === 'hasConvictedForEnvironmentalLaws') {
    description = environmentalInfo.proveHasNotConvicted || 'false';
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
