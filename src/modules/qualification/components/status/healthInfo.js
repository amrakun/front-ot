import { renderFile, renderBoolean } from './utils';

const generateItems = ({ companyInfo }) => {
  const productsInfo = companyInfo.productsInfo || [];

  let fields = [
    'doesHaveHealthSafety',
    'areHSEResourcesClearlyIdentified',
    'doesHaveDocumentedProcessToEnsure',
    'areEmployeesUnderYourControl',
    'doesHaveDocumentForRiskAssesment',
    'doesHaveDocumentForIncidentInvestigation',
    'doesHaveDocumentedFitness',
    'isWillingToComply',
  ];

  if (productsInfo.includes('a01001') || productsInfo.includes('a01002')) {
    fields = [
      ...fields,
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
  }

  return fields;
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
    description = renderBoolean(value);
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
    description = healthInfo[`${item}Description`] || 'No';
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
