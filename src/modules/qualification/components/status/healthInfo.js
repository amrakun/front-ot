import { renderFile } from './utils';

const generateItems = () => {
  return [
    'doesHaveHealthSafety',
    'areHSEResourcesClearlyIdentified',
    'doesHaveDocumentedProcessToEnsure',
    'areEmployeesUnderYourControl',
    'doesHaveDocumentForRiskAssesment',
    'doesHaveDocumentForIncidentInvestigation',
    'doesHaveDocumentedFitness',
    'isWillingToComply',
    'hasIndustrialAccident',
    'tmha',
    'ltifr',
    'injuryExplanation',
    'seniorManagement',
    'isWillingToCommit',
    'isPerparedToCompile',
    'hasWorkedOnWorldBank',
    'hasWorkedOnLargeProjects',
    'doesHaveLicense',
  ];
};

const renderDescription = props => {
  const { item, companyInfo } = props;
  const healthInfo = companyInfo.healthInfo || {};
  const value = healthInfo[item];

  let description;

  if (['string', 'number'].includes(typeof value)) {
    description = value;
  }

  if (typeof value === 'boolean') {
    description = value.toString();
  }

  const fileFields = [
    'doesHaveHealthSafety',
    'areHSEResourcesClearlyIdentified',
    'doesHaveDocumentedProcessToEnsure',
    'areEmployeesUnderYourControl',
    'doesHaveDocumentForRiskAssesment',
    'doesHaveDocumentForIncidentInvestigation',
    'doesHaveDocumentedFitness',
  ];

  if (fileFields.includes(item)) {
    description = renderFile(healthInfo[`${item}File`]);
  }

  const descFields = ['hasWorkedOnWorldBank', 'hasWorkedOnLargeProjects', 'doesHaveLicense'];

  if (descFields.includes(item)) {
    description = healthInfo[`${item}Description`] || 'false';
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
