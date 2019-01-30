import React from 'react';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import { renderFile, renderBoolean } from './utils';

const generateItems = () => {
  return [
    'doesHavePlan',
    'hasEnvironmentalRegulatorInvestigated',
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
    description = renderBoolean(value);
  }

  if (item === 'investigationDocumentation') {
    description = renderFile(value);
  }

  if (item === 'hasEnvironmentalRegulatorInvestigated') {
    description = 'No';

    if (value) {
      description = (
        <div>
          <span>
            Date of investigation:{' '}
            {moment(new Date(environmentalInfo.dateOfInvestigation)).format(dateFormat)}
          </span>{' '}
          <br />
          <span>Reason for investigation: {environmentalInfo.reasonForInvestigation}</span> <br />
          <span>Action status: {environmentalInfo.actionStatus}</span> <br />
          <span>{renderFile(environmentalInfo.investigationDocumentation)}</span> <br />
        </div>
      );
    }
  }

  if (item === 'hasConvictedForEnvironmentalLaws') {
    description = 'No';

    if (value) {
      description = environmentalInfo.proveHasNotConvicted;
    }
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
